import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(private router: Router, private authService: AuthService) {
    this.form = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      hashPassword: new FormControl("", [Validators.required]),
      confirmPassword: new FormControl("", [Validators.required])
    },
    {validators: this.confirmPasswordValidator})
  }

  ngOnInit() {
    const jwtToken = localStorage.getItem("token") || localStorage.getItem("token");

    if(jwtToken) {
      const decodedJwt = jwtDecode<JwtPayload>(jwtToken);
      const date = new Date();

      if(decodedJwt.exp && decodedJwt.exp * 1000 < date.getTime())
      {
        this.router.navigate(['/'])
      }

      this.router.navigate(['/home'])
    }
  }

  onSubmit(form: FormGroup) {
    this.authService.register(form.value).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home'])
      },
      error(err) {
        console.log(err);
      },
    })
  }

  confirmPasswordValidator(control: AbstractControl) {
    return control.get("hashPassword")?.value === control.get("confirmPassword")?.value ? null: { missmatch: true }
  }

  googleLogin() {
    this.authService.googleLogin();
  }
}
