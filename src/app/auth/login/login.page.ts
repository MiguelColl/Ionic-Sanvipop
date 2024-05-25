import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
    FormsModule,
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
  ],
})
export class LoginPage {
  user: UserLogin = {
    email: '',
    password: '',
    lat: 0,
    lng: 0,
  };

  #authService = inject(AuthService);
  #alertCtrl = inject(AlertController);
  #navCtrl = inject(NavController);

  login() {
    this.#authService.login(this.user).subscribe({
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
