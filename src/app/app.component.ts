import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/', icon: 'home' },
    { title: 'Analyse Earnings', url: '/graphs/earnings', icon: 'trending-up' },
    { title: 'Analyse Spendings', url: '/graphs/spendings', icon: 'trending-down' },
    { title: 'About', url: '/about', icon: 'information-circle' }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
