import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import {
  AlertController,
  ToastController,
  IonHeader,
  IonToolbar,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonButton,
  IonIcon,
  IonLabel,
  IonItem,
  IonAvatar,
  IonRouterLink,
  IonImg,
  IonCol,
  IonRow,
  IonItemGroup,
  IonGrid,
} from '@ionic/angular/standalone';
import { Product } from '../interfaces/product';
import { ProductsService } from '../services/products.service';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'product-item',
  templateUrl: './product-item.page.html',
  styleUrls: ['./product-item.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonButton,
    IonIcon,
    IonLabel,
    IonItem,
    IonAvatar,
    RouterLink,
    IonRouterLink,
    IonImg,
    CurrencyPipe,
    IonCol,
    IonRow,
    DatePipe,
    IonItemGroup,
    IonGrid,
  ],
})
export class ProductItemPage {
  @Input({ required: true }) product!: Product;
  @Output() deleted = new EventEmitter<void>();
  @Output() favChanged = new EventEmitter<void>();

  #productsService = inject(ProductsService);
  #alertCtrl = inject(AlertController);
  #toastCtrl = inject(ToastController);

  async delete() {
    const alert = await this.#alertCtrl.create({
      header: '¿Estás seguro de borrar este producto?',
      message: 'Esta acción no se podrá deshacer',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.#productsService.deleteProduct(this.product.id).subscribe({
              next: async () => {
                this.deleted.emit();
                (
                  await this.#toastCtrl.create({
                    message: 'El producto se ha eliminado',
                    duration: 3000,
                    position: 'bottom',
                    color: 'danger',
                  })
                ).present();
              },
              error: () => console.error('Error borrando el producto'),
            });
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
        },
      ],
    });
    alert.present();
  }

  changeFavorite() {
    if (this.product.bookmarked) {
      this.#productsService.deleteFavorite(this.product.id).subscribe({
        next: async () => {
          this.favChanged.emit();
          (
            await this.#toastCtrl.create({
              message: 'El producto se ha eliminado de favoritos',
              duration: 3000,
              position: 'bottom',
              color: 'danger',
            })
          ).present();
          this.product.bookmarked = false;
        },
        error: () => console.error('Error quitando favorito'),
      });
    } else {
      this.#productsService.addFavorite(this.product.id).subscribe({
        next: async () => {
          this.favChanged.emit();
          (
            await this.#toastCtrl.create({
              message: 'El producto se ha añadido a favoritos',
              duration: 3000,
              position: 'bottom',
              color: 'success',
            })
          ).present();
          this.product.bookmarked = true;
        },
        error: () => console.error('Error añadiendo favorito'),
      });
    }
  }
}
