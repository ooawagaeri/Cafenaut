import { CafeModel, CafePinModel } from 'apps/backend/src/cafe/cafe.interface';
import { ReviewModel } from 'apps/backend/src/review/review.interface';
import { Location } from 'apps/backend/src/middle-ground/location.interface';
import axios from 'axios';

const base_url = '/api/';

export async function getAllCafes() {
  const res = await axios.get(base_url + 'cafe');
  return res.data;
}

export async function getCafeDetail(cafe_id: string): Promise<CafeModel> {
  const res = await axios.get(base_url + 'cafe/' + cafe_id);
  return res.data as CafeModel;
}

export async function getCafeReviews(cafe_id: string) {
  let reviews = await getAllReviews();
  reviews = reviews.filter((review: ReviewModel) => review.cafe_id === cafe_id);
  return reviews;
}

export async function getUserReviews(uid: string) {
  let reviews = await getAllReviews();
  reviews = reviews.filter((review: ReviewModel) => review.user_uid === uid);
  return reviews;
}

export async function postReview(review: ReviewModel) {
  return await axios.post(base_url + 'review', review);
}

export async function getAllReviews() {
  const res = await axios.get(base_url + 'review');
  const reviews = res.data;
  // Map string to Date format in order to use the Date methods
  reviews.map((review: any) => {
    review.created_at = new Date(review.created_at);
  });
  return reviews;
}

export async function getAllUsers() {
  const res = await axios.get(base_url + 'user/all');
  return res.data;
}

export async function getUserDetail(user_uid: string) {
  const res = await axios.get(base_url + 'user/' + user_uid);
  return res.data;
}

export async function getAllCafesPins() {
  const res = await axios.get(base_url + 'cafe/pins');
  return res.data;
}

export async function getMiddleGround(locations: Location[]): Promise<{ cafes: CafePinModel[], midpoint: Location, radius: number }> {
  const res = await axios.get(base_url + 'mid', {
    params: {
      locations,
    }
  });
  return res.data;
}
