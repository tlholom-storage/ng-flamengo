import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditUserDetailsComponent } from 'src/app/components';
import { IUser } from 'src/app/_Interfaces/IUser';
import { UserManagementService } from 'src/app/_Services/user-management.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  public users: IUser[] = []
  public errorMessage: string | null = null

  columns = [
    {
      columnDef: 'position',
      header: 'No.',
      cell: () => ``,
    },
    {
      columnDef: 'first_name',
      header: 'First Name',
      cell: (element: IUser) => `${element.first_name}`,
    },
    {
      columnDef: 'last_name',
      header: 'Last Name',
      cell: (element: IUser) => `${element.last_name}`,
    },
    {
      columnDef: 'mobile_number',
      header: 'Mobile Number',
      cell: (element: IUser) => `${element.mobile_number}`,
    },
    {
      columnDef: 'email',
      header: 'Email',
      cell: (element: IUser) => `${element.email}`,
    }
    ,
    {
      columnDef: 'actions',
      header: 'Actions',
      cell: () => ``,
    }
  ]
  displayedColumns = this.columns.map(c => c.columnDef)


  constructor(private userService: UserManagementService, private dialog: MatDialog) {}

  ngOnInit() {
    this.getUserData()
  }

  public getUserData(): void {
    this.userService.fetchUsers().subscribe({
      next: (data: IUser[]) => {
        this.users = data
      },
      error: (error) => {
        this.errorMessage = 'No Data Retrived'
      },
      complete: () => {

      },
    })
  }

  public deleteUser(row: IUser): void
  {
      this.userService.deleteUser(row._id!).subscribe({
        next: (data: boolean) => {
        },
        error: (error) => {
          this.errorMessage = 'Failed To Delete User'
        },
        complete: () => {

        },
      })
  }

  public editUserDetails(row: IUser): void
  {
    this.dialog.open(EditUserDetailsComponent, {
      width: '30%',
      disableClose: true,
      data: row
    })
  }
}
