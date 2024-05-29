import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonImg,
  IonCardSubtitle,
  IonButtons,
  IonMenuButton,
  IonButton,
  IonCardTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  ModalController,
  ToastController,
} from '@ionic/angular/standalone';
import { ProfilesService } from '../services/profiles.service';
import { User, UserProfileEdit, UserPhotoEdit } from '../interfaces/user';
import { BmMapDirective } from 'src/app/bingmaps/bm-map.directive';
import { BmMarkerDirective } from 'src/app/bingmaps/bm-marker.directive';
import { Coordinates } from 'src/app/bingmaps/coordinates';
import { ChangeDataComponent } from 'src/app/modals/change-data/change-data.component';
import { ChangePasswordComponent } from 'src/app/modals/change-password/change-password.component';
import { ChangeImageComponent } from 'src/app/modals/change-image/change-image.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AppComponent } from 'src/app/app.component';
import { RatingsService } from 'src/app/ratings/ratings.service';
import { Rating } from 'src/app/ratings/interfaces/rating';
import { RatingItemPage } from 'src/app/ratings/rating-item/rating-item.page';

@Component({
  selector: 'profile-page',
  templateUrl: './profile-page.page.html',
  styleUrls: ['./profile-page.page.scss'],
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
    IonCardHeader,
    IonImg,
    IonCardSubtitle,
    IonButtons,
    IonMenuButton,
    IonButton,
    IonCardTitle,
    BmMapDirective,
    BmMarkerDirective,
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
    RatingItemPage,
  ],
})
export class ProfilePagePage {
  @Input() id?: number;
  user = signal<User | null>(null);
  coords = signal<Coordinates | null>(null);
  ratings: Rating[] | null = null;

  #appComponent = inject(AppComponent);
  #profilesService = inject(ProfilesService);
  #ratingsService = inject(RatingsService);
  #modalCtrl = inject(ModalController);
  #toastCtrl = inject(ToastController);

  ionViewWillEnter() {
    if (this.id) {
      this.#profilesService.getProfile(this.id).subscribe((u) => {
        this.user.set(u);
        this.updateCoords(u.lat, u.lng);
      });

      this.#ratingsService
        .getRatings(this.id)
        .subscribe((resp) => (this.ratings = resp));
    } else {
      this.#profilesService.getMyProfile().subscribe((u) => {
        this.user.set(u);
        this.updateCoords(u.lat, u.lng);
      });

      this.#ratingsService
        .getMyRatings()
        .subscribe((resp) => (this.ratings = resp));
    }
  }

  updateCoords(lat: number, lng: number) {
    this.coords.set({
      latitude: lat,
      longitude: lng,
    });
  }

  async changeProfile() {
    const data: UserProfileEdit = {
      email: this.user()!.email,
      name: this.user()!.name,
    };

    const modal = await this.#modalCtrl.create({
      component: ChangeDataComponent,
      componentProps: { data: data },
    });
    await modal.present();
    const result = await modal.onDidDismiss();
    if (result.data && result.data.ok) {
      this.showToast('Los datos del usuario se han cambiado');
      this.user()!.name = result.data.profile.name;
      this.user()!.email = result.data.profile.email;
      this.#appComponent.user!.name = result.data.profile.name;
      this.#appComponent.user!.email = result.data.profile.email;
    }
  }

  async changePassword() {
    const modal = await this.#modalCtrl.create({
      component: ChangePasswordComponent,
    });
    await modal.present();
    const result = await modal.onDidDismiss();
    if (result.data && result.data.ok) {
      this.showToast('La contraseña se ha cambiado');
    }
  }

  async changeImage() {
    const photo: UserPhotoEdit = {
      photo: this.user()!.photo,
    };

    const modal = await this.#modalCtrl.create({
      component: ChangeImageComponent,
      componentProps: { avatar: photo },
    });
    await modal.present();
    const result = await modal.onDidDismiss();
    if (result.data && result.data.ok) {
      this.user()!.photo = result.data.avatar;
      this.#appComponent.user!.photo = result.data.avatar;
      this.showToast('El avatar se ha cambiado');
    }
  }

  async showToast(message: string) {
    (
      await this.#toastCtrl.create({
        message: message,
        duration: 3000,
        position: 'bottom',
        color: 'success',
      })
    ).present();
  }
}
