import {
  filterPerCategoryByFollowers,
  filterPerCountryByFollowers,
  User,
} from "../models/types";

export const topInfluencerPerCategoryByFollowers = (
  users: User[]
): filterPerCategoryByFollowers[] => {
  const influenceerPerCategoryByFollowers: filterPerCategoryByFollowers[] = [];

  const categories: string[] = getCategories(users);

  for (let category of categories) {
    let max = 0;
    let maxUser = users[0];
    for (let user of users) {
      if (
        (user.category1 === category || user.category2 === category) &&
        user.followers > max
      ) {
        maxUser = user;
        max = user.followers;
      }
    }
    influenceerPerCategoryByFollowers.push({ category, user: maxUser as User });
  }
  return influenceerPerCategoryByFollowers;
};

const getCategories = (users: User[]): string[] => {
  const merged = users
    .map((user) => user.category1)
    .concat(users.map((user) => user.category2));
  const uniqueCategories = Array.from(new Set(merged));

  return uniqueCategories;
};

export const topInfluencerPerCountryByEngagementAvg = (
  users: User[]
): filterPerCountryByFollowers[] => {
  const influencerPerCountryByEngagementAvg: filterPerCountryByFollowers[] = [];

  const countries: string[] = getCountries(users);

  for (let country of countries) {
    let max = 0;
    let maxUser = users[0];
    for (let user of users) {
      if (user.audienceCountry === country && user.engagementAvg > max) {
        maxUser = user;
        max = user.engagementAvg;
      }
    }
    influencerPerCountryByEngagementAvg.push({
      country,
      user: maxUser as User,
    });
  }
  return influencerPerCountryByEngagementAvg;
};

const getCountries = (users: User[]): string[] => {
  const merged = users.map((user) => user.audienceCountry);
  const uniqueCountries = Array.from(new Set(merged));

  return uniqueCountries;
};
