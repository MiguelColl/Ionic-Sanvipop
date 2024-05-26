import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  IonRouterLink,
  ToastController,
  NavController,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonItemGroup,
  IonInput,
  IonIcon,
  IonImg,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonLabel,
  IonInputPasswordToggle,
} from '@ionic/angular/standalone';
import { UserRegister } from '../interfaces/auth';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AuthService } from '../services/auth.service';
import { ValueEqualsDirective } from 'src/app/validators/value-equals.directive';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    ValueEqualsDirective,
    IonRouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonItemGroup,
    IonInput,
    IonIcon,
    IonImg,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonLabel,
    IonInputPasswordToggle,
  ],
})
export class RegisterPage {
  #authService = inject(AuthService);
  #toastCtrl = inject(ToastController);
  #nav = inject(NavController);
  #fb = inject(NonNullableFormBuilder);

  registerForm = this.#fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    passwordConfirm: ['', [Validators.required, Validators.minLength(4)]],
    lat: '0',
    lng: '0',
  });

  imageBase64 = '';

  register() {
    const register: UserRegister = {
      name: this.registerForm.value.name!,
      email: this.registerForm.value.email!,
      password: this.registerForm.value.password!,
      photo: this.imageBase64,
      lat: +this.registerForm.value.lat!,
      lng: +this.registerForm.value.lng!,
    };

    this.#authService.register(register).subscribe(async () => {
      (
        await this.#toastCtrl.create({
          duration: 3000,
          position: 'bottom',
          message: 'User registered!',
          color: 'success',
        })
      ).present();
      this.#nav.navigateRoot(['/auth/login']);
    });
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
}
