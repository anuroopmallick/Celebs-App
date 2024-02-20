// To parse this data:
//
//   import { Convert } from "./file";
//
//   const celebs = Convert.toCelebs(json);

export interface Celebs {
  id: number;
  first: string;
  last: string;
  dob: string;
  gender: string;
  email: string;
  picture: string;
  country: string;
  description: string;
}

// export enum Gender {
//   Female = "female",
//   Male = "male",
// }

// Converts JSON strings to/from your types
export class Convert {
  public static toCelebs(json: string): Celebs[] {
    return JSON.parse(json);
  }

  public static celebsToJson(value: Celebs[]): string {
    return JSON.stringify(value);
  }
}
