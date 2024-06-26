import { Component, Input, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
  IonInput,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/angular/standalone';
import { UserProfileEdit } from 'src/app/profile/interfaces/user';
import { ProfilesService } from 'src/app/profile/services/profiles.service';

@Component({
  selector: 'change-data',
  templateUrl: './change-data.component.html',
  styleUrls: ['./change-data.component.scss'],
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
    IonInput,
    IonLabel,
    IonGrid,
    IonRow,
    IonCol,
    ReactiveFormsModule,
  ],
})
export class ChangeDataComponent {
  @Input() data!: UserProfileEdit;

  #modalCtrl = inject(ModalController);
  #toastCtrl = inject(ToastController);
  #fb = inject(NonNullableFormBuilder);
  #profilesService = inject(ProfilesService);

  profileForm = this.#fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
  });

  ionViewWillEnter() {
    this.profileForm.controls.name.setValue(this.data.name);
    this.profileForm.controls.email.setValue(this.data.email);
    this.profileForm.markAsPristine();
  }

  changeProfile() {
    const profile: UserProfileEdit = {
      ...this.profileForm.getRawValue(),
    };

    this.#profilesService.updateProfile(profile).subscribe({
      next: () => this.#modalCtrl.dismiss({ ok: true, profile: profile }),
      error: async () => 
        (
          await this.#toastCtrl.create({
            message: 'Ese correo ya existe',
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
