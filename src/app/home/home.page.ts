import { Component } from '@angular/core';
import { StoreService } from '../services/store.service';
import { user } from '../models/user';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  displayName: string;
  roomName: string;
  

  constructor(private store: StoreService) {}

  join(): void{
    let newUser: user = {
      displayName: this.displayName,
      roomName: this.roomName
    }
    this.store.createUser(newUser);
  }

}
