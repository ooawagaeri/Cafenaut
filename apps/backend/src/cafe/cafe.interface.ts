import { Ratings } from '../rating/rating.interface';
import { Location } from '../middle-ground/location.interface';

export interface CafeModel {
  name: string;
  logo: string;
  id: string;
  location: Location;
  rating: Ratings;
}

export interface CafePinModel {
  name: string;
  logo: string;
  id: string;
  location: Location;
  rating: Ratings;
  authenticity: number;
  popularity: number;
}
