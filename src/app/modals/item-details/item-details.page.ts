import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.page.html',
  styleUrls: ['./item-details.page.scss'],
})
export class ItemDetailsPage implements OnInit {
  @Input() id: string;
  @Input() description: string;
  @Input() date: string;
  @Input() amount: number;
  @Input() type: string;
  @Input() category: string;

  constructor(public modalController: ModalController, private storageService: StorageService) { }

  ngOnInit() {
  }

  closeModal(deleted: boolean = false, id: string = this.id) {
    this.modalController.dismiss({
      dismissed: true,
      deleted,
      id
    });
  }

}
