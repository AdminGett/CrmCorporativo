import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
  id: number;
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

export class HomeComponent  implements OnInit {

  userInfo: any = null;

  constructor(
    private readonly router: Router
  ) { }

  ngOnInit() {
    this.checkExistingToken();
  }

  private checkExistingToken(): void {
      const token = localStorage.getItem('accessToken');
  
      if (token) {
        try {
          const decoded = jwtDecode<TokenPayload>(token);
          const currentTime = Date.now() / 1000;
  
          if (decoded.exp > currentTime) {    
            this.userInfo = decoded; // Almacenar info del usuario
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

}
