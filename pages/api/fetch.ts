import type { NextApiRequest, NextApiResponse } from "next";
import csv from "csvtojson";
import path from "path";
import { GetUserResponse } from "../../models/types";

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
  const jsonObject = await csv().fromFile(filePath);

  console.log(jsonObject);

  res.status(200).json({ users: null });
}
