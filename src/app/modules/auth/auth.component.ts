import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { FormControl } from '@angular/forms';
import {UserCredentials} from '../../core/models/user-credentials';
import {AuthService} from '../../core/services/auth.service';
import { ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  hide = true;
  credentials: UserCredentials;
  invalidEmailMessage = 'INVALID_EMAIL';
  invalidPasswordMessage = 'INVALID_PASSWORD';
  emailNotFoundMessage = 'EMAIL_NOT_FOUND';
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    const currentUser = this.authService.currentUserValue;
    if (currentUser && currentUser.authdata) {
      this.router.navigate(['/tweets']);
    }
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }
    this.credentials = {
      email : this.loginForm.controls.email.value,
      password : this.loginForm.controls.password.value
    };
    this.loading = true;
    this.authService.login(this.credentials).subscribe(
      response => {
        this.loading = false;
        this.router.navigate(['/tweets']);
      }, error => {
        this.loading = false;
        this.handleError(error);
      }
    );
  }

  handleError(error) {
      switch (error) {
        case this.invalidEmailMessage:
        case this.invalidPasswordMessage:
        case this.emailNotFoundMessage:
          this.toastr.error('You have entered an invalid email or password', 'Invalid');
          break;
        default:
          this.toastr.error('Something wrong happened, please try again later', 'Error');
          break;
      }
  }

  getErrorMessage() {
    return 'This field is required';
  }
}
