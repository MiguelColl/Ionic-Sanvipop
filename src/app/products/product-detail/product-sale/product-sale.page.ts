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
  IonButton,
  IonIcon,
  ModalController,
  IonAvatar,
  IonItem,
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { ProductDetailPage } from '../product-detail.page';
import { User } from 'src/app/profile/interfaces/user';
import { AppComponent } from 'src/app/app.component';
import { RatingComponent } from 'src/app/modals/rating/rating.component';
import { RatingInfo } from 'src/app/ratings/interfaces/rating';

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
    IonButton,
    IonIcon,
    IonAvatar,
    IonItem,
  ],
})
export class ProductSalePage {
  product = inject(ProductDetailPage).product; // Obtenemos signal de la página padre
  user: User = inject(AppComponent).user!; // Usuario logueado
  userAvatar = signal('');

  #modalCtrl = inject(ModalController);

  ionViewWillEnter() {
    if (this.product()) {
      this.userAvatar.set(
        'http://api.fullstackpro.es/sanvipop/' + this.product()?.soldTo?.photo
      );
    }
  }

  async rate() {
    const name =
      this.product()!.owner.id === this.user.id
        ? this.product()!.soldTo!.name // Nombre del comprador
        : this.product()!.owner.name; // Nombre del vendedor

    const modal = await this.#modalCtrl.create({
      component: RatingComponent,
      componentProps: { id: this.product()!.id, name: name },
    });
    await modal.present();
    const result = await modal.onDidDismiss();
    if (result.data && result.data.rating) {
      if (this.product()!.rating) {
        if (this.product()!.owner.id === this.user.id) {
          this.product()!.rating.sellerRating = result.data.rating.rating;
          this.product()!.rating.sellerComment = result.data.rating.comment;
        } else {
          this.product()!.rating.buyerRating = result.data.rating.rating;
          this.product()!.rating.buyerComment = result.data.rating.comment;
        }
      } else {
        if (this.product()!.owner.id === this.user.id) {
          const rate: RatingInfo = {
            sellerRating: result.data.rating.rating,
            sellerComment: result.data.rating.comment,
            buyerRating: 0,
            buyerComment: '',
            dateTransaction: ''
          }
          this.product()!.rating = rate;
        } else {
          const rate: RatingInfo = {
            sellerRating: 0,
            sellerComment: '',
            buyerRating: result.data.rating.rating,
            buyerComment: result.data.rating.comment,
            dateTransaction: ''
          }
          this.product()!.rating = rate;
        }
      }
    }
  }
}
