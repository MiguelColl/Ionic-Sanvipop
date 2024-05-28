import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product, ProductInsert, ProductUpdate } from '../interfaces/product';
import { Observable, map } from 'rxjs';
import {
  ProductsResponse,
  SingleProductResponse,
} from '../interfaces/responses';
import { PhotoInsert } from '../interfaces/photo';
import { ProductsURL } from '../interfaces/urls';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  #productsUrl = 'products';
  #http = inject(HttpClient);

  getProducts(prodURL: ProductsURL = ProductsURL.ALL): Observable<Product[]> {
    return this.#http
      .get<ProductsResponse>(this.#productsUrl + prodURL)
      .pipe(map((resp) => resp.products));
  }

  getProduct(id: number): Observable<Product> {
    return this.#http
      .get<SingleProductResponse>(`${this.#productsUrl}/${id}`)
      .pipe(map((resp) => resp.product));
  }

  addProduct(product: ProductInsert): Observable<Product> {
    return this.#http
      .post<SingleProductResponse>(this.#productsUrl, product)
      .pipe(map((resp) => resp.product));
  }

  deleteProduct(id: number): Observable<void> {
    return this.#http.delete<void>(`${this.#productsUrl}/${id}`);
  }

  addFavorite(productId: number): Observable<void> {
    return this.#http.post<void>(
      `${this.#productsUrl}/${productId}/bookmarks`,
      {}
    );
  }

  deleteFavorite(productId: number): Observable<void> {
    return this.#http.delete<void>(
      `${this.#productsUrl}/${productId}/bookmarks`
    );
  }

  buyProduct(productId: number): Observable<void> {
    return this.#http.put<void>(`${this.#productsUrl}/${productId}/buy`, {});
  }

  updateMainPhoto(productId: number, photoId: number): Observable<void> {
    return this.#http.put<void>(`${this.#productsUrl}/${productId}`, {
      mainPhoto: photoId,
    });
  }

  addPhoto(productId: number, photo: PhotoInsert): Observable<void> {
    return this.#http.post<void>(
      `${this.#productsUrl}/${productId}/photos`,
      photo
    );
  }

  deletePhoto(productId: number, photoId: number): Observable<void> {
    return this.#http.delete<void>(
      `${this.#productsUrl}/${productId}/photos/${photoId}`
    );
  }

  updateProduct(productId: number, product: ProductUpdate): Observable<void> {
    return this.#http.put<void>(`${this.#productsUrl}/${productId}`, product);
  }
}
