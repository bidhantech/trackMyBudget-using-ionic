import { Component } from '@angular/core';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage{
  async share(){
    await Share.share({
      title: 'trackMyBudget - An app to track your budget!',
      text: 'Download trackMyBudget and get insights about your spending habits & control unnecessary spending.',
      url: 'http://ionicframework.com/',
      dialogTitle: 'Share with friends & family',
    });
  }
}
