import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from 'src/app/services/account.service';
import { AddressDto, PrimeflixUserDto } from 'src/app/web-api-client';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.sass'],
})
export class MyAccountComponent implements OnInit {
  profileForm: FormGroup;

  constructor(
    private accountsService: AccountService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.profileForm = new FormGroup({
      profile: new FormGroup({
        firstName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
        lastName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
        phoneNumber: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(14)]),
      }),
      address: new FormGroup({
        country: new FormControl('', [Validators.required, Validators.maxLength(50)]),
        city: new FormControl('', [Validators.required, Validators.maxLength(50)]),
        postalCode: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(7)]),
        street: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
        number: new FormControl('', [Validators.required, Validators.maxLength(3)]),
        poBox: new FormControl('', [Validators.maxLength(3)]),
      }),
    });
  }

  ngOnInit() {
    this.accountsService.getCurrentUser().subscribe((user) => {
      this.profileForm.patchValue({
        profile: {
          firstName: user?.firstName,
          lastName: user?.lastName,
          phoneNumber: user?.phoneNumber
        },
        address: {
          country: user?.address?.country,
          city: user?.address?.city,
          postalCode: user?.address?.postalCode,
          street: user?.address?.street,
          number: user?.address?.number,
          poBox: user?.address?.poBox,
        }
      });
    });
  }

  submitForm() {
    let profile = this.profileForm.value.profile;
    let address = this.profileForm.value.address;
    let userInfo = new PrimeflixUserDto();
    userInfo.address = new AddressDto();
    userInfo.firstName = profile.firstName;
    userInfo.lastName = profile.lastName;
    userInfo.phoneNumber = profile.phoneNumber;
    userInfo.address.country = address.country;
    userInfo.address.city = address.city;
    userInfo.address.postalCode = address.postalCode;
    userInfo.address.street = address.street;
    userInfo.address.number = address.number;
    userInfo.address.poBox = address.poBox;

    if(!this.profileForm.valid){
      return;
    }

    this.accountsService.upsertUser(userInfo).subscribe(
      (response) => {
        console.log(response);
        this.snackBar.open('Info saved', '×', {
          panelClass: 'success',
          verticalPosition: 'top',
          duration: 3000,
        });
      },
      (error) => {
        console.log(error);
        this.snackBar.open('Could not save your info. try again later.', '×', {
          panelClass: 'error',
          verticalPosition: 'top',
          duration: 3000,
        });
      }
    );
  }

  public errorHandling = (control: string, error: string) => {
    return this.profileForm.controls[control].hasError(error);
  };

  get firstName() {
    return this.profileForm.get('profile.firstName');
  }

  get lastName() {
    return this.profileForm.get('profile.lastName');
  }

  get phoneNumber() {
    return this.profileForm.get('profile.phoneNumber');
  }

  get country() {
    return this.profileForm.get('address.country');
  }

  get city() {
    return this.profileForm.get('address.city');
  }

  get postalCode() {
    return this.profileForm.get('address.postalCode');
  }

  get street() {
    return this.profileForm.get('address.street');
  }

  get number() {
    return this.profileForm.get('address.number');
  }

  get poBox() {
    return this.profileForm.get('address.poBox');
  }
}
