import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IAuth } from 'src/app/_Interfaces/IAuth';
import { AuthManagementService } from 'src/app/_Services/auth-management.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup = new FormGroup({});
  public errorMessage: string | null = null;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthManagementService,
    private router: Router
  ) {}

  ngOnInit() {
    this.prepareForm();
  }

  private prepareForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}'
          ),
        ],
      ],
    });
  }

  public login(): void {
    this.errorMessage = null;
    const { email, password } = this.loginForm.value;
    this.authService.login({ email, password }).subscribe({
      next: (auth: IAuth) => {
        alert('Logged In Successfully');
        this.loginForm.reset();
        this.router.navigateByUrl('');
      },
      error: (err: any) => {
        this.errorMessage =
          'Email or Password incorrect. Please try again and ensure Caps Lock is not enabled.';
      },
    });
  }
}
