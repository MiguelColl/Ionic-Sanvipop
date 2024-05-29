import { Component, Input, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ModalController,
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
  IonInputPasswordToggle,
} from '@ionic/angular/standalone';
import { UserPasswordEdit } from 'src/app/profile/interfaces/user';
import { ProfilesService } from 'src/app/profile/services/profiles.service';
import { ValueEqualsDirective } from 'src/app/validators/value-equals.directive';

@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
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
    IonInputPasswordToggle,
    ReactiveFormsModule,
    ValueEqualsDirective,
  ],
})
export class ChangePasswordComponent {
  #modalCtrl = inject(ModalController);
  #fb = inject(NonNullableFormBuilder);
  #profilesService = inject(ProfilesService);

  passwordForm = this.#fb.group({
    password: ['', [Validators.required, Validators.minLength(4)]],
    passwordConfirm: ['', [Validators.required, Validators.minLength(4)]],
  });

  changePassword() {
    const password: UserPasswordEdit = {
      password: this.passwordForm.controls.password.value,
    };

    this.#profilesService
      .updatePassword(password)
      .subscribe(() => this.#modalCtrl.dismiss({ ok: true }));
  }

  close() {
    this.#modalCtrl.dismiss();
  }
}
