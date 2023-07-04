import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'src/app/_Helpers';
import { UserAddressManagmentService } from 'src/app/_Services/user-address-managment.service';

export enum AddressType {
  Business = 'Business',
  Residential = 'Residential',
  undefinedType = '',
}

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss'],
})
export class AddAddressComponent implements OnInit {
  public loading: boolean = false;
  public errorMessage: string | null = null;
  public selectedAddressType: AddressType = AddressType.undefinedType;
  public addAddressForm: FormGroup = new FormGroup({});
  constructor(
    private formBuilder: FormBuilder,
    private userAddressService: UserAddressManagmentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.addAddressForm = this.formBuilder.group({
      recipient_name: [
        '',
        [Validators.required, CustomValidators.ValidateLastName()],
      ],
      recipient_mobile_number: [
        '',
        [Validators.required, CustomValidators.ValidateMobileNumber()],
      ],
      street_address: ['', [Validators.required]],
      complex: ['', []],
      suburb: ['', [Validators.required]],
      city: ['', [Validators.required]],
      province: ['', [Validators.required]],
      postal_code: ['', [Validators.required]],
    });
  }

  public changeSelectedAddressType(type: string): void {
    this.selectedAddressType =
      type === 'Business' ? AddressType.Business : AddressType.Residential;
  }

  public addNewAddress(): void {
    this.errorMessage = null;
    if (!this.addAddressForm.valid) {
      this.errorMessage = 'Please complete the form';
      return;
    }
    if (this.selectedAddressType == AddressType.undefinedType) {
      this.errorMessage = 'Please select the address type';
      return;
    }

    this.userAddressService
      .postUserAddress({
        ...this.addAddressForm.value,
        address_type: this.selectedAddressType.toString(),
      })
      .subscribe({
        next: (success: boolean) => {
          alert('Address Added');
          this.addAddressForm.reset();
          this.router.navigateByUrl('/account/address-book');
        },
        error: (err: any) => {
          this.errorMessage = 'Unable to create address record.';
        },
      });
  }
}
