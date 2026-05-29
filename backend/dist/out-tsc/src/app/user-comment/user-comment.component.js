import { __decorate } from "tslib";
import { Component } from '@angular/core';
let UserCommentComponent = class UserCommentComponent {
    constructor(route, router, commentService) {
        this.route = route;
        this.router = router;
        this.commentService = commentService;
        this.comentarios = [];
        this.nuevoComentario = '';
        this.cargando = true;
        this.enviando = false;
    }
    ngOnInit() {
        this.workloadId = Number(this.route.snapshot.paramMap.get('workloadId'));
        this.cargarComentarios();
    }
    cargarComentarios() {
        this.cargando = true;
        this.commentService.getComments(this.workloadId).subscribe({
            next: (res) => {
                this.comentarios = res.data || res;
                this.cargando = false;
            },
            error: (err) => {
                console.error('Error:', err);
                this.cargando = false;
            }
        });
    }
    enviarComentario() {
        if (!this.nuevoComentario.trim())
            return;
        this.enviando = true;
        this.commentService.createComment(this.workloadId, this.nuevoComentario).subscribe({
            next: () => {
                this.nuevoComentario = '';
                this.enviando = false;
                this.cargarComentarios();
            },
            error: (err) => {
                console.error('Error:', err);
                this.enviando = false;
            }
        });
    }
    regresar() {
        this.router.navigate(['/userTasks']);
    }
    formatDate(dateStr) {
        if (!dateStr)
            return '—';
        return new Date(dateStr).toLocaleDateString('es-MX', {
            day: 'numeric', month: 'short', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    }
};
UserCommentComponent = __decorate([
    Component({
        selector: 'app-user-comment',
        templateUrl: './user-comment.component.html',
        styleUrls: ['./user-comment.component.scss'],
        standalone: false
    })
], UserCommentComponent);
export { UserCommentComponent };
//# sourceMappingURL=user-comment.component.js.map