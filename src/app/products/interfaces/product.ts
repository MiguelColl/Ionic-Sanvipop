import { User } from "../../profile/interfaces/user";
import { Category } from "./category";
import { Photo } from "./photo";
import { RatingInfo } from "../../ratings/interfaces/rating";

type Status = 1 | 2 | 3;

export interface ProductInsert {
    title: string;
    description: string;
    category: number;
    price: number;
    mainPhoto: string;
}

export interface ProductUpdate extends Omit<ProductInsert, "mainPhoto"> {}

export interface Product extends Omit<ProductInsert, "category"> {
    id: number;
    category: Category;
    datePublished: string;
    status: Status;
    numVisits: number;
    owner: User;
    soldTo?: User;
    rating: RatingInfo;
    photos?: Photo[];
    distance: number; 
    mine: boolean;
    bookmarked: boolean;
}
