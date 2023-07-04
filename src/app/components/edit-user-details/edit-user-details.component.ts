import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUser } from 'src/app/_Interfaces/IUser';
import { UserManagementService } from 'src/app/_Services/user-management.service';

@Component({
  selector: 'app-edit-user-details',
  templateUrl: './edit-user-details.component.html',
  styleUrls: ['./edit-user-details.component.scss'],
})
export class EditUserDetailsComponent implements OnInit {
  editUserForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserManagementService,
    private dialogRef: MatDialogRef<EditUserDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) private editData: IUser
  ) {}

  ngOnInit() {
    this.prepareForm();
    this.getAlreadyExistingUser();
  }

  private prepareForm(): void {
    this.editUserForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      mobile_number: ['', Validators.required],
      email: [undefined, [Validators.required, Validators.email]],
    });
  }

  private getAlreadyExistingUser(): void {
    if (!this.editData) return;

    this.editUserForm.patchValue({
      first_name: this.editData.first_name,
      last_name: this.editData.last_name,
      mobile_number: this.editData.mobile_number,
      email: this.editData.email,
    });
  }

  public editUserDetails(): void {
    if (!this.editUserForm.valid) return;

    let user = this.editUserForm.value as IUser;
    this.userService.updateUser(this.editData._id!, user).subscribe({
      next: (res) => {
        alert('Contact updated successfully');
        this.editUserForm.reset();
        this.dialogRef.close();
      },
      error: (error) => {
        alert('Error occured while updating contact');
      },
    });
  }
}
