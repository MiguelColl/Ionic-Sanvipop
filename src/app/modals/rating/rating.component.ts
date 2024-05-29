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
  IonSelectOption,
  IonTextarea,
  IonSelect,
} from '@ionic/angular/standalone';
import { RatingInsert } from 'src/app/ratings/interfaces/rating';
import { RatingsService } from 'src/app/ratings/ratings.service';

@Component({
  selector: 'rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
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
    IonSelectOption,
    IonTextarea,
    IonSelect,
  ],
})
export class RatingComponent {
  @Input() id!: number;
  @Input() name!: string;

  #modalCtrl = inject(ModalController);
  #toastCtrl = inject(ToastController);
  #ratingsService = inject(RatingsService);
  #fb = inject(NonNullableFormBuilder);
  numbers = [1, 2, 3, 4, 5];

  ratingForm = this.#fb.group({
    rate: ['', [Validators.required]],
    comment: ['', [Validators.required]],
  });

  ionViewWillEnter() {}

  addRating() {
    const ratingInsert: RatingInsert = {
      rating: +this.ratingForm.controls.rate.value,
      comment: this.ratingForm.controls.comment.value,
      product: this.id,
    };

    this.#ratingsService.postRating(ratingInsert).subscribe({
      next: () => this.#modalCtrl.dismiss({ rating: ratingInsert }),
      error: async () =>
        (
          await this.#toastCtrl.create({
            message: 'Error insertando rating',
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
