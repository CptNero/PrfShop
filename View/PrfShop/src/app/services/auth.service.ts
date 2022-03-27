import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {User} from "../models/user";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('userInfo') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public isAuthenticated() : Boolean {
    let userData = localStorage.getItem('userInfo') || '{}'

    if (JSON.parse(userData) && userData != '{}') {
      return true;
    }

    return false;
  }

  public setUserInfo(user: User){
    localStorage.setItem('userInfo', JSON.stringify(user));
  }

  login(user: User) {
    return this.http.post<User>(`${environment.apiUrl}/login`, user)
  }

  logout(user: User) {
    // remove user from local storage and set current user to null
    localStorage.removeItem('userInfo');
    this.http.post<User>(`${environment.apiUrl}/logout`, user)
    // @ts-ignore
    this.currentUserSubject.next(null);
    this.router.navigate(['/'])
  }
}
