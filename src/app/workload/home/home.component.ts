import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { workLoad } from 'shared/dto/workload';
import { ErrorService } from 'src/services/auth/error.service';
import { HttpErrorResponse } from '@angular/common/http';
import { WorkloadService } from '../../../services/workloas/workload.service';
import {Comment } from 'shared/dto/comments';
import { CommentsService } from 'src/services/workloas/comments.service';

interface TokenPayload {
  userId: number;
  username: string;
  role: string;
  exp: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false,
})

export class HomeComponent implements OnInit {

  userInfo: any = null;
  userId: number | null = null;
  task: workLoad | null = null;
  workloadVariable: workLoad[] = [];
  comment: Comment | null = null;
  commentVariable: Comment[] = [];
  taskId: number | null =null;
  taskToDelete: number | null = null;

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

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPage: number = 0;

  currentPageComments: number = 1;
  itemsPerPageComments: number = 5;
  totalPageComments: number = 0;

  paginatedTasks: workLoad[] = [];
  paginatedComments: Comment[] = [];

  Math = Math;

  openMenuTask: number | null = null;
  openMenuComment: number | null = null;

  constructor(
    private readonly router: Router,
    private readonly toastr: ToastrService,
    private readonly _workloadService: WorkloadService,
    private readonly _errorService: ErrorService,
    private readonly routes: ActivatedRoute,
    private readonly _commentsService:CommentsService
  ) { }

  ngOnInit() {
    this.checkExistingToken();

    const routeId = this.routes.snapshot.paramMap.get('id');

    if(routeId){
      this.userAssignedId = Number(routeId);
      this.userComment = Number(routeId);
    }
    this.loadTasks();
    this.loadComments();
    this.taskId = Number(this.routes.snapshot.paramMap.get('id'));
  }


  getPendingTasks(){
    return this.workloadVariable.filter(
      task=>task.statusTask === 'pending'
    ).length
  }

  getCompletedTasks(){
    return this.workloadVariable.filter(
      task=>task.statusTask === 'completed'
    ).length
  }

  loadComments(): void {
    this._commentsService.getCommentsByUserId(this.userComment).subscribe({
      next: (data: any[]) => {
        this.commentVariable = data;
        this.currentPageComments = 1;
        this.calculateTotalPagesComments();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  loadTasks(): void {
    this._workloadService.getTasksByUserId(this.userAssignedId).subscribe({
      next: (data: any[]) => {
        this.workloadVariable = data;
        this.currentPage = 1;
        this.calculateTotalPages();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  calculateTotalPages(): void {
    this.totalPage = Math.ceil(this.workloadVariable.length / this.itemsPerPage);
    this.updatePaginatedTasks();
  }

  calculateTotalPagesComments(): void {
    this.totalPageComments = Math.ceil(this.commentVariable.length / this.itemsPerPageComments);
    this.updatePaginatedComments();
  }

  updatePaginatedTasks(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedTasks = this.workloadVariable.slice(startIndex, endIndex);
  }

  updatePaginatedComments(): void {
    const startIndex = (this.currentPageComments - 1) * this.itemsPerPageComments;
    const endIndex = startIndex + this.itemsPerPageComments;
    this.paginatedComments = this.commentVariable.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPage) {
      this.currentPage = page;
      this.updatePaginatedTasks();
    }
  }

  changePageComments(page: number): void {
    if (page >= 1 && page <= this.totalPageComments) {
      this.currentPageComments = page;
      this.updatePaginatedComments();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedTasks();
    }
  }

  previousPageComments(): void {
    if (this.currentPageComments > 1) {
      this.currentPageComments--;
      this.updatePaginatedComments();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPage) {
      this.currentPage++;
      this.updatePaginatedTasks();
    }
  }

  nextPageComments(): void {
    if (this.currentPageComments < this.totalPageComments) {
      this.currentPageComments++;
      this.updatePaginatedComments();
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(this.totalPage, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }
  getPageNumbersComments(): number[] {
    const pages: number[] = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, this.currentPageComments - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(this.totalPageComments, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  goToUpdate(id: number): void {
    this.router.navigate(['/workload/getTask', id]);
  }

  goToView(id: number): void {
    this.router.navigate(['/taskView', id]);
  }

  goToTask(): void {
    this.router.navigate(['/workload/newTask']);
  }

  private checkExistingToken(): void {
    const token = localStorage.getItem('accessToken');

    if (token) {
      try {
        const decoded = jwtDecode<TokenPayload>(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp > currentTime) {
          this.userInfo = decoded;
          this.userAssignedId = decoded.userId
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

  public clearInputs(): void {
    const textInputs = document.querySelectorAll('input[type="text"]');
    textInputs.forEach((input: any) => {
      input.value = '';
    });
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    passwordInputs.forEach((input: any) => {
      input.value = '';
    });
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach((input: any) => {
      input.value = '';
    });
  }

  toggleProfileMenu(id: number) {
    this.openMenuTask = this.openMenuTask === id ? null : id;
  }

  toggleProfileMenuComment(id: number) {
    this.openMenuComment = this.openMenuComment === id ? null : id;
  }

  deleteTask(taskId:number){
    this._workloadService.deleteTask(taskId).subscribe({    
      next:()=>{
        this.toastr.success('Tarea eliminada')
        this.loadTasks();
      },
      error: (error:HttpErrorResponse) =>{
        this.toastr.error('Error al eliminar la tarea')
      }
    });
  }

  confirmDelete(id:number){
    this.taskToDelete = id;
    this.openMenuTask = null;
  }

  cancelDelete(){
    this.taskToDelete = null;
  }

  confirmDeleteTask(){
    if(this.taskToDelete !== null){
      this.deleteTask(this.taskToDelete);
      this.taskToDelete = null;
    }
  }
}
