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
import {
  User,
  UserProfileEdit,
  UserPasswordEdit,
  UserPhotoEdit,
} from '../interfaces/user';
import { BmMapDirective } from 'src/app/bingmaps/bm-map.directive';
import { BmMarkerDirective } from 'src/app/bingmaps/bm-marker.directive';
import { Coordinates } from 'src/app/bingmaps/coordinates';
import { ChangeDataComponent } from 'src/app/modals/change-data/change-data.component';
import { ChangePasswordComponent } from 'src/app/modals/change-password/change-password.component';
import { ChangeImageComponent } from 'src/app/modals/change-image/change-image.component';

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
  ],
})
export class ProfilePagePage {
  @Input() id?: number;
  user = signal<User | null>(null);
  coords = signal<Coordinates | null>(null);

  #profilesService = inject(ProfilesService);
  #modalCtrl = inject(ModalController);
  #toastCtrl = inject(ToastController);

  ionViewWillEnter() {
    if (this.id) {
      this.#profilesService.getProfile(this.id).subscribe((u) => {
        this.user.set(u);
        this.updateCoords(u.lat, u.lng);
      });
    } else {
      this.#profilesService.getMyProfile().subscribe((u) => {
        this.user.set(u);
        this.updateCoords(u.lat, u.lng);
      });
    }
  }

  updateCoords(lat: number, lng: number) {
    this.coords.set({
      latitude: lat,
      longitude: lng,
    });
  }

  async changeData() {
    const data: UserProfileEdit = {
      email: this.user()!.email,
      name: this.user()!.name,
    }

    const modal = await this.#modalCtrl.create({
      component: ChangeDataComponent,
      componentProps: { data: data },
    });
    await modal.present();
    const result = await modal.onDidDismiss();
    if (result.data && result.data.ok) {
      this.showToast('Los datos del usuario se han cambiado');
    }
  }

  async changePassword() {
    const pass: UserPasswordEdit = {
      password: this.user()!.password!,
    }

    const modal = await this.#modalCtrl.create({
      component: ChangePasswordComponent,
      componentProps: { password: pass },
    });
    await modal.present();
    const result = await modal.onDidDismiss();
    if (result.data && result.data.ok) {
      this.showToast('La contraseña se ha cambiado');
    }
  }

  async changeImage() {
    const photo: UserPhotoEdit = {
      photo: this.user()!.photo
    }

    const modal = await this.#modalCtrl.create({
      component: ChangeImageComponent,
      componentProps: { photo: photo },
    });
    await modal.present();
    const result = await modal.onDidDismiss();
    if (result.data && result.data.ok) {
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
