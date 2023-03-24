import { CafeModel } from 'apps/backend/src/cafe/cafe.interface';
import { ReviewModel } from 'apps/backend/src/review/review.interface';
import axios from 'axios';

const base_url = '/api/';

export async function getCafes() {
  const res = await axios.get(base_url + 'cafe');
  return res.data;
}

export async function getCafeDetail(cafe_id: string): Promise<CafeModel> {
  const res = await axios.get(base_url + 'cafe/' + cafe_id);
  return res.data as CafeModel;
}

export async function postReview(review: ReviewModel) {
  const res = await axios.post(base_url + 'review', review);
  return res;
}

export async function getAllReviews() {
  const res = await axios.get(base_url + 'review');
  return res.data;
}

export async function getAllUsers() {
  const res = await axios.get(base_url + 'user/all');
  return res.data;
}

export async function getUserDetail(user_uid: string) {
  const res = await axios.get(base_url + 'user', {
    params: { user: { uid: user_uid } },
  });
  return res.data;
}
