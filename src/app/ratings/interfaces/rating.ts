import { User } from "../../profile/interfaces/user";
import { Product } from "../../products/interfaces/product";

export interface RatingInsert {
    rating: number;
    comment: string;
    product: number;
}

export interface Rating extends Omit<RatingInsert, "product"> {
    product: Product;
    user: User; 
}

export interface RatingInfo {
    sellerRating: number;
    buyerRating: number;
    sellerComment: string;
    buyerComment: string;
    dateTransaction: string;
}