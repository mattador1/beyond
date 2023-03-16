import type { NextApiRequest, NextApiResponse } from "next";
import csv from "csvtojson";
import path from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const filePath = path.join(
    __dirname,
    "../../../../",
    "data",
    "instagram_influencers.csv"
  );
  const jsonObject = await csv().fromFile(filePath);

  console.log(jsonObject);

  res.status(200).json({});
}
