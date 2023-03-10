export interface ReviewModel {
  title: string;
  body: string;
  user_uid: string;
  aspects: Aspects;
  rating: Ratings;
  rid: string; // restaurant ID
  sentiment?: number;
}

export interface Ratings {
  unweighted: number;
  casual_coffee: number;
  connoisseur_coffee: number;
  casual_tea: number;
  connoisseur_tea: number;
}

interface Aspect {
  sub_rating: number;
  free_text: string;
}

interface Aspects {
  coffee: Coffee;
  tea: Tea;
  ambience: Ambience;
  price: Price;
  work_friendly: WorkFriendly;
  cuisine: Cuisine;
  speciality: Speciality;
  amenities: Amenities;
  pet: Pet;
}

interface Coffee extends Aspect {
  beans: CoffeeBeans;
  milk: Milk;
  non_caffeinated: boolean;
}

interface CoffeeBeans {
  arabica: boolean;
  robusta: boolean;
  excelsa: boolean;
  liberica: boolean;
}

interface Tea extends Aspect {
  tea_leaves: TeaLeaves;
  milk: Milk;
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

interface Ambience extends Aspect {
  lighting: string;
  alfresco: boolean;
  vibe: string;
}

interface Price extends Aspect {
  student: boolean;
  elderly: boolean;
  avg_price: number;
}

interface WorkFriendly extends Aspect {
  charging_ports: boolean;
  wifi: boolean;
}

interface Cuisine extends Aspect {
  serve_food: boolean;
}

interface Speciality extends Aspect {
  present: boolean;
}

interface Amenities extends Aspect {
  type: string;
}

interface Pet extends Aspect {
  friendly: boolean;
}