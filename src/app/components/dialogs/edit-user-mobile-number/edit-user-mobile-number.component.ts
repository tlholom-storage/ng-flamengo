import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomValidators } from 'src/app/_Helpers';
import { IUser } from 'src/app/_Interfaces/IUser';
import { UserManagementService } from 'src/app/_Services/user-management.service';

@Component({
  selector: 'app-edit-user-mobile-number',
  templateUrl: './edit-user-mobile-number.component.html',
  styleUrls: ['./edit-user-mobile-number.component.scss'],
})
export class EditUserMobileNumberComponent implements OnInit {
  public editUserMobileNumberForm: FormGroup = new FormGroup({});
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserManagementService,
    private dialogRef: MatDialogRef<EditUserMobileNumberComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: IUser
  ) {}

  ngOnInit() {
    this.prepareForm();
    this.getAlreadyExistingUserData();
  }

  private prepareForm(): void {
    this.editUserMobileNumberForm = this.formBuilder.group({
      mobile_number: ['', [Validators.required, CustomValidators.ValidateMobileNumber()]],
    });
  }

  private getAlreadyExistingUserData(): void {
    if (!this.editData) return;

    this.editUserMobileNumberForm.patchValue({
      mobile_number: this.editData.mobile_number,
    });
  }

  public editUserMobileNumber(): void {
    if (!this.editUserMobileNumberForm.valid) return;
    let { mobile_number } = this.editUserMobileNumberForm.value;

    this.userService
      .updateUser(this.editData._id!, { mobile_number })
      .subscribe({
        next: (res) => {
          alert('Your mobile number has been successfully updated.');
          this.editUserMobileNumberForm.reset();
          this.dialogRef.close();
        },
        error: (error) => {
          alert('Error occured while updating your mobile number');
        },
      });
  }
}
