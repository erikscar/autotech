import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: any;

  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.googlePostLogin().pipe(
      switchMap((res) => {
        localStorage.setItem('token', res.tokenId);
        return this.userService.getUser(); // Aguarda login antes de buscar usuário
      })
    ).subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => {
        console.error("Erro ao obter usuário:", err);
      }
    });
  }
  

  getUser(): void {
    this.userService.getUser().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => {
        console.error("Erro ao obter dados do usuário: ", err);
      }
    });
  }
}
