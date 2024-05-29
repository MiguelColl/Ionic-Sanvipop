import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Rating, RatingInsert, RatingResponse } from './interfaces/rating';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RatingsService {
  #ratingUrl = 'ratings';
  #http = inject(HttpClient);

  postRating(rating: RatingInsert): Observable<void> {
    return this.#http.post<void>(`${this.#ratingUrl}`, rating);
  }

  getMyRatings(): Observable<Rating[]> {
    return this.#http
      .get<RatingResponse>(`${this.#ratingUrl}/user/me`)
      .pipe(map((resp) => resp.ratings));
  }

  getRatings(id: number): Observable<Rating[]> {
    return this.#http
      .get<RatingResponse>(`${this.#ratingUrl}/user/${id}`)
      .pipe(map((resp) => resp.ratings));
  }
}
