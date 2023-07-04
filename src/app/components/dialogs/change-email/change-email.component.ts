import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CustomValidators } from 'src/app/_Helpers';
import { IAuth } from 'src/app/_Interfaces/IAuth';
import { IUser } from 'src/app/_Interfaces/IUser';
import { AuthManagementService } from 'src/app/_Services/auth-management.service';
import { BrowserStorageService } from 'src/app/_Services/browser-storage.service';
import { UserManagementService } from 'src/app/_Services/user-management.service';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss'],
})
export class ChangeEmailComponent implements OnInit {
  public changeEmailForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthManagementService,
    private userService: UserManagementService,
    private dialogRef: MatDialogRef<ChangePasswordComponent>
  ) {}

  ngOnInit() {
    this.prepareForm();
  }

  private prepareForm(): void {
    this.changeEmailForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        confirm_email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}'
            ),
          ],
        ],
      },
      { validators: [CustomValidators.ValidateEmails] }
    );
  }

  public changeEmail() {
    const { email, password, confirm_email } = this.changeEmailForm.value;
    this.authService.getUserDetails().subscribe({
      next: (user: IUser) => {
        this.authService
          .login({ email: user.email, password: password })
          .subscribe({
            next: (auth: IAuth) => {
              if (auth) {
                this.authService.changeEmail({ email }).subscribe({
                  next: (success: boolean) => {
                    if (success) {
                      this.userService
                        .updateUser(user._id!, { email: email })
                        .subscribe({
                          next: (updateEmailSuccessful: boolean) => {
                            if (updateEmailSuccessful) {
                              this.authService
                                .login({ email: email, password: password })
                                .subscribe({
                                  next: () => {
                                    alert('Email change attempt successful');
                                    this.changeEmailForm.reset();
                                    this.dialogRef.close();
                                  },
                                  error: () => {
                                    alert(
                                      'Failed to change email, please try again later.'
                                    );
                                    this.changeEmailForm.reset();
                                  },
                                });
                            }
                          },
                          error: () => {
                            alert(
                              'Failed to change email, please try again later.'
                            );
                            this.changeEmailForm.reset();
                          },
                        });
                    } else {
                      alert('Failed to change email, please try again later.');
                      this.changeEmailForm.reset();
                    }
                  },
                  error: (error: any) => {
                    alert('Failed to change email, please try again later.');
                    this.changeEmailForm.reset();
                  },
                });
              } else {
                alert('Failed to change email, please try again later.');
                this.changeEmailForm.reset();
              }
            },
            error: () => {
              alert('Failed to change email, please try again later.');
              this.changeEmailForm.reset();
            },
          });
      },
      error: (err: any) => {
        alert('Failed to change email, please try again later.');
        this.changeEmailForm.reset();
      },
    });
  }
}
