import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthManagementService } from 'src/app/_Services/auth-management.service';

@Component({
  selector: 'app-send-password-reset-email',
  templateUrl: './send-password-reset-email.component.html',
  styleUrls: ['./send-password-reset-email.component.scss']
})
export class SendPasswordResetEmailComponent implements OnInit {

  public sendPasswordResetEmail: FormGroup = new FormGroup({});
  public errorMessage: string | null = null;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthManagementService,
    private router: Router
  ) {}

  ngOnInit() {
    this.prepareForm();
  }

  private prepareForm() {
    this.sendPasswordResetEmail = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
    });
  }

  public sendResetPasswordEmail(): void {
    this.errorMessage = null
    this.authService.sendPasswordResetEmail(this.sendPasswordResetEmail.value).subscribe({
      next: (value) => {
        alert(`Reset Instructions have been sent to the entered email address ${this.sendPasswordResetEmail.value.email} `);
        this.sendPasswordResetEmail.reset();
        this.router.navigateByUrl('account/login');
      },
      error: (error) => {
        this.errorMessage = 'Unable to send password reset email'
        this.sendPasswordResetEmail.reset();
      },
    })
  }

}
