import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  async scheduleNotification(): Promise<void>{
    await LocalNotifications.requestPermissions();
    await LocalNotifications.createChannel(
      {
        id: '101',
        name: 'FIRENDLY REMINDERS',
        importance: 5,
        visibility: 1
      }
    );
     await LocalNotifications.schedule({notifications: [{
        id: 1,
        body: 'Don\'t forget to keep track of your spending!',
        title: 'Spent money on something?',
        channelId: '101',
        schedule: { every: 'hour', count: 2, allowWhileIdle: true }
      },
      {
        id: 2,
        body: 'Don\'t forget to keep track of your budget!',
        channelId: '101',
        title: 'Recieved your salary?',
        schedule: { on: { minute: 12 }, repeats: true, allowWhileIdle: true },
      }
    ]});
  }
}
