import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Subject } from 'rxjs/Subject';
import { Observable } from "rxjs/Observable";
import { fromPromise } from 'rxjs/Observable/fromPromise';

import * as firebase from 'firebase';

import { AuthState } from './model/auth-state.model';
import { UserState } from './model/user-state.model';

@Injectable()
export class DataStorageService {

  authSubject = new Subject<AuthState>();
  userSubject = new Subject<UserState>();

  constructor(private http: Http) {
    firebase.initializeApp({
      apiKey: "AIzaSyDaHJ9uTM0cC1EY1l7hhxmlaV-9vx7hAsg",
      authDomain: "projectb-3eb2e.firebaseapp.com",
      databaseURL: "https://projectb-3eb2e.firebaseio.com",
      projectId: "projectb-3eb2e",
      storageBucket: "projectb-3eb2e.appspot.com",
      messagingSenderId: "691616877416"
    });
  }

  signUp(email: string, password: string) {

    // Sign up 
    const promise = firebase.auth().createUserWithEmailAndPassword(email, password);
    fromPromise(promise)
      .subscribe(action => {

        // Get token
        const getTokenPromise = fromPromise(firebase.auth().currentUser.getIdToken());
        getTokenPromise
          .subscribe((token) => {
            this.authSubject.next(new AuthState(token, null, true, firebase.auth().currentUser.email));
          },

          // Failed get token
          error => {
            this.authSubject.next(new AuthState(null, error.message, false, null));
          });
      },

      // Failed signup
      error => {
        this.authSubject.next(new AuthState(null, error.message, false, null));
      })
  }

  signIn(email: string, password: string) {

    // Sign up 
    const promise = firebase.auth().signInWithEmailAndPassword(email, password);
    fromPromise(promise)
      .subscribe(action => {

        // Get token
        const getTokenPromise = fromPromise(firebase.auth().currentUser.getIdToken());
        getTokenPromise
          .subscribe((token) => {
            this.authSubject.next(new AuthState(token, null, true, firebase.auth().currentUser.email));
          },

          // Failed get token
          error => {
            this.authSubject.next(new AuthState(null, error.message, false, null));
          });
      },

      // Failed signup
      error => {
        this.authSubject.next(new AuthState(null, error.message, false, null));
      })
  }

  signOut() {

    // Sign Out
    const signOutPromise = firebase.auth().signOut();
    fromPromise(signOutPromise)
      .subscribe(() => {
        this.authSubject.next(new AuthState(null, null, false, null));
      },

      // Failed get token
      error => {
        this.authSubject.next(new AuthState(null, error.message, false, null));
      });
  }

  getAuthState() {
    if (!firebase.auth().currentUser)
      return null;

    return firebase.auth().currentUser.getIdToken().then((token) => {
      return new AuthState(token, null, true, firebase.auth().currentUser.email);
    }).catch((error) => {
      return new AuthState(null, error.message, false, null);
    });
  }

  getUser(email: string) {
    let promise = firebase.app().database().ref('users').orderByKey();
    promise.on('value',
      snap => {
        const requestedItem = snap.val();
        if (requestedItem) {
          const keys = Object.keys(requestedItem);
          const values = Object.values(requestedItem);
          for (let idx = 0; idx < keys.length; idx++) {
            let foundPerson: UserState =
              new UserState(
                values[idx].email,
                values[idx].firstName,
                values[idx].lastName,
                values[idx].description,
                values[idx].images ? values[idx].images : []
              );
            if (foundPerson.email === email) {
              this.userSubject.next(foundPerson);
            }
          }
        }
      });
  }

  insertNewUser(userState: UserState) {
    firebase.app().database().ref("users").push(
      {
        email: userState.email,
        firstName: userState.firstName,
        lastName: userState.lastName,
        description: userState.description,
        images: userState.images
      });
  }

  saveUser(userState: UserState) {
    if (userState.email) {
      let promise = firebase.app().database().ref('users').orderByChild('email').equalTo(userState.email);
      promise.once('value',
        snap => {
          const requestedItem = snap.val();
          let isFound = false;
          if (requestedItem) {
            const keys = Object.keys(requestedItem);
            const values = Object.values(requestedItem);
            for (let idx = 0; idx < keys.length; idx++) {
              if (values[idx].email == userState.email) {
                let prom = firebase.app().database()
                  .ref('users')
                  .orderByKey()
                  .equalTo(keys[idx])
                  .once('child_added', snap => {
                    snap.ref.update({
                      firstName: userState.firstName,
                      lastName: userState.lastName,
                      description: userState.description,
                      images: userState.images
                    });
                  });
                isFound = true;
              }
            }
            if (!isFound) {
              this.insertNewUser(userState);
            }
          }
          else {
            this.insertNewUser(userState);
          }
        });
    }
  }
}
