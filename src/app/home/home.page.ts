import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DashboardData } from '../models/dashboard-data.model';
import { Entry } from '../models/entry.model';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public appTitle = 'Earnings Spendings Diary';
  public entries: Entry[];
  public dashboardData: DashboardData;
  public showRecentEntriesList = true;
  public earningCategories = ['Salary', 'Investment Returns', 'Others'];
  public spendingCategories = ['Shopping', 'Groceries', 'Entertainment', 'Travel', 'Others'];
  public entryType = 'earning';
  public amount: number;
  public description: string;
  public category: string;
  public pageNumber = 1;
  public itemPerPage = Number.POSITIVE_INFINITY;
  constructor(private activatedRoute: ActivatedRoute, private toastController: ToastController, private storageService: StorageService) { }

  ngOnInit(){
    this.syncEntries();
  }

  syncEntries(){
    this.storageService.getEntries(this.pageNumber, this.itemPerPage).then(data => this.entries = data);
    this.storageService.getDashboardData().then(data => this.dashboardData = data);
  }

  checkFormValidation(): boolean {
    if(this.amount <= 0 || !this.description || !this.category){
      return false;
    }
    return true;
  }

  saveEntry(): void {
    if(!this.checkFormValidation()) {
      return this.presentToast('Error', 'All fields are required!');
    }
    const entry: Entry = {
      id: new Date().getTime() + '',
      description: this.description,
      date: new Date().toString(),
      amount: this.amount,
      type: this.entryType,
      category: this.category,
    };
    this.storageService.saveEntry(entry).then(() => {
     this.syncEntries();
    });
    this.presentToast('Success', 'Your entry has been saved.');
    this.hideForm();
  }

  presentToast(header: string, message: string) {
    this.toastController.create({
      header,
      message,
      position: 'bottom',
      duration: 2000,
      color: header === 'Error'? 'danger' : 'success'
    }).then((toast) => toast.present());
  }

  resetForm(): void{
    this.entryType = 'earning';
    this.amount = 0;
    this.category = null;
    this.description = null;
  }

  hideForm(): void {
    this.resetForm();
    this.showRecentEntriesList = true;
  }

  deleteItem(id): void {
    this.storageService.deleteEntryById(id).then(()=> {
      this.syncEntries();
    });
  }
}
