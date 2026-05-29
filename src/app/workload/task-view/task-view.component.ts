import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { Comment } from 'shared/dto/comments';
import { TokenPayload } from 'shared/dto/payload';
import { workLoad } from 'shared/dto/workload';
import { ErrorService } from 'src/services/auth/error.service';
import { CommentsService } from 'src/services/workloas/comments.service';
import { WorkloadService } from 'src/services/workloas/workload.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss'],
  standalone: false
})
export class TaskViewComponent implements OnInit {

  task: workLoad | null = null;
  comment: Comment | null = null;
  comments: Comment [] = []
  taskId: number | null = null;
  userInfo: any = null;

  currentStatus: string = '';
  editingCommentId: number | null = null;
  editedText: string = '';

  statusTask: number = 0;
  title: string = '';
  descriptionTask: string = '';
  dueDate: Date = new Date();
  priority: number = 0;
  loading: boolean = false;
  submintedAt: Date = new Date();
  userAssignedId: number = 0;

  userComment: number = 0;
  taskComment: number = 0;
  commentText: string = '';
  submitedAt: string = '';

  constructor(private readonly router: Router,
    private readonly toastr: ToastrService,
    private readonly _workloadService: WorkloadService,
    private readonly _errorService: ErrorService,
    private readonly routes: ActivatedRoute,
    private readonly _commentsService: CommentsService) { }

  ngOnInit() {
    this.checkExistingToken();
    this.taskId = Number(this.routes.snapshot.paramMap.get('id'));
    this.loadTask();
    this.loadComments();
  }


  loadTask(): void {
    this._workloadService.getTaskById(this.taskId!).subscribe({
      next: (data) => {
        this.task = data;
        this.currentStatus = data.statusTask;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  loadComments():void{
    if(this.taskId === null)  return;

    this._commentsService.getCommentsByTaskId(this.taskId).subscribe({
      next:(data:any) =>{
        this.comments = data;
        console.log(data)
      },
      error:(err)=>{
        console.error(err);
      }
    });
  }

  startEdit(comment: Comment){
    this.editingCommentId = comment.id!;
    this.editedText = comment.commentText;
  }

  cancelEdit(){
    this.editingCommentId = null;
    this.editedText = '';
  }

  saveEdit(comment: Comment){
    const updateComment:Comment ={
      ...comment,
      commentText:this.editedText
    };

    this._commentsService.editComment(comment.id!, updateComment).subscribe({
      next:()=>{
        this.toastr.success('Comentrio actulizado');
        this.editingCommentId = null;
        this.loadComments();
      },
      error:(err)=>{
        console.error(err);
        this.toastr.error('Error al actualizar')
      }
    })
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    this.newComment();
  }

  onStatusClick(status: string) {
    if (this.taskId === null) return;
    this.currentStatus = status;
    this._workloadService.changeStatus(this.taskId, status).subscribe({
      next: () => {
        this.toastr.success('Estado cambiado');
        this.loadTask();
      },
      error: () => {
        this.toastr.error('Error al actulizar el estado')
      }
    })
  }

  private checkExistingToken(): void {
    const token = localStorage.getItem('accessToken');

    if (token) {
      try {
        const decoded = jwtDecode<TokenPayload>(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp > currentTime) {
          this.userInfo = decoded;
          this.userComment = decoded.userId
          return;
        } else {
          localStorage.removeItem('accessToken');
          this.router.navigate(['/']);
        }
      } catch (error) {
        localStorage.removeItem('accessToken');
        this.router.navigate(['/']);
      }
    }
  }

  async newComment() {
    if (this.taskId === null) return;
    if (
      this.userComment === 0 ||
      this.commentText.trim() === '' 
    ) {
      this.toastr.error('Error al dejar el comentario', 'Error');
      return;
    }
    this.loading = true;
    try {
      const comment: Comment = {
        userComment: this.userComment,
        taskComment: this.taskId,
        commentText: this.commentText,
        submitedAt: this.formatDate(new Date())
      };
      console.log(comment);
      this._commentsService.createComment(comment).subscribe({
        next: (response) => {
          this.loading = false;
          this.toastr.success(`Enviado`, 'Comentario enviado');
          this.commentText = '';
          this.loadComments();
        },
        error: (e: HttpErrorResponse) => {
          this.loading = false;
          this._errorService.msjError(e);

        }
      });

    } catch (error) {
      this.loading = false;
      this.toastr.error('Error al procesar el registro', 'Error');
      console.error('Error:', error);
    }
  }

  cancelComment(){
    this.commentText= '';
  }

  formatDate(date: Date) {
    const d = new Date(date);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');

    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
}
