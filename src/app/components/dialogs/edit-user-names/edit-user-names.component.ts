import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomValidators } from 'src/app/_Helpers';
import { IUser } from 'src/app/_Interfaces/IUser';
import { UserManagementService } from 'src/app/_Services/user-management.service';

@Component({
  selector: 'app-edit-user-names',
  templateUrl: './edit-user-names.component.html',
  styleUrls: ['./edit-user-names.component.scss'],
})
export class EditUserNamesComponent implements OnInit {
  public editUserNamesForm: FormGroup = new FormGroup({});
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserManagementService,
    private dialogRef: MatDialogRef<EditUserNamesComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: IUser
  ) {}

  ngOnInit() {
    this.prepareForm();
    this.getAlreadyExistingUserData();
  }

  private prepareForm(): void {
    this.editUserNamesForm = this.formBuilder.group({
      first_name: [
        '',
        [Validators.required, CustomValidators.ValidateFirstName()],
      ],
      last_name: [
        '',
        [Validators.required, CustomValidators.ValidateLastName()],
      ],
    });
  }

  private getAlreadyExistingUserData(): void {
    if (!this.editData) return;

    this.editUserNamesForm.patchValue({
      first_name: this.editData.first_name,
      last_name: this.editData.last_name,
    });
  }

  public editUserNames(): void {
    if (!this.editUserNamesForm.valid) return;
    let { first_name, last_name } = this.editUserNamesForm.value;
    if (
      first_name === this.editData.first_name &&
      last_name === this.editData.last_name
    )
      return;

    this.userService
      .updateUser(this.editData._id!, { first_name, last_name })
      .subscribe({
        next: (res) => {
          alert('Your Name has been successfully updated.');
          this.editUserNamesForm.reset();
          this.dialogRef.close();
        },
        error: (error) => {
          alert('Error occured while updating your name');
        },
      });
  }
}
