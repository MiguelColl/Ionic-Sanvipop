import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  AlertController,
  NavController,
  IonRouterLink,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonInputPasswordToggle,
} from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service';
import { RouterLink } from '@angular/router';
import { UserLogin } from '../interfaces/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    IonRouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonIcon,
    IonInputPasswordToggle,
  ],
})
export class LoginPage {
  #authService = inject(AuthService);
  #alertCtrl = inject(AlertController);
  #navCtrl = inject(NavController);
  #fb = inject(NonNullableFormBuilder);

  loginForm = this.#fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    lat: '0',
    lng: '0',
  });

  login() {
    const login: UserLogin = {
      ...this.loginForm.getRawValue(),
      lat: +this.loginForm.value.lat!,
      lng: +this.loginForm.value.lng!,
    };

    this.#authService.login(login).subscribe({
      next: () => this.#navCtrl.navigateRoot(['/products']),
      error: async (error) => {
        (
          await this.#alertCtrl.create({
            header: 'Login error',
            message: 'Incorrect email and/or password',
            buttons: ['Ok'],
          })
        ).present();
      },
    });
  }
}
