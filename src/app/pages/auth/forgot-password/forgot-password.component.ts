import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  form: FormGroup;
  data: any;
  matchEmail: boolean = false;

  constructor(private userService: UserService, private router: Router){
    this.form = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      hashPassword: new FormControl("", [Validators.required]),
      confirmPassword: new FormControl("", [Validators.required])
  })
  }

  onSubmit(form: FormGroup) {
    if(!this.matchEmail) {
      this.userService.getUserByEmail(form.value.email).subscribe({
        next: (res: any) => {
          console.log("Resposta" + res.email);
          this.data = res;

          if(this.data !== null)
          {
            this.matchEmail = true;
          }
        },
        error(err) {
          console.log(err)
        },
    })} else {
      this.userService.updateUser(form.value).subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/login'])
        },
        error(err) {
          console.log("Error: " + err)
        },
      })
    }
  }

  confirmPasswordValidator(control: AbstractControl) {
    return control.get("hashPassword")?.value === control.get("confirmPassword")?.value ? null: {missmatch: true}
  }
}
