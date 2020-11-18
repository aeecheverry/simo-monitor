import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';
import { User } from '../models/user';
import { ClientService } from '../services/client.service';
import { TransactionService } from '../services/transaction.service';
import { NotificationService } from '../services/notification.service';
import { Howl} from 'howler';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers: [ClientService, TransactionService, NotificationService]
})
export class AdminComponent implements OnInit {
  currentUser: User;
  profileName: string;
  notifications = [];
  hearlierNotifications = [];
  badgeContent = 0;

  sound = new Howl({
    src: ['../../assets/notif.mp3']
  });

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private authenticationService: AuthenticationService
  ) { 
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.profileName = this.currentUser.name.split(' ').map(name => name[0]).join('').toUpperCase();
  }

  ngOnInit(): void {
    this.notificationService.getNotification().subscribe(notification =>{
      this.hearlierNotifications.push(notification);
      this.badgeContent = this.hearlierNotifications.length;
      this.sound.play();
    });
  }

  onNotificationsClick(){
    this.notifications.concat(this.hearlierNotifications);
    if(this.hearlierNotifications.length>5){
      this.hearlierNotifications = [];
    }
    this.badgeContent = 0;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
