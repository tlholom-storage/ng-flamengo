import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidators } from 'src/app/_Helpers';
import { AuthManagementService } from 'src/app/_Services/auth-management.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  public changePasswordForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthManagementService,
    private dialogRef: MatDialogRef<ChangePasswordComponent>
  ) {}

  ngOnInit() {
    this.prepareForm();
  }

  private prepareForm(): void {
    this.changePasswordForm = this.formBuilder.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}'
            ),
          ],
        ],
        confirm_password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}'
            ),
          ],
        ],
      },
      { validators: [CustomValidators.ValidatePasswords] }
    );
  }

  public changePassword(): void {
    const { password, confirmPassword } = this.changePasswordForm.value;

    this.authService.changePassword({ password: password }).subscribe({
      next: (success: boolean) => {
        if (success) {
          alert('Password change attempt successful');
          this.changePasswordForm.reset();
          this.dialogRef.close();
        } else {
         alert('Failed to change password, please try again later.');
          this.changePasswordForm.reset();
        }
      },
      error: () => {
        alert('Failed to change password, please try again later.');
        this.changePasswordForm.reset();
      },
    });
  }
}
