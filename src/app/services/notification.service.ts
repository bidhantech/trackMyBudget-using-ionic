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
        schedule: { at: new Date(new Date().getTime() + (120 * 60 * 1000)), allowWhileIdle: true }
      },
      {
        id: 2,
        body: 'Don\'t forget to keep track of your spending!',
        title: 'Spent money on something?',
        channelId: '101',
        schedule: { at: new Date(new Date().getTime() + (340 * 60 * 1000)), allowWhileIdle: true }
      },
      {
        id: 3,
        body: 'Don\'t forget to keep track of your budget!',
        channelId: '101',
        title: 'Recieved your salary?',
        schedule: { on: { day: 1, hour: 20 }, repeats: true, allowWhileIdle: true },
      }
    ]});
  }
}
