  import { CommonModule } from '@angular/common';
  import { Component } from '@angular/core';
  import { AuthService } from '../../services/auth.service';
  import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

  @Component({
    selector: 'app-auth-form',
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './auth-form.component.html',
    styleUrl: './auth-form.component.scss'
  })
  export class AuthFormComponent {
    form: FormGroup;
    constructor(private authService: AuthService, private router: Router) {
      this.form = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        hashPassword: new FormControl('', [Validators.required]),
        confirmPassword: new FormControl('', [Validators.required])
      },
    {validators: this.passwordMatchValidator})
    }

    onSubmit(form: FormGroup) {
      const { confirmPassword, ...formData } = form.value;

      this.authService.register(formData).subscribe({
        next: (res) => {
          this.router.navigate(['/home'])
          console.log(res.message)
        },
        error: (error) => {
          console.error('Erro no login', error);
        }
      });
    }

    passwordMatchValidator(control: AbstractControl) {
      return control.get('hashPassword')?.value === 
      control.get('confirmPassword')?.value ? null: { missmatch: true }
    }
  }
