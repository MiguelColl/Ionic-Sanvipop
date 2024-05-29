import { Component, Input, inject } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import {
  ModalController,
  ToastController,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
} from '@ionic/angular/standalone';
import { UserPhotoEdit } from 'src/app/profile/interfaces/user';
import { ProfilesService } from 'src/app/profile/services/profiles.service';

@Component({
  selector: 'change-image',
  templateUrl: './change-image.component.html',
  styleUrls: ['./change-image.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonGrid,
    IonRow,
    IonCol,
    IonImg,
  ],
})
export class ChangeImageComponent {
  @Input() avatar!: UserPhotoEdit;

  #modalCtrl = inject(ModalController);
  #toastCtrl = inject(ToastController);
  #profilesService = inject(ProfilesService);

  imageBase64 = '';

  ionViewWillEnter() {
    this.imageBase64 = this.avatar.photo;
  }

  async takePhoto() {
    const photo = await Camera.getPhoto({
      source: CameraSource.Camera,
      quality: 90,
      height: 200,
      width: 200,
      allowEditing: true,
      resultType: CameraResultType.DataUrl, // Base64 (url encoded)
    });

    this.imageBase64 = photo.dataUrl as string;
  }

  async pickFromGallery() {
    const photo = await Camera.getPhoto({
      source: CameraSource.Photos,
      height: 200,
      width: 200,
      allowEditing: true,
      resultType: CameraResultType.DataUrl, // Base64 (url encoded)
    });

    this.imageBase64 = photo.dataUrl as string;
  }

  changeImage() {
    const avatar: UserPhotoEdit = {
      photo: this.imageBase64,
    };

    this.#profilesService.updatePhoto(avatar).subscribe({
      next: (img) => this.#modalCtrl.dismiss({ ok: true, avatar: img.photo }),
      error: async () =>
        (
          await this.#toastCtrl.create({
            message: 'La foto elegida es demasiado grande',
            duration: 3000,
            position: 'bottom',
            color: 'danger',
          })
        ).present(),
    });
  }

  close() {
    this.#modalCtrl.dismiss();
  }
}
