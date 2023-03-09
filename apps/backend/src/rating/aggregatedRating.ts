import { Ratings, ReviewModel } from '../review/review.interface';

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
      tea: 0.0,
      ambience: 0.2,
      price: 0.1,
    },
    connoisseur_coffee: {
      coffee: 0.6,
      tea: 0.0,
      ambience: 0.1,
      price: 0.0,
    },
    casual_tea: {
      coffee: 0.0,
      tea: 0.4,
      ambience: 0.2,
      price: 0.1,
    },
    connoisseur_tea: {
      coffee: 0.0,
      tea: 0.6,
      ambience: 0.1,
      price: 0.0,
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

  constructor(review: ReviewModel) {
    this.review = review;
    this.generate_rating();
  }

  generate_rating(): void {
    const result = {
      unweighted: 0,
      casual_coffee: 0,
      connoisseur_coffee: 0,
      casual_tea: 0,
      connoisseur_tea: 0,
    };

    this.user_types.forEach((type) => {
      result[type] =
        this.review.aspects.coffee.sub_rating * this.weightages[type].coffee +
        this.review.aspects.tea.sub_rating * this.weightages[type].tea +
        this.review.aspects.ambience.sub_rating * this.weightages[type].ambience +
        this.review.aspects.price.sub_rating * this.weightages[type].price +
        this.review.aspects.work_friendly.sub_rating *
          this.weightages['common'].work_friendly +
        this.review.aspects.cuisine.sub_rating * this.weightages['common'].cuisine +
        this.review.aspects.speciality.sub_rating *
          this.weightages['common'].speciality +
        this.review.aspects.amenities.sub_rating *
          this.weightages['common'].amenities +
        this.review.aspects.pet.sub_rating * this.weightages['common'].pet;
    });
    this.ratings = result;
  }

  get_aggreagated_ratings(): Ratings {
    return this.ratings;
  }
}
