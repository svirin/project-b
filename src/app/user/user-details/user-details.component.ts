import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

import { UserService } from '../user.service';
import { AuthService } from '../../auth/auth.service';
import { UserState } from '../../shared/model/user-state.model';
import { AuthState } from '../../shared/model/auth-state.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit, OnDestroy {

  email: string;
  userServiceSubscription: Subscription;
  userState: UserState = new UserState(null, '', '', '', []);
  authState: AuthState;
  subject: Subject<UserState> = new Subject<UserState>();

  constructor
  (
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this.userServiceSubscription = this.userService.userResult
      .subscribe((userState: UserState) => {
        if (userState) {
          this.userState = userState;
          this.subject.next(this.userState);
        }
      });

    this.authService.getAuthState()
      .then(state => {
        this.authState = state;
        this.userService.getUser(this.authState.email);
      });
  }

  onEditPerson() {
    this.router.navigate(['../edit'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.userServiceSubscription.unsubscribe();
  }
}
