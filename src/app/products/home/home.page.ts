import { Component, OnInit, inject } from '@angular/core';
import { NavController, ActionSheetController, IonRouterLink, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonRefresher, IonRefresherContent, IonFab, IonFabButton, IonIcon, IonList, IonItem, IonThumbnail,IonLabel, IonButton } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../interfaces/product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [CurrencyPipe, RouterLink, IonRouterLink, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonRefresher, IonRefresherContent, IonFab, IonFabButton, IonIcon, IonList, IonItem, IonThumbnail,IonLabel, IonButton]
})
export class HomePage {
  products: Product[] = [];

  #productsService = inject(ProductsService);
  #navController = inject(NavController);
  #actionSheetCtrl =inject(ActionSheetController);

  ionViewWillEnter() {
    this.#productsService
      .getProducts()
      .subscribe((prods) => (this.products = prods));
  }

  reloadProducts(refresher: IonRefresher) {
    this.#productsService
    .getProducts()
    .subscribe((prods) => {
      this.products = prods;
      refresher.complete();
    });
  }

  async showOptions(prod: Product) {
    const actSheet = await this.#actionSheetCtrl.create({
      header: prod.description,
      buttons: [
        {
          text: 'Borrar',
          icon: 'trash',
          role: 'destructive',
          handler: () => {
            this.#productsService
              .deleteProduct(prod.id!)
              .subscribe(() =>
                this.products.splice(this.products.indexOf(prod), 1)
              );
          },
        },
        {
          text: 'Ver detalles',
          icon: 'eye',
          handler: () => {
            this.#navController.navigateForward(['/products', prod.id]);
          },
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });

    actSheet.present();
  }
}