import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountClient, FileResponse, PrimeflixUserDto, UpsertUserCommand } from '../web-api-client';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private accountsClient: AccountClient) {}

  getCurrentUser(): Observable<PrimeflixUserDto>{
    return this.accountsClient.getCurrentUserInfo();
  }

  upsertUser(user: PrimeflixUserDto): Observable<FileResponse>{
    let command = new UpsertUserCommand();
    command.firstName = user.firstName;
    command.lastName = user.lastName;
    command.phoneNumber = user.phoneNumber;
    command.address = user.address;

    return this.accountsClient.upsertUser(command);
  }
}
