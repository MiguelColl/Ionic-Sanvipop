import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  Platform,
  IonApp,
  IonSplitPane,
  IonMenu,
  IonContent,
  IonList,
  IonListHeader,
  IonNote,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonAvatar,
  IonImg,
  IonRouterLink,
  NavController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  home,
  logIn,
  documentText,
  checkmarkCircle,
  images,
  camera,
  arrowUndoCircle,
  add,
  menu,
  trash,
  eye,
  close,
  exit,
  informationCircle,
  mapSharp,
  navigateOutline,
  logoGoogle,
  logoFacebook,
  eyeOutline,
  pinOutline,
  heart,
  heartOutline,
  cashOutline,
  person,
  image,
  lockOpen,
  create,
  starHalfOutline,
  star,
  starOutline,
} from 'ionicons/icons';
import { AuthService } from './auth/services/auth.service';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { User } from './profile/interfaces/user';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { ProfilesService } from './profile/services/profiles.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    IonRouterLink,
    CommonModule,
    IonApp,
    IonSplitPane,
    IonMenu,
    IonContent,
    IonList,
    IonListHeader,
    IonNote,
    IonMenuToggle,
    IonItem,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonAvatar,
    IonImg,
  ],
})
export class AppComponent {
  user: User | null = null;

  #authService = inject(AuthService);
  #profilesService = inject(ProfilesService);
  #platform = inject(Platform);
  #nav = inject(NavController);

  public appPages = [
    { title: 'Home', url: '/products', icon: 'home' },
    { title: 'Añadir producto', url: '/products/add', icon: 'add' },
    { title: 'Perfil', url: '/profile', icon: 'person' },
  ];

  constructor() {
    addIcons({
      home,
      logIn,
      documentText,
      checkmarkCircle,
      images,
      camera,
      arrowUndoCircle,
      add,
      menu,
      trash,
      eye,
      close,
      exit,
      informationCircle,
      mapSharp,
      navigateOutline,
      logoGoogle,
      logoFacebook,
      eyeOutline,
      pinOutline,
      create,
      heart,
      heartOutline,
      cashOutline,
      person,
      image,
      lockOpen,
      starHalfOutline,
      star,
      starOutline,
    });

    effect(() => {
      if (this.#authService.logged()) {
        this.#profilesService
          .getMyProfile()
          .subscribe((user) => (this.user = user));
      } else {
        this.user = null;
      }
    });

    this.initializeApp();
  }

  async initializeApp() {
    if (this.#platform.is('capacitor')) {
      await this.#platform.ready();
      SplashScreen.hide();
      StatusBar.setBackgroundColor({ color: '#3880ff' });
      StatusBar.setStyle({ style: Style.Dark });
      GoogleAuth.initialize();
    }
  }

  async logout() {
    await this.#authService.logout();
    this.#nav.navigateRoot(['/auth/login']);
  }
}
