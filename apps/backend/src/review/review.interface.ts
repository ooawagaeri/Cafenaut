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
    non_caffeinated: Boolean;
    sub_rating: number;
    free_text: string;
}

interface CoffeeBeans {
    arabica: Boolean;
    robusta: Boolean;
    excelsa: Boolean;
    liberica: Boolean;
}

interface Tea {
    tea_leaves: TeaLeaves;
    milk: Milk;
    sub_rating: number;
    free_text: string;
}

interface Milk {
    low_fat: Boolean;
    oat: Boolean;
    soy: Boolean;
    almond: Boolean;
}

interface TeaLeaves {
    black: Boolean;
    white: Boolean;
    green: Boolean;
    oolong: Boolean;
    pu_erh: Boolean;
}

interface Ambience {
    lighting: string;
    alfresco: Boolean;
    vibe: string;
    sub_rating: number;
    free_text: string;
}

interface Pricing {
    student: Boolean;
    elderly: Boolean;
    avg_price: number;
    sub_rating: number;
    free_text: string;
}

interface WorkFriendly {
    charging_ports: Boolean;
    wifi: Boolean;
    sub_rating: number;
    free_text: string;
}

interface Cuisine {
    serve_food: Boolean
    sub_rating: number;
    free_text: string;
}

interface Speciality {
    present: Boolean;
    sub_rating: number;
    free_text: string;
}

interface Amenities {
    sub_rating: number;
    free_text: string;
}

interface Pet {
    friendly: Boolean;
    sub_rating: number;
    free_text: string;
}