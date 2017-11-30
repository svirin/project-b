import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, NgForm, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  @ViewChild('passField') passField: ElementRef;
  errorValue: string;
  signupForm: FormGroup;
  authSubscription: Subscription;

  constructor
  (
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this.signupForm = new FormGroup({
        'email': new FormControl('', [Validators.required, Validators.email]),
        'password': new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^[1-9]+[0-9]*$/)]),
        'confirmpassword': new FormControl('', [Validators.required, this.confirm.bind(this)])
      });

    this.authSubscription = this.authService.authResult.subscribe(
      (authResult) => {
        if (authResult.isAutenticated) {
          this.router.navigate(['../user/details'], { relativeTo: this.route });
        }
        else {
          this.errorValue = authResult.error;
          this.signupForm.get('email').setErrors({ 'incorrect': true });
        }
      }
    );
  }

  confirm(control: FormControl): { [s: string]: boolean } {
    const password = this.passField.nativeElement.value;
    if (control.value !== password) {
      return { 'confirm': true };
    }
    return null;
  }

  onSignup() {
    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;
    this.authService.signupUser(email, password);
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  onCancel() {
    this.signupForm.reset();
  }
}
