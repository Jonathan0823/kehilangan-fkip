import { prisma } from "@/lib/prisma";
import { NextApiRequest } from "next";

export default async function handler(req: NextApiRequest) {
  const { types } = req.query;

  const typesArray = Array.isArray(types) ? types : [types];

  try {
    const post = await prisma.post.findMany({
      where: {
        OR: typesArray.map((type) => ({ type })),
      },
    });

    console.log("Fetching posts with types:", typesArray);
    return res.status(200).json(post);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch posts." });
  }
}
