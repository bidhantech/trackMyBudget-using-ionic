import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Analyze Earnings', url: '/graphs/earnings', icon: 'trending-up' },
    { title: 'Analyze Spendings', url: '/graphs/spendings', icon: 'trending-down' },
    { title: 'About', url: '/about', icon: 'information-circle' }
  ];
  constructor() {}
}
