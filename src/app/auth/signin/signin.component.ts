import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy {

  errorValue: string;
  signinForm: FormGroup;
  authSubscription: Subscription;

  constructor
  (
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this.signinForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^[1-9]+[0-9]*$/)])
    });

    this.authSubscription = this.authService.authResult.subscribe(
      (authResult) => {
        if (authResult.isAutenticated) {
          this.router.navigate(['../user/details'], { relativeTo: this.route });
        }
        else {
          this.errorValue = authResult.error;
          this.signinForm.get('email').setErrors({ 'incorrect': true });
        }
      }
    );
  }

  onSignin() {
    const email = this.signinForm.get('email').value;
    const password = this.signinForm.get('password').value;
    this.authService.signinUser(email, password);
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  onCancel() {
    this.signinForm.reset();
  }
}
