import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from '../_helpers/_models';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_helpers/_services/authentication.service';
import { UserService } from './../_helpers/_services/user.service';

@Component({templateUrl: 'application.component.html'})
export class DashboardComponent implements OnInit {

  private user: any;
  private updated = false;
  private static = true;
  private confirmedPassword = '';
  private updateUserFormGroup: FormGroup;
  private userToEdit: any;
  private submitted = false;

  constructor(private router: Router, private authenticationService: AuthenticationService, private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    try {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    } catch (e) {}
  }

  get formData() {
    return this.updateUserFormGroup.controls;
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
    this.updated = false;
  }

  private update(): void {
    this.submitted = true;

    console.log(' ::>> this.updateUserFormGroup >>>>> ', this.updateUserFormGroup);
    if (this.updateUserFormGroup.invalid) {
      return;
    }

    const user = {
      firstName: this.formData.firstName.value,
      surname: this.formData.surname.value,
      username: this.formData.username.value,
      password: this.formData.password.value,
      confirmPassword: this.formData.confirmPassword.value
    };
    this.userToEdit = null;

    this.userService.update(user)
      .pipe(first())
      .subscribe(
        data => {
          console.log(' user updated ', data);
          this.user = user;
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.updated = true;

          setTimeout(() => {
            this.cancel();
          }, 2000);
        },
        error => {
          console.log(' failed to update user error = ', error);
        });
  }

  private logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['']);
  }
}
