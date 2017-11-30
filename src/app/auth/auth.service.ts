import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

import * as firebase from 'firebase';

import { AuthState } from '../shared/model/auth-state.model';
import { DataStorageService } from '../shared/data-storage.service';


@Injectable()
export class AuthService {

  private authState: AuthState;
  authResult = new Subject<AuthState>();

  constructor (private dataStorageService: DataStorageService)
  {
    // Signup subscriber
    dataStorageService.authSubject
      .subscribe((authState) => {
        this.authState = authState;
        this.authResult.next(authState);
      });
  }

  // Dispatch signup
  signupUser(email: string, password: string) {
    this.dataStorageService.signUp(email, password);
  }

  // Dispatch signip
  signinUser(email: string, password: string) {
    this.dataStorageService.signIn(email, password);
  }

  // Logout
  signOut() {
    this.dataStorageService.signOut();
  }

  getAuthState() {
    return this.dataStorageService.getAuthState();
  }
}
