import { Component, inject } from '@angular/core';
import {
  AlertController,
  NavController,
  IonHeader,
  IonToolbar,
  IonContent,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonButton,
  IonIcon,
  IonLabel,
  IonItem,
  IonAvatar,
} from '@ionic/angular/standalone';
import { ProductsService } from '../../services/products.service';
import { ProductDetailPage } from '../product-detail.page';
import { CurrencyPipe } from '@angular/common';
import { ProductItemPage } from '../../product-item/product-item.page';

@Component({
  selector: 'product-info',
  templateUrl: './product-info.page.html',
  styleUrls: ['./product-info.page.scss'],
  standalone: true,
  imports: [
    CurrencyPipe,
    IonHeader,
    IonToolbar,
    IonContent,
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonButton,
    IonIcon,
    IonLabel,
    IonItem,
    IonAvatar,
    ProductItemPage,
  ],
})
export class ProductInfoPage {
  product = inject(ProductDetailPage).product; // Obtenemos signal de la página padre

  #alertCtrl = inject(AlertController);
  #productsService = inject(ProductsService);
  #nav = inject(NavController);

  delete() {
    this.#nav.navigateBack(['/products']);
  }
}
