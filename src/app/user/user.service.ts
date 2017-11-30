import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

import { UserState } from '../shared/model/user-state.model';
import { DataStorageService } from '../shared/data-storage.service';

@Injectable()
export class UserService {

  private userState: UserState;
  userResult = new Subject<UserState>();

  constructor(private dataStorageService: DataStorageService) {
    // Signup subscriber
    dataStorageService.userSubject
      .subscribe((userState) => {
        this.userState = userState;
        this.userResult.next(userState);
      });
  }

  getUser(email: string) {
    this.dataStorageService.getUser(email);
  }

  saveUser(userState: UserState) {
    this.dataStorageService.saveUser(userState);
  }
}
