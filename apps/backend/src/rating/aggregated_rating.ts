import { ReviewModel } from "../review/review.interface";

enum UserClassification {
    NOT_CLASSIFIED = "none",
    CASUAL_COFFEE = "casual_coffee",
    CONNOISSEUR_COFFEE = "connoisseur_coffee",
    CASUAL_TEA = "casual_tea",
    CONNOISSEUR_TEA = "connoisseur_tea"
}

export class AggregatedRating {
    WEIGHTAGES = {
        none: {
            coffee: 0.1,
            tea: 0.1,
            ambience: 0.1,
            price: 0.1
        },
        casual_coffee: {
            coffee: 0.2,
            tea: 0.0,
            ambience: 0.1,
            price: 0.1
        },
        connoisseur_coffee: {
            coffee: 0.3,
            tea: 0.0,
            ambience: 0.1,
            price: 0.0
        },
        casual_tea: {
            coffee: 0.0,
            tea: 0.2,
            ambience: 0.1,
            price: 0.1 
        },
        connoisseur_tea: {
            coffee: 0.0,
            tea: 0.3,
            ambience: 0.1,
            price: 0.0
        },
        common: { // 30%, equal weightage
            work_friendly: 0.06,
            cuisine: 0.06,
            speciality: 0.06,
            amentities: 0.06,
            pet_friendliness: 0.06
        }
    }

    generate_rating(user_type: UserClassification, review: ReviewModel): number {
        // TODO
        return 0;
    }
}