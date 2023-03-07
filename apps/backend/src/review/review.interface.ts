export interface ReviewModel {
  title: string;
  body: string;
  user_uid: string;
  aspects: Aspects;
  rating: number;
  rid: string; // restaurant ID
}

interface Aspects {
    coffee: Coffee;
    tea: Tea;
    ambience: Ambience;
    price: Pricing;
    work_friendly: WorkFriendly;
    cuisine: Cuisine;
    speciality: Speciality;
    amentities: Amenities;
    pet_friendliness: Pet;
}

interface Coffee {
    beans: CoffeeBeans;
    milk: Milk;
    non_caffeinated: boolean;
    sub_rating: number;
    free_text: string;
}

interface CoffeeBeans {
    arabica: boolean;
    robusta: boolean;
    excelsa: boolean;
    liberica: boolean;
}

interface Tea {
    tea_leaves: TeaLeaves;
    milk: Milk;
    sub_rating: number;
    free_text: string;
}

interface Milk {
    low_fat: boolean;
    oat: boolean;
    soy: boolean;
    almond: boolean;
}

interface TeaLeaves {
    black: boolean;
    white: boolean;
    green: boolean;
    oolong: boolean;
    pu_erh: boolean;
}

interface Ambience {
    lighting: string;
    alfresco: boolean;
    vibe: string;
    sub_rating: number;
    free_text: string;
}

interface Pricing {
    student: boolean;
    elderly: boolean;
    avg_price: number;
    sub_rating: number;
    free_text: string;
}

interface WorkFriendly {
    charging_ports: boolean;
    wifi: boolean;
    sub_rating: number;
    free_text: string;
}

interface Cuisine {
    serve_food: boolean
    sub_rating: number;
    free_text: string;
}

interface Speciality {
    present: boolean;
    sub_rating: number;
    free_text: string;
}

interface Amenities {
    sub_rating: number;
    free_text: string;
}

interface Pet {
    friendly: boolean;
    sub_rating: number;
    free_text: string;
}
