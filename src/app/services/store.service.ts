import { Injectable } from '@angular/core';
import { user } from '../models/user';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class StoreService {

  user: user;
  id = '';

  constructor(private router: Router) {
   
   }

  public createUser(objUser){

    this.user = objUser;

    this.router.navigate(['chatroom']);
  }
}
