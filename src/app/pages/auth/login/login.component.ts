import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form: FormGroup;

  constructor(private router: Router, private authService: AuthService) {
    this.form = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      hashPassword: new FormControl("", [Validators.required]),
      rememberme: new FormControl(false)
    })
  }

  onSubmit(form: FormGroup) {
    this.authService.login(form.value).subscribe({
      next: (response) => {
        if(form.value.rememberme) {
          localStorage.setItem("token", response.token)
        } else {
          sessionStorage.setItem("token", response.token)
        }

        this.router.navigate(["/home"])
      },
      error(err) {
        console.log(err);
      },
    })
  }

  googleLogin() {
    this.authService.googleLogin()
  }
}
