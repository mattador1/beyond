import { mappingFields } from "./user";

export type UserRawValues = {
  [K in keyof typeof mappingFields]: string;
};
export interface User {
  instaUser: string;
  instaName: string;
  category1: string;
  category2: string;
  followers: number;
  audienceCountry: string;
  engagement: number;
  engagementAvg: number;
}

export interface GetUserResponse {
  users: User[] | null;
}

export interface ErrorMessage {
  data: undefined;
  error: string;
}

export interface Success<Data extends Record<string, any>> {
  data: Data;
  error: undefined;
}

export type GetResponse<Data extends Record<string, any>> =
  | Success<Data>
  | ErrorMessage;
