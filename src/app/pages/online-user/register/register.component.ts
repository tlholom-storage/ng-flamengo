import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'src/app/_Helpers';
import { IAuth } from 'src/app/_Interfaces/IAuth';
import { IUser } from 'src/app/_Interfaces/IUser';
import { AuthManagementService } from 'src/app/_Services/auth-management.service';
import { UserManagementService } from 'src/app/_Services/user-management.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup = new FormGroup({});
  public errorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthManagementService,
    private userService: UserManagementService,
    private router: Router
  ) {}

  ngOnInit() {
    this.prepareForm();
  }

  private prepareForm(): void {
    this.registerForm = this.formBuilder.group(
      {
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        mobile_number: ['', Validators.required],
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
      {
        validators: [
          CustomValidators.checkEmails,
          CustomValidators.checkPasswords,
        ],
      }
    );
  }

  public register(): void {
    this.errorMessage = null;
    const { first_name, last_name, mobile_number, email, password } =
      this.registerForm.value;

    this.authService.register({ email, password }).subscribe({
      next: (auth: IAuth) => {
        if (auth.localId)
          this.userService
            .postUser({
              first_name,
              last_name,
              mobile_number,
              email,
              user_uid: auth.localId,
            } as IUser)
            .subscribe({
              next: (value) => {
                alert('Successfully Registered.');
                this.registerForm.reset();
                this.router.navigateByUrl('');
              },
              error: (error) => {
                this.errorMessage = 'Failed To Register New User!';
                this.registerForm.reset();
              },
            });
      },
    });
  }
}
