import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';

@Injectable()
export class NotificationService {

  constructor() { }

  private url = `${environment.notificationUrl}:${environment.socket_notifications_port}`;  
  private socket;


  getNotification(): Observable<Notification> {
    let observable = new Observable<Notification>(observer => {
      this.socket = io(this.url);
      this.socket.on('new-notification', (data) => {
        let notification : Notification = data.fullDocument;
        observer.next(notification);    
      });
      return () => {
        this.socket.disconnect();
      };  
    })     
    return observable;
  }  
}