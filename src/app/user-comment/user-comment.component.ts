import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserCommentService, Comment } from '../../services/usercomment.service';

@Component({
  selector: 'app-user-comment',
  templateUrl: './user-comment.component.html',
  styleUrls: ['./user-comment.component.scss'],
  standalone: false
})
export class UserCommentComponent implements OnInit {
  workloadId!: number;
  comentarios: Comment[] = [];
  nuevoComentario: string = '';
  cargando: boolean = true;
  enviando: boolean = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly commentService: UserCommentService
  ) {}

  ngOnInit(): void {
    this.workloadId = Number(this.route.snapshot.paramMap.get('workloadId'));
    this.cargarComentarios();
  }

  cargarComentarios(): void {
    this.cargando = true;
    this.commentService.getComments(this.workloadId).subscribe({
      next: (res: any) => {
        this.comentarios = res.data || res;
        this.cargando = false;
      },
      error: (err: any) => {
        console.error('Error:', err);
        this.cargando = false;
      }
    });
  }

  enviarComentario(): void {
    if (!this.nuevoComentario.trim()) return;
    this.enviando = true;
    this.commentService.createComment(this.workloadId, this.nuevoComentario).subscribe({
      next: () => {
        this.nuevoComentario = '';
        this.enviando = false;
        this.cargarComentarios();
      },
      error: (err: any) => {
        console.error('Error:', err);
        this.enviando = false;
      }
    });
  }

  regresar(): void {
    this.router.navigate(['/userTasks']);
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('es-MX', {
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  }
}