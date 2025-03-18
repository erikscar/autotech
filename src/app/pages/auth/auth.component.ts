import { Component } from '@angular/core';
import { AuthFormComponent } from "../../components/auth-form/auth-form.component";

@Component({
  selector: 'app-auth',
  imports: [AuthFormComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

}
