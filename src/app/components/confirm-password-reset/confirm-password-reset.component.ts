import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidators } from 'src/app/_Helpers';
import { AuthManagementService } from 'src/app/_Services/auth-management.service';

@Component({
  selector: 'app-confirm-password-reset',
  templateUrl: './confirm-password-reset.component.html',
  styleUrls: ['./confirm-password-reset.component.scss'],
})
export class ConfirmPasswordResetComponent implements OnInit {
  public confirmPasswordResetForm: FormGroup = new FormGroup({});
  public errorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthManagementService,
    private router: Router
  ) {}

  ngOnInit() {
    this.prepareForm();
  }

  private prepareForm(): void {
    this.confirmPasswordResetForm = this.formBuilder.group(
      {
        password: [
          null,
          [
            Validators.required,
            Validators.pattern(
              '(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}'
            ),
          ],
        ],
        confirm_password: [
          null,
          [
            Validators.required,
            Validators.pattern(
              '(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}'
            ),
          ],
        ],
      },
      { validators: [CustomValidators.checkPasswords] }
    );
  }

  public confirmPasswordReset(): void {
    this.errorMessage = null;
    const { password, confirmPassword } = this.confirmPasswordResetForm.value;

    const code = this.route.snapshot.queryParams['oobCode'];
    if (!code) {
      this.errorMessage = 'Unable to proceed, password reset code not found.';
      return;
    }

    this.authService.verifyPasswordResetCode({ oobCode: code }).subscribe({
      next: (success: boolean) => {
        if (success) {
          this.authService
            .confirmPasswordReset({ oobCode: code, newPassword: password })
            .subscribe({
              next: () => {
                alert('Password Reset Successful');
                this.router.navigateByUrl('/account/login');
              },
              error: () => {
                this.errorMessage =
                  'Failed to reset password, please try again later.';
              },
            });
        }
      },
      error: () => {
        this.errorMessage =
          'Failed to verify password reset code, please try again later.';
      },
    });
  }
}
