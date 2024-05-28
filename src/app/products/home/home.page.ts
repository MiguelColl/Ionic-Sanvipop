import {
  Component,
  WritableSignal,
  computed,
  inject,
  signal,
} from '@angular/core';
import {
  IonRouterLink,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonRefresher,
  IonRefresherContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonList,
  IonItem,
  IonThumbnail,
  IonLabel,
  IonButton,
  IonSearchbar,
  IonChip,
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../interfaces/product';
import { ProductsService } from '../services/products.service';
import { ProductItemPage } from '../product-item/product-item.page';
import { FormsModule } from '@angular/forms';
import { ProductsURL } from '../interfaces/urls';

@Component({
  selector: 'home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CurrencyPipe,
    RouterLink,
    IonRouterLink,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
    IonRefresher,
    IonRefresherContent,
    IonFab,
    IonFabButton,
    IonIcon,
    IonList,
    IonItem,
    IonThumbnail,
    IonLabel,
    IonButton,
    ProductItemPage,
    IonSearchbar,
    FormsModule,
    IonChip,
  ],
})
export class HomePage {
  #productsService = inject(ProductsService);
  products: WritableSignal<Product[]> = signal([]);
  search = signal('');
  title = signal('Productos en venta');
  #favoritePage = false;

  filteredProducts = computed(() =>
    this.products().filter(
      (p) =>
        p.title.toLocaleLowerCase().includes(this.search().toLowerCase()) ||
        p.description.toLocaleLowerCase().includes(this.search().toLowerCase())
    )
  );

  ionViewWillEnter() {
    this.#productsService
      .getProducts()
      .subscribe((prods) => this.products.set(prods));
  }

  reloadProducts(refresher: IonRefresher) {
    this.#productsService.getProducts().subscribe((prods) => {
      this.products.set(prods);
      refresher.complete();
    });
  }

  deleteProduct(product: Product) {
    this.products.update((products) => products.filter((p) => p !== product));
  }

  favoriteChanged(product: Product) {
    if(this.#favoritePage) {
      this.products.update((products) => products.filter((p) => p !== product));
    }
  }

  changeProducts(filter: string = '') {
    this.#favoritePage = false;
    let prodURL = ProductsURL.ALL;
    this.title.set('Productos en venta');
    switch (filter) {
      case 'selling':
        prodURL = ProductsURL.SELLING;
        this.title.set('Mis productos a la venta');
        break;
      case 'favorites':
        this.#favoritePage = true;
        prodURL = ProductsURL.FAVORITES;
        this.title.set('Mis productos favoritos');        
        break;
      case 'bought':
        prodURL = ProductsURL.BOUGHT;
        this.title.set('Mis productos comprados');
        break;
      case 'sold':
        prodURL = ProductsURL.SOLD;
        this.title.set('Mis productos vendidos');
        break;
    }

    this.#productsService
      .getProducts(prodURL)
      .subscribe((products) => this.products.set(products));
  }
}
