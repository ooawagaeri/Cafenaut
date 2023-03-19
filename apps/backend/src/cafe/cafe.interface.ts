import { Ratings } from '../rating/rating.interface';

export interface CafeModel {
  name: string;
  logo: string;
  id: string;
  location: {
    latitude: number;
    longitude: number;
  };
  rating: Ratings;
}
