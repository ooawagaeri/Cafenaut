import { ReviewModel } from 'apps/backend/src/review/review.interface';
import axios from 'axios';

const base_url = '/api/';

export async function getCafes() {
  const res = await axios.get(base_url + 'cafe');
  return res.data;
}

export async function postReview(review: ReviewModel) {
  const res = await axios.post(base_url + 'review', review);
  return res;
}
