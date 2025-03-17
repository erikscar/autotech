  import { CommonModule } from '@angular/common';
  import { Component } from '@angular/core';
  import { AuthService } from '../../services/auth.service';
  import { FormsModule, NgForm } from '@angular/forms';

  @Component({
    selector: 'app-auth-form',
    imports: [CommonModule, FormsModule],
    templateUrl: './auth-form.component.html',
    styleUrl: './auth-form.component.scss'
  })
  export class AuthFormComponent {
    constructor(private authService: AuthService) {}

    onSubmit(form: NgForm) {
      console.log(form.value)
      this.authService.register(form.value).subscribe({
        next: (response) => {
          console.log('Login realizado com sucesso!', response);
        },
        error: (error) => {
          console.error('Erro no login', error);
        },
        complete: () => {
          console.log('Operação concluída');
        }
      });
      
      
    }
  }
