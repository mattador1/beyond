import type { NextApiRequest, NextApiResponse } from "next";
import csv from "csvtojson";
import path from "path";
import { GetUserResponse } from "../../models/types";
import { parseKeys, parseValues } from "../../models/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetUserResponse>
) {
  const filePath = path.join(
    __dirname,
    "../../../../",
    "data",
    "instagram_influencers.csv"
  );

  try {
    const jsonObject = await csv().fromFile(filePath);

    const parseUserKeys = parseKeys(jsonObject);

    const user = parseValues(parseUserKeys);

    console.log(user);
    res.status(200).json({ users: user });
  } catch (err) {
    res.status(500).json({ users: null });
  }
}
