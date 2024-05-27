import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastController, NavController, IonRouterLink, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonList, IonItem, IonIcon, IonButton, IonImg, IonGrid, IonRow, IonCol, IonInput, IonLabel, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { ProductsService } from '../services/products.service';
import { ProductInsert } from '../interfaces/product';
import { RouterLink } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Category } from '../interfaces/category';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.page.html',
  styleUrls: ['./product-form.page.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, IonRouterLink, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonList, IonItem, IonIcon, IonButton, IonImg, IonGrid, IonRow, IonCol, IonInput, IonLabel, IonSelect, IonSelectOption]
})
export class ProductFormPage {
  #productsService = inject(ProductsService);
  #categoriesService = inject(CategoriesService)
  #toastCtrl = inject(ToastController);
  #nav = inject(NavController)
  #fb = inject(NonNullableFormBuilder);

  productForm = this.#fb.group({
    title: ['', [Validators.required, Validators.minLength(5)]],
    description: ['', [Validators.required]],
    category: ['', [Validators.required]],
    price: ['', [Validators.required, Validators.min(0.01)]],
  });

  categories: Category[] = []
  imageBase64 = ''

  ionViewWillEnter() {
    this.#categoriesService
      .getCategories()
      .subscribe((cat) => (this.categories = cat));
  }

  addProduct() {
    const product: ProductInsert = {
      ...this.productForm.getRawValue(),
      price: +this.productForm.value.price!,
      category: +this.productForm.value.category!,
      mainPhoto: this.imageBase64,
    };

    this.#productsService.addProduct(product).subscribe(
      async prod => {
        (await this.#toastCtrl.create({
          position: 'bottom',
          duration: 3000,
          message: '¡Producto añadido correctamente!',
          color: 'success'
        })).present();
        this.#nav.navigateRoot(['/products']);
      },
      async error => (await this.#toastCtrl.create({
        position: 'bottom',
        duration: 3000,
        message: 'Error añadiendo el producto'
      })).present()
    );
  }

  async takePhoto() {;
    const photo = await Camera.getPhoto({
      source: CameraSource.Camera,
      quality: 90,
      height: 1024,
      width: 1024,
      allowEditing: true,
      resultType: CameraResultType.DataUrl // Base64 (url encoded)
    });

    this.imageBase64 = photo.dataUrl as string;
  }

  async pickFromGallery() {
    const photo = await Camera.getPhoto({
      source: CameraSource.Photos,
      height: 1024,
      width: 1024,
      allowEditing: true,
      resultType: CameraResultType.DataUrl // Base64 (url encoded)
    });

    this.imageBase64 = photo.dataUrl as string;
  }
}