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
    // 30%, equal weightage for the rest of the common aspects
  };

  common_total_weightage = 0.3;

  all_aspects = [
    'coffee',
    'tea',
    'ambience',
    'price',
    'work_friendly',
    'cuisine',
    'speciality',
    'amenities',
    'pet',
  ];

  common_aspects = [
    'work_friendly',
    'cuisine',
    'speciality',
    'amenities',
    'pet',
  ];

  generate_review_rating(review: ReviewModel): Ratings {
    const result = {
      unweighted: 0,
      casual_coffee: 0,
      connoisseur_coffee: 0,
      casual_tea: 0,
      connoisseur_tea: 0,
    };

    this.user_types.forEach((type) => {
      let individualRating = 0;
      if (type == 'unweighted') {
        console.log('calculating for unweighted');
        let total = 0;
        let num_of_aspects = 0;
        this.all_aspects.forEach((aspect) => {
          console.log(aspect);
          console.log(review.aspects[aspect]);
          if (
            review.aspects[aspect].sub_rating !== 0 &&
            review.aspects[aspect].free_text !== ''
          ) {
            console.log(aspect);
            total += review.aspects[aspect].sub_rating;
            num_of_aspects += 1;
          }

          // Prevent NaN because / 0
          if (num_of_aspects !== 0) {
            individualRating = total / num_of_aspects;
          }
        });
      } else {
        individualRating =
          review.aspects.coffee.sub_rating * this.weightages[type].coffee +
          review.aspects.tea.sub_rating * this.weightages[type].tea +
          review.aspects.ambience.sub_rating * this.weightages[type].ambience +
          review.aspects.price.sub_rating * this.weightages[type].price;

        // For common aspects, we will only take into account aspects with given sub_rating + free_text
        let num_of_aspects = 0;
        this.common_aspects.forEach((aspect) => {
          if (
            review.aspects[aspect].sub_rating !== 0 &&
            review.aspects[aspect].free_text !== ''
          ) {
            num_of_aspects += 1;
          }
        });
        const common_aspect_weightage =
          this.common_total_weightage / num_of_aspects;
        this.common_aspects.forEach((aspect) => {
          if (
            review.aspects[aspect].sub_rating !== 0 &&
            review.aspects[aspect].free_text !== ''
          ) {
            individualRating +=
              review.aspects[aspect].sub_rating * common_aspect_weightage;
          }
        });
      }

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
