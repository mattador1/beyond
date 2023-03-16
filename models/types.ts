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
