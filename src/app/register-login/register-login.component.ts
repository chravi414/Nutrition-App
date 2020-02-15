import { UserDataService } from './../user-data.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.css']
})
export class RegisterLoginComponent implements OnInit {
  public email :string;
  public password: string;
  public repeatPassword: string;
  public name : string;
  public passwordMatchError = false;
  public isRegistration = true;
  public isLogin = false;
  public regForm: FormGroup;
  public loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private userService : UserDataService) { 
    this.regForm = this.fb.group({
        name : ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
    });
  
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
  })
  }

  ngOnInit() {
    console.log(this.regForm.get('email').errors.required)
  }

  validatePassword() {
    if (this.regForm.get('password').value === this.regForm.get('confirmPassword').value) {
      return true;
    } else {
      return false;
    }
  }
  register() {
    if (this.validatePassword()) {
      this.passwordMatchError = false;
      this.userService.registerUser(this.regForm.value);
      localStorage.setItem('isLogged', JSON.stringify(true));
      this.router.navigate(['/index']);      
    } else {
      this.passwordMatchError = true;
    }
  }

  login() {
    const result = this.userService.getUsers(this.loginForm.value);
    console.log(result);
    if (result) {
      this.router.navigate(['/index']);
      localStorage.setItem('isLogged', JSON.stringify(true));
    } else {
      alert("Failed");
    }
  }
}
