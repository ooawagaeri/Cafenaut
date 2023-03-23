import { Ratings } from '../rating/rating.interface';
import { Location } from '../middle-ground/location.interface';

export interface CafeModel {
  name: string;
  logo: string;
  location: Location;
  rating: Ratings;
}
