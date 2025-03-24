  import { CommonModule } from '@angular/common';
  import {  Component, CUSTOM_ELEMENTS_SCHEMA, inject, Input, OnInit } from '@angular/core';
  import { AuthService } from '../../services/auth.service';
  import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
  import { jwtDecode, JwtPayload } from 'jwt-decode';
  import { Router } from '@angular/router';


  @Component({
    selector: 'app-auth-form',
    imports: [CommonModule, ReactiveFormsModule, ],
    templateUrl: './auth-form.component.html',
    styleUrl: './auth-form.component.scss',
  })
  export class AuthFormComponent implements OnInit {
    @Input() isRegister: boolean = false;
    form: FormGroup;
    
    constructor(private authService: AuthService, private router: Router) {      
      this.form = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        hashPassword: new FormControl('', [Validators.required]),
        confirmPassword: new FormControl('', [Validators.required]),
        rememberme: new FormControl(false)
      },
    {validators: this.passwordMatchValidator})
    }

    ngOnInit(): void {

      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      if(token) {
        let decodedJwt = jwtDecode<JwtPayload>(token)
        let date = new Date();

        if(decodedJwt.exp && decodedJwt.exp * 1000 < date.getTime()) {
          this.router.navigate(['/'])

        } else {
          this.router.navigate(['/home'])
        }
      }
    } 


    onSubmit(form: FormGroup) {
      const { confirmPassword, rememberme, ...formData } = form.value;

      if(this.isRegister) {

        this.authService.register(formData).subscribe({
          next: (res) => {
            sessionStorage.setItem('token', res.token)
            this.router.navigate(['/home'])

          },
          error: (error) => {
            console.error('Error on Register', error);
          }
        });
      } else {
        this.authService.login(formData).subscribe( {
          next: (res) => {
            console.log(rememberme);
            if(rememberme) {
              localStorage.setItem('token', res.token)

            } else {
              sessionStorage.setItem('token', res.token)

            }

            this.router.navigate(['/home'])
          },
          error: (error) => {
            console.log("Error: " + error.message);
          }
        })
      }
      
    }


    passwordMatchValidator(control: AbstractControl) {
      return control.get('hashPassword')?.value === 
      control.get('confirmPassword')?.value ? null: { missmatch: true }
    }

    googlelogin() {
      this.authService.googleLogin();
    }

}