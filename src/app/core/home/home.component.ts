import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor
  (
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    const res = this.authService.getAuthState();
    if (!res) {
      this.router.navigate(['/signin'], { relativeTo: this.route });
    }
    else {
      this.router.navigate(['../user/details'], { relativeTo: this.route });
    }
  }
}
