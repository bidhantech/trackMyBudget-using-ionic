import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  public appTitle = 'Earnings Spendings Diary';
  constructor(private activatedRoute: ActivatedRoute) { }

}
