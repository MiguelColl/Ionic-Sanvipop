import { Component, OnInit, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
import { ExternalLogin, UserLogin } from '../interfaces/auth';
import { Coordinates } from 'src/app/bingmaps/coordinates';
import { Geolocation } from '@capacitor/geolocation';
import { GoogleAuth, User } from '@codetrix-studio/capacitor-google-auth';
import {
  FacebookLogin,
  FacebookLoginResponse,
} from '@capacitor-community/facebook-login';

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
export class LoginPage implements OnInit {
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

  coords?: Coordinates;
  user!: User;

  async ngOnInit() {
    const coordinates = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
    });

    this.coords = coordinates.coords;
  }

  login() {
    const login: UserLogin = {
      ...this.loginForm.getRawValue(),
      lat: this.coords?.latitude
        ? this.coords.latitude
        : +this.loginForm.value.lat!,
      lng: this.coords?.longitude
        ? this.coords.longitude
        : +this.loginForm.value.lng!,
    };

    this.#authService.login(login).subscribe({
      next: () => this.#navCtrl.navigateRoot(['/products']),
      error: async (error) => {
        (
          await this.#alertCtrl.create({
            header: 'Login error',
            message: 'Email o contraseña incorrectos',
            buttons: ['Ok'],
          })
        ).present();
      },
    });
  }

  async googleLogin() {
    try {
      this.user = await GoogleAuth.signIn();
      console.log(this.user);

      const login: ExternalLogin = {
        token: this.user.authentication.idToken,
        lat: this.coords?.latitude
          ? this.coords.latitude
          : +this.loginForm.value.lat!,
        lng: this.coords?.longitude
          ? this.coords.longitude
          : +this.loginForm.value.lng!,
      };

      this.#authService.googleLogin(login).subscribe({
        next: () => this.#navCtrl.navigateRoot(['/products']),
        error: async (error) => {
          (
            await this.#alertCtrl.create({
              header: 'Google login error',
              message: 'No se pudo iniciar sesión',
              buttons: ['Ok'],
            })
          ).present();
        },
      });
    } catch (err) {
      console.error(err);
    }
  }

  async facebookLogin() {
    const resp = (await FacebookLogin.login({
      permissions: ['email'],
    })) as FacebookLoginResponse;
    if (resp.accessToken) {
      const login: ExternalLogin = {
        token: resp.accessToken.token,
        lat: this.coords?.latitude
          ? this.coords.latitude
          : +this.loginForm.value.lat!,
        lng: this.coords?.longitude
          ? this.coords.longitude
          : +this.loginForm.value.lng!,
      };
      console.log(resp.accessToken);

      this.#authService.facebookLogin(login).subscribe({
        next: () => this.#navCtrl.navigateRoot(['/products']),
        error: async (error) => {
          (
            await this.#alertCtrl.create({
              header: 'Facebook login error',
              message: 'No se pudo iniciar sesión',
              buttons: ['Ok'],
            })
          ).present();
        },
      });
    }
  }
}
