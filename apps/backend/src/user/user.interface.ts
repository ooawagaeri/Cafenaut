import { Classification } from "../classifier/classification.interface";

export interface User {
  uid: string;
  email: string;
  name: string;
  following: string[];
  followers: string[];
  classification: Classification;
}
