import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/_Interfaces/IUser';
import { AuthManagementService } from 'src/app/_Services/auth-management.service';

@Component({
  selector: 'app-online-user',
  templateUrl: './online-user.component.html',
  styleUrls: ['./online-user.component.scss']
})
export class OnlineUserComponent implements OnInit {

  currentUser: IUser = {} as IUser
  constructor(public authService: AuthManagementService) { }

  ngOnInit() {
    this.authService.getUserDetails().subscribe({
      next: (value: IUser) =>
      {
          this.currentUser = value
      }
    })
  }

}
