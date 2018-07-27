import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_helpers/_models';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_helpers/_services/authentication.service';

@Component({templateUrl: 'application.component.html'})
export class HomeComponent {

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  private logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['login']);
  }
}
