import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { UserService } from '../user.service';
import { Subscription } from 'rxjs/Subscription';
import { UserState } from '../../shared/model/user-state.model';
import { AuthService } from '../../auth/auth.service';
import { AuthState } from '../../shared/model/auth-state.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, OnDestroy {

  email: string;
  userServiceSubscription: Subscription;
  userState: UserState = new UserState(null, '', '', '', []);
  authState: AuthState;
  userForm: FormGroup;

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
          let imagesArray = new FormArray([]);

          // Prepare images array
          if (this.userState.images) {
            for (let image of this.userState.images) {
              imagesArray.push(
                new FormGroup({
                  'name': new FormControl(image.name, Validators.required),
                  'url': new FormControl(image.url, Validators.required)
                })
              );
            }
          }

          this.userForm = new FormGroup({
            'email': new FormControl(this.authState.email),
            'firstName': new FormControl(this.userState.firstName, Validators.required),
            'lastName': new FormControl(this.userState.lastName, Validators.required),
            'description': new FormControl(this.userState.description),
            'images': imagesArray
          });
        }

      });


      this.authService.getAuthState()
        .then(state => {
          this.authState = state;
          this.userService.getUser(this.authState.email);
          this.userForm.patchValue({
            'email': this.authState.email
          });
      });

      this.userForm = new FormGroup({
        'email': new FormControl(this.email),
        'firstName': new FormControl('', Validators.required),
        'lastName': new FormControl('', Validators.required),
        'description': new FormControl(''),
        'images': new FormArray([])
      });
  }

  getControls() {
    return (<FormArray>this.userForm.get('images')).controls;
  }

  onAddImage() {
    (<FormArray>this.userForm.get('images')).push(
      new FormGroup({
        'name': new FormControl('', Validators.required),
        'url': new FormControl('', Validators.required)
      })
    );
  }

  onDeleteImage(index: number) {
    (<FormArray>this.userForm.get('images')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../details'], { relativeTo: this.route });
  }

  onSubmit() {
    const userState: UserState = new UserState
    (
      this.authState.email,
      this.userForm.get('firstName').value,
      this.userForm.get('lastName').value,
      this.userForm.get('description').value,
      this.userForm.get('images').value
    );
    this.userService.saveUser(userState);
    this.onCancel();
  }

  ngOnDestroy() {
    this.userServiceSubscription.unsubscribe();
  }
}
