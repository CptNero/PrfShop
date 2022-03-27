import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs";
import {UserService} from "../services/user.service";
import {User} from "../models/user";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  // @ts-ignore
  registerForm: FormGroup;
  // @ts-ignore
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private authenticationService: AuthService
  ) {

  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f() { return this.loginForm.controls; }

  onRegisterUser() {
    this.submitted = true;

    if (this.registerForm.invalid) { return; }

    this.userService.register(this.registerForm.value)
      .pipe(first())
      .subscribe({
        next: (data) => {
          console.log('Success')
        },
        error: (error) => {
          //console.log(error)
        }
      })
  }

  onLoginUser() {
    this.submitted = true

    if (this.loginForm.invalid) {
      return;
    }

    this.authenticationService.login(this.loginForm.value).subscribe({
      next: (user) => {
        this.authenticationService.setUserInfo(user)
        this.router.navigate(['/products'])
      },
      error: () => {
        this.router.navigate(['/'])
      }
    })
  }

}
