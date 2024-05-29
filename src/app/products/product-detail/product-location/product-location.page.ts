import { Component, NgZone, inject } from '@angular/core';
import {
  AlertController,
  IonHeader,
  IonToolbar,
  IonContent,
  IonRefresher,
  IonRefresherContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonList,
  IonItem,
  IonAvatar,
  IonImg,
  IonLabel,
} from '@ionic/angular/standalone';
import { ProductDetailPage } from '../product-detail.page';
import { BmMapDirective } from 'src/app/bingmaps/bm-map.directive';
import { BmMarkerDirective } from 'src/app/bingmaps/bm-marker.directive';
import { Coordinates } from 'src/app/bingmaps/coordinates';
import { StartNavigation } from '@proteansoftware/capacitor-start-navigation';

@Component({
  selector: 'product-location',
  templateUrl: './product-location.page.html',
  styleUrls: ['./product-location.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonContent,
    IonRefresher,
    IonRefresherContent,
    IonFab,
    IonFabButton,
    IonIcon,
    IonList,
    IonItem,
    IonAvatar,
    IonImg,
    IonLabel,
    BmMapDirective,
    BmMarkerDirective
  ],
})
export class ProductLocationPage {
  product = inject(ProductDetailPage).product; // Obtenemos signal de la página padre

  coords?: Coordinates;

  ionViewWillEnter() {
    this.coords = {
      latitude: this.product()!.owner.lat,
      longitude: this.product()!.owner.lng
    };
  }

  async navigateTo() {
    StartNavigation.launchMapsApp({
      latitude: this.coords!.latitude,
      longitude: this.coords!.longitude,
    });
  }
}
