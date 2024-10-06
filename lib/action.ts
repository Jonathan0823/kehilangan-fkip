import { prisma } from "./prisma";

export const find = async (types) => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        OR: types.map((type) => ({ type })),
      },
    });

    console.log("Fetching posts with types:", types);
    return posts;
  } catch (err) {
    console.error(err);
  }
};
