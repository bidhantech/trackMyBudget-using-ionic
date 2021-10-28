import { Injectable } from '@angular/core';
import { AppRate } from '@ionic-native/app-rate/ngx';

@Injectable({
  providedIn: 'root'
})
export class StoreRateService {
constructor(private appRate: AppRate) { }

rate(){
  this.appRate.preferences = {
    usesUntilPrompt: 2,
    storeAppURL: {
      // TODO: change it to real app id
      android: 'market://details?id=com.example.trackMyBudget-bidhantech'
    }
  };
  this.appRate.promptForRating(false);
}
}
