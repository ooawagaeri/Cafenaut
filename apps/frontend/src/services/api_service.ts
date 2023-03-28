// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CafeModel } from 'apps/backend/src/cafe/cafe.interface';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ReviewModel } from 'apps/backend/src/review/review.interface';
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

export async function postReview(review: ReviewModel) {
  return await axios.post(base_url + 'review', review);
}

export async function getAllReviews() {
  const res = await axios.get(base_url + 'review');

  const reviews = res.data;
  reviews.map((review: any) => {
    review.created_at = new Date(review.created_at)
  })
  return sortReviewsByDate(reviews);
}

function sortReviewsByDate(reviews: []) {
  // If you are wondering why is there a '+' before new
  // https://stackoverflow.com/questions/40248643/typescript-sort-by-date-not-working
  return reviews.sort((review_a: ReviewModel, review_b: ReviewModel) => {
    return +new Date(review_b.created_at) - +new Date(review_a.created_at);
  });
}

export async function getAllUsers() {
  const res = await axios.get(base_url + 'user/all');
  return res.data;
}

export async function getUserDetail(user_uid: string) {
  const res = await axios.get(base_url + 'user', {
    params: {user: {uid: user_uid}},
  });
  return res.data;
}

export async function getAllCafesPins() {
  const res = await axios.get(base_url + 'cafe/pins');
  return res.data;
}
