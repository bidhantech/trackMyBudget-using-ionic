import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Entry } from '../models/entry.model';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public appTitle = 'Earnings Spendings Diary';
  private entries: Entry[];
  private showRecentEntriesList = true;
  private earningCategories = ['Salary', 'Investment Returns', 'Others'];
  private spendingCategories = ['Shopping', 'Groceries', 'Entertainment', 'Travel', 'Others'];
  private entryType = 'earning';
  private amount: number;
  private description: string;
  private category: string;
  private pageNumber = 1;
  private itemPerPage = 5;
  constructor(private activatedRoute: ActivatedRoute, private toastController: ToastController, private storageService: StorageService) { }

  ngOnInit(){
    this.syncEntries();
  }

  syncEntries(){
    this.storageService.getEntries(this.pageNumber, this.itemPerPage).then(data => this.entries = data);
  }

  saveEntry(): void {
    const entry: Entry = {
      id: new Date().getTime() + '',
      description: this.description,
      amount: this.amount,
      type: this.entryType,
      category: this.category,
    };
    this.storageService.saveEntry(entry).then(() => {
     this.syncEntries();
    });
    this.presentToast('Your entry has been saved.');
    this.hideForm();
  }

  presentToast(message: string) {
    this.toastController.create({
      message,
      duration: 2000
    }).then((toast) => toast.present());
  }

  hideForm(): void {
    this.showRecentEntriesList = true;
  }

  deleteItem(id): void {
    this.storageService.deleteEntryById(id).then(()=> {
      this.syncEntries();
    });
  }
}
