import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  user: any = {}

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe( {
      next: (data) => {
        this.user = data
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

}
