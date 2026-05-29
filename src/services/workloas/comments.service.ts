import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { Comment } from 'shared/dto/comments';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private readonly myAppUrl: string;
  private readonly myApiUrl: string;

  constructor(private readonly http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'workloads';
  }

  createComment(comment: Comment): Observable<any> {
    const body = {
      userComment: comment.userComment,
      taskComment: comment.taskComment,
      commentText: comment.commentText,
      submitedAt: comment.submitedAt
    }
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}/newComment`, body);
  }

  getCommentsByUserId(userComment: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.myAppUrl}${this.myApiUrl}/getCommentsByUserId/${userComment}`);
  }

  getCommentsByTaskId(taskComment: number): Observable<Comment> {
    return this.http.get<Comment>(`${this.myAppUrl}${this.myApiUrl}/getComments/${taskComment}`);
  }

  editComment(id: number, comment: Comment): Observable<Comment[]> {
    const body = {
      userComment: comment.userComment,
      taskComment: comment.taskComment,
      commentText: comment.commentText,
      submitedAt: comment.submitedAt
    }
    return this.http.put<Comment[]>(`${this.myAppUrl}${this.myApiUrl}/updateComment/${id}`, body);
  }
}