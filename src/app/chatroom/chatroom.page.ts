import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StoreService } from '../services/store.service';
import { Socket } from 'ngx-socket-io';
import { ToastController } from '@ionic/angular';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.page.html',
  styleUrls: ['./chatroom.page.scss'],
})
export class ChatroomPage implements OnInit {

  @ViewChild(IonContent,{static: false}) ionContent: IonContent;

  content: any = '';
  messages: any[] = [];
  room = '';
  count = 0;
  botMessage ='';

  constructor(private store: StoreService, private socket: Socket, private toastCtrl: ToastController) { }

  ngOnInit() {

    this.socket.connect();
    this.socket.emit('join', this.store.user);

    this.socket.fromEvent('server-message').subscribe(data => {
      
      if(data['dispalyName'] === "Multimix"){
        this.botMessage = data['msg'];
        this.showToast(this.botMessage);
      }else{
        this.messages.push(data);
        this.scrollPage();
        
        
      }
    });

    this.socket.fromEvent('roomUsers').subscribe(data => {
      this.room = data['room'];
      this.count = data['users'].length;
    });


    
  }

  

  scrollPage(){
    this.ionContent.scrollToBottom(300);
  }

  ionViewWillLeave() {
    this.socket.disconnect();
  }
 
  async showToast(msg) {
    let toast = await this.toastCtrl.create({
      message: msg,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }

  sendMessage(){


    this.socket.emit('client-message',this.content);
    this.content = '';
    this.scrollPage();

  }

}
