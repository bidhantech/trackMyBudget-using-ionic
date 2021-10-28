import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DashboardData } from '../models/dashboard-data.model';
import { Entry } from '../models/entry.model';
import { StorageService } from '../services/storage.service';
import { ModalController } from '@ionic/angular';
import { ItemDetailsPage } from '../modals/item-details/item-details.page';
import { NotificationService } from '../services/notification.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public appTitle = 'trackMyBudget';
  public entries: Entry[];
  public dashboardData: DashboardData;
  public showRecentEntriesList = true;
  public earningCategories: string[];
  public spendingCategories: string[];
  public date = new Date().toISOString();
  public entryType = 'earning';
  public amount: number;
  public description: string;
  public category: string;
  public pageNumber = 1;
  public itemPerPage = Number.POSITIVE_INFINITY;
  constructor(
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
    private storageService: StorageService,
    private notificationService: NotificationService,
    public modalController: ModalController
  ) { }

  ngOnInit() {
    this.syncData();
    this.notificationService.scheduleNotification();
  }

  syncData() {
    this.earningCategories = this.storageService.getEarningCategories();
    this.spendingCategories = this.storageService.getSpendingCategories();
    this.storageService.getEntries(this.pageNumber, this.itemPerPage).then(data => this.entries = data);
    this.storageService.getDashboardData().then(data => this.dashboardData = data);
  }

  checkFormValidation(): boolean {
    if (this.amount <= 0 || !this.description || !this.category) {
      return false;
    }
    return true;
  }

  saveEntry(): void {
    if (!this.checkFormValidation()) {
      return this.presentToast('Error', 'All fields are required!');
    }
    const entry: Entry = {
      id: new Date().getTime() + '',
      description: this.description,
      date: this.date.toString(),
      amount: this.amount,
      type: this.entryType,
      category: this.category,
    };
    this.storageService.saveEntry(entry).then(() => {
      this.syncData();
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
      color: header === 'Error' ? 'danger' : 'success'
    }).then((toast) => toast.present());
  }

  async presentModal(entry: Entry) {
    const modal = await this.modalController.create({
      component: ItemDetailsPage,
      cssClass: 'my-custom-class',
      componentProps: entry
    });
    modal.onDidDismiss().then((data) => {
      // Call the method to do whatever in your home.ts
      if (data.data.id && data.data.deleted) {
        this.deleteItem(data.data.id);
      }
    });
    // modal.onDidDismiss(() => console.log('hi'));
    return await modal.present();
  }

  resetForm(): void {
    this.entryType = 'earning';
    this.amount = null;
    this.category = null;
    this.description = null;
  }

  hideForm(): void {
    this.resetForm();
    this.showRecentEntriesList = true;
  }

  deleteItem(id): void {
    this.storageService.deleteEntryById(id).then(() => {
      this.syncData();
    });
  }
}
