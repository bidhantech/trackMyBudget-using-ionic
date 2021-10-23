/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { DashboardData } from '../models/dashboard-data.model';
import { Entry } from '../models/entry.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storageName = 'earning-spending-diary-storage';
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.initStorage();
  }

  async initStorage() {
    if (this._storage != null) {
      return;
    }
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async saveEntry(entry: Entry) {
    try {
      await this.initStorage();
      const previousData = await this.getEntries();
      const data = previousData.concat(entry);
      await this._storage.set(this.storageName, JSON.stringify(data));
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async getEntries(pageNumber: number = 1, itemPerPage: number = Number.POSITIVE_INFINITY): Promise<Entry[]> {
    try {
      await this.initStorage();
      let response = await this._storage.get(this.storageName);
      response = JSON.parse(response) || [];
      response = response.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      if (response.length > itemPerPage) {
        response = response.slice(itemPerPage * (pageNumber - 1), (itemPerPage * (pageNumber - 1)) + itemPerPage);
      }
      return response;
    } catch (e) {
      console.log(e);
    }
  }

  async deleteEntryById(id: string) {
    try {
      await this.initStorage();
      let data = await this.getEntries();
      data = data.filter(item => item.id !== id);
      await this._storage.set(this.storageName, JSON.stringify(data));
      return true;
    } catch (e) {
      console.log(e);
    }
  }

  async getDashboardData(): Promise<DashboardData> {
    const data = await this.getEntries();
    const totalEarnings = data.filter(item => item.type === 'earning').reduce((sum, item) => item.amount + sum, 0) || 0;
    const totalSpendings = data.filter(item => item.type === 'spending').reduce((sum, item) => item.amount + sum, 0) || 0;
    const totalAvailable = totalEarnings - totalSpendings || 0;
    return {
      totalEarnings,
      totalSpendings,
      totalAvailable
    };
  }

}
