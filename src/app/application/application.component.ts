import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from '../_helpers/_models';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_helpers/_services/authentication.service';

@Component({templateUrl: 'application.component.html'})
export class HomeComponent implements OnInit {

  private user: any;
  private static = true;
  private confirmedPassword = '';
  private updateUserFormGroup: FormGroup;
  private userToEdit: any;
  private submitted = false;

  constructor(private router: Router, private authenticationService: AuthenticationService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    try {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    } catch (e) {}
  }

  get formData() {
    return this.updateUserFormGroup.controls;
  }

  private logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['login']);
  }

  private enableEdit(): void {
    this.userToEdit = Object.assign({}, this.user);
    this.updateUserFormGroup = this.formBuilder.group({
      firstName: [this.userToEdit.firstName, Validators.required],
      surname: [this.userToEdit.surname, Validators.required],
      username: [this.userToEdit.username, Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
    console.log(' ::>> this.userToEdit >>> ', this.userToEdit);
    this.static = false;
  }

  private cancel(): void {
    this.userToEdit = null;
    this.static = true;
  }

  private update(): void {
    this.submitted = true;
    console.log(' ::>> this.updateUserFormGroup >>>>> ', this.updateUserFormGroup);
  }
}
