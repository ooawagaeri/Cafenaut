import { Ratings } from "../rating/rating.interface";

export interface CafeModel {
    name: string;
    logo: string; // Use Firebase Storage to store
    location: string; // Geohash, https://firebase.google.com/docs/firestore/solutions/geoqueries
    rating: Ratings;
    total_reviews: number;
}