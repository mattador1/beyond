import { User, UserRawValues } from "./types";

export const mappingFields = {
  instaUser: "Influencer insta name",
  instaName: "instagram name",
  category1: "category_1",
  category2: "category_2",
  followers: "Followers",
  audienceCountry: "Audience country(mostly)",
  engagement: "Authentic engagement\r\n",
  engagementAvg: "Engagement avg\r\n",
};

const isValidRawUser = (rawUser: Record<string, string>): boolean => {
  const inputUserKeys = Object.keys(rawUser);
  const mappedKeys = Object.values(mappingFields);

  return JSON.stringify(inputUserKeys) === JSON.stringify(mappedKeys);
};

export const parseKeys = (users: Record<string, string>[]): UserRawValues[] => {
  const userWithParsedKeys = users.map((user) => {
    if (!isValidRawUser(user)) {
      throw new Error("Corrupt data source");
    }
    const userValues = Object.values(user);
    const merged = Object.keys(mappingFields).reduce(
      (acc, field, index) => ({ ...acc, [field]: userValues[index] }),
      {}
    ) as UserRawValues;
    return merged;
  });
  return userWithParsedKeys;
};

export const parseValues = (users: UserRawValues[]): User[] => {
  const usersWithParsedValues = users.map((user) => {
    return {
      ...user,
      followers: converToNumber(user.followers),
      engagement: converToNumber(user.engagement),
      engagementAvg: converToNumber(user.engagementAvg),
    };
  });

  return usersWithParsedValues;
};

const converToNumber = (strNumber: string): number => {
  const magnitude = strNumber.substring(strNumber.length - 1);
  let multiple;
  if (magnitude === "B") {
    multiple = 9;
  } else if (magnitude === "M") {
    multiple = 6;
  } else if (magnitude === "K") {
    multiple = 3;
  } else {
    multiple = 0;
  }

  let parsedNumber: number;

  if (multiple) {
    parsedNumber = parseFloat(strNumber.slice(0, -1)) * Math.pow(10, multiple);
  } else {
    parsedNumber = parseFloat(strNumber);
  }

  if (isNaN(parsedNumber)) {
    throw new Error("Corrupt number format");
  }
  return parsedNumber;
};
