import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  ChangeEmailComponent,
  ChangePasswordComponent,
  EditUserMobileNumberComponent,
  EditUserNamesComponent,
} from 'src/app/components';
import { IUser } from 'src/app/_Interfaces/IUser';
import { AuthManagementService } from 'src/app/_Services/auth-management.service';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss'],
})
export class PersonalDetailsComponent implements OnInit {
  public loading: boolean = false;
  public currentUser: IUser = {} as IUser;
  public errorMessage: string | null = null;
  constructor(
    private authService: AuthManagementService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadUserData();
  }

  private loadUserData(): void {
    this.errorMessage = null;
    this.loading = true;
    this.authService.getUserDetails().subscribe({
      next: (value: IUser) => {
        if (value) {
          this.currentUser = value;
        }
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Something went wrong.';
        this.loading = false;
      },
    });
  }

  public openEditUserNamesDialog(): void {
    let dialogRef = this.dialog.open(EditUserNamesComponent, {
      width: '40%',
      disableClose: true,
      data: this.currentUser,
    });
    dialogRef.afterClosed().subscribe((data) => {
      this.loadUserData();
    });
  }

  public openEditMobileNumberDialog(): void {
    let dialogRef = this.dialog.open(EditUserMobileNumberComponent, {
      width: '40%',
      disableClose: true,
      data: this.currentUser,
    });
    dialogRef.afterClosed().subscribe((data) => {
      this.loadUserData();
    });
  }

  public openResetPasswordDialog(): void {
    this.dialog.open(ChangePasswordComponent, {
      width: '40%',
      disableClose: true,
    });
  }

  public openChangeEmailDialog(): void {
    let dialogRef = this.dialog.open(ChangeEmailComponent, {
      width: '40%',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((data) => {
      this.loadUserData();
    });
  }
}
