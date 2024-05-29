import { Component, inject } from '@angular/core';
import {
  AlertController,
  ToastController,
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
  #toastCtrl = inject(ToastController);
  #productsService = inject(ProductsService);
  #nav = inject(NavController);

  delete() {
    this.#nav.navigateBack(['/products']);
  }

  async buyProduct() {
    (
      await this.#alertCtrl.create({
        header: this.product()!.title,
        message: '¿Quieres comprar este producto?',
        buttons: [
          {
            text: 'Confirmar',
            handler: () =>
              this.#productsService.buyProduct(this.product()!.id).subscribe({
                next: async () => {
                  this.#productsService
                    .getProduct(this.product()!.id)
                    .subscribe((p) => this.product.set(p));

                  (
                    await this.#toastCtrl.create({
                      message: '¡El producto ha sido comprado!',
                      duration: 3000,
                      position: 'top',
                      positionAnchor: 'header',
                      color: 'success',
                    })
                  ).present();
                },
                error: () => console.error('Error comprando producto'),
              }),
          },
          {
            text: 'Cancelar',
            role: 'cancel',
          },
        ],
      })
    ).present();
  }
}
