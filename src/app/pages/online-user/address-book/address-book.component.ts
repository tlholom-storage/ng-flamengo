import { Component, OnInit } from '@angular/core';
import { IUserAddress } from 'src/app/_Interfaces/IUserAddress';
import { UserAddressManagmentService } from 'src/app/_Services/user-address-managment.service';

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.scss'],
})
export class AddressBookComponent implements OnInit {
  public loading: boolean = false;
  public errorMessage: string | null = null;
  public currentAddress: IUserAddress[] = [] as IUserAddress[];
  constructor(private addressService: UserAddressManagmentService) {}

  ngOnInit() {
    this.loadUserData();
  }

  private loadUserData(): void {
    this.errorMessage = null;
    this.loading = true;
    this.addressService.getUserAddress().subscribe({
      next: (value: IUserAddress[]) => {
        if (value) {
          this.currentAddress = value;
        }
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'No Addresses Found.';
        this.loading = false;
      },
    });
  }

  public editAddress(): void
  {

  }

  public deleteAddress(): void{

  }
}
