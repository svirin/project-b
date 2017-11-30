import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../../auth/auth.service';
import { AuthState } from '../../shared/model/auth-state.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  authState: AuthState = new AuthState(null, null, false, null);
  authSubscription: Subscription;

  constructor
  (
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  

  ngOnInit() {

    this.authSubscription = this.authService.authResult
      .subscribe((authState) => {
        this.authState = authState;
      });
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  onLogout() {
    this.authService.signOut();
    this.router.navigate(['/']);
  }
}
