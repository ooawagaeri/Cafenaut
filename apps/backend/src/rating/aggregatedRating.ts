import { ReviewModel } from '../review/review.interface';
import { Ratings } from './rating.interface';

export class AggregatedRating {
  review: ReviewModel;
  ratings: Ratings;

  user_types = [
    'unweighted',
    'casual_coffee',
    'connoisseur_coffee',
    'casual_tea',
    'connoisseur_tea',
  ];

  weightages = {
    // 70%, weightage differing among user_types
    unweighted: {
      coffee: 0.175,
      tea: 0.175,
      ambience: 0.175,
      price: 0.175,
    },
    casual_coffee: {
      coffee: 0.4,
      tea: 0.01,
      ambience: 0.19,
      price: 0.1,
    },
    connoisseur_coffee: {
      coffee: 0.6,
      tea: 0.01,
      ambience: 0.08,
      price: 0.01,
    },
    casual_tea: {
      coffee: 0.01,
      tea: 0.4,
      ambience: 0.19,
      price: 0.1,
    },
    connoisseur_tea: {
      coffee: 0.01,
      tea: 0.6,
      ambience: 0.08,
      price: 0.01,
    },
    // 30%, equal weightage
    common: {
      work_friendly: 0.06,
      cuisine: 0.06,
      speciality: 0.06,
      amenities: 0.06,
      pet: 0.06,
    },
  };

  generate_review_rating(review: ReviewModel): Ratings {
    const result = {
      unweighted: 0,
      casual_coffee: 0,
      connoisseur_coffee: 0,
      casual_tea: 0,
      connoisseur_tea: 0,
    };

    this.user_types.forEach((type) => {
      const individualRating =
        review.aspects.coffee.sub_rating * this.weightages[type].coffee +
        review.aspects.tea.sub_rating * this.weightages[type].tea +
        review.aspects.ambience.sub_rating * this.weightages[type].ambience +
        review.aspects.price.sub_rating * this.weightages[type].price +
        review.aspects.work_friendly.sub_rating *
          this.weightages['common'].work_friendly +
        review.aspects.cuisine.sub_rating * this.weightages['common'].cuisine +
        review.aspects.speciality.sub_rating *
          this.weightages['common'].speciality +
        review.aspects.amenities.sub_rating *
          this.weightages['common'].amenities +
        review.aspects.pet.sub_rating * this.weightages['common'].pet;
      result[type] = Math.round(individualRating * 100) / 100;
    });

    return result;
  }

  generate_cafe_rating(reviews_from_cafe: Ratings[]): Ratings {
    const result = {
      unweighted: 0,
      casual_coffee: 0,
      connoisseur_coffee: 0,
      casual_tea: 0,
      connoisseur_tea: 0,
    };

    const num_of_reviews = reviews_from_cafe.length;

    // Sum all of the ratings
    reviews_from_cafe.forEach((rating) => {
      this.user_types.forEach((type) => {
        result[type] += rating[type];
      });
    });

    // Get avg
    this.user_types.forEach((type) => {
      result[type] = Math.round((result[type] / num_of_reviews) * 100) / 100;
    });

    return result;
  }
}
