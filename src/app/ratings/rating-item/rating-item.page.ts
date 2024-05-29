import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonAvatar,
  IonImg,
  IonLabel,
  IonIcon,
  IonItem,
  IonRouterLink,
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { Rating } from '../interfaces/rating';

@Component({
  selector: 'rating-item',
  templateUrl: './rating-item.page.html',
  styleUrls: ['./rating-item.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonCard,
    IonCardContent,
    IonAvatar,
    IonImg,
    IonLabel,
    IonIcon,
    IonItem,
    IonRouterLink,
    RouterLink,
  ],
})
export class RatingItemPage {
  @Input() rating!: Rating;
}
