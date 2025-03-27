import {  Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule]
})
export class HomeComponent implements OnInit {
  data: any;

  constructor(private userService: UserService, private authService: AuthService, private oauthService: OAuthService) { }

  ngOnInit() {
    sessionStorage.removeItem('id_token');

    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (this.oauthService.hasValidIdToken()) {
        this.authService.googlePostLogin().subscribe({
          next: (res) => {
            localStorage.setItem('token', res.token);
            this.getUser();
          },
          error: (err) => {
            console.error('Erro ao fazer login com o Google:', err);
          }
        });
      } else {
        this.getUser();
      }
    });
  }

  getUser() {
    this.userService.getUser().subscribe({
      next: (response) => {
        this.data = response
      },
      error(err) {
        console.log(err);
      },
    })
  }
}

