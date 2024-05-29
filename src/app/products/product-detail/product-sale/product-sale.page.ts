import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonImg,
  IonCardSubtitle,
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { ProductDetailPage } from '../product-detail.page';

@Component({
  selector: 'product-sale',
  templateUrl: './product-sale.page.html',
  styleUrls: ['./product-sale.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonLabel,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonImg,
    RouterLink,
    IonCardSubtitle,
  ],
})
export class ProductSalePage {
  product = inject(ProductDetailPage).product; // Obtenemos signal de la página padre
  userAvatar = signal('');

  ionViewWillEnter() {
    if(this.product()) {
      this.userAvatar.set('http://api.fullstackpro.es/sanvipop/' + this.product()?.soldTo?.photo)
    }
  }
}
