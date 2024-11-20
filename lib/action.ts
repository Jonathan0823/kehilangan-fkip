"use server"
import { prisma } from "./prisma";

export const getProfile = async (id: string) => {
  try {
    if (!id) return null;
    const user = await prisma.user.findUnique({
      where: {
        id: String(id),
      },
      include: {
        posts: true,
      },
    });
    if (!user) return;

    return user;
  } catch (err) {
    console.log(err);
  }
};

export const deleteButton = async (postId: string, userId: string) => {
  console.log(postId, userId);  
    try {
    const exist = await prisma.coment.findMany({
      where: {
        postId,
      },
    });
    const postExist = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    })
    console.log(postExist);
    console.log(exist);

    if (exist) {
      await prisma.coment.deleteMany({
        where: {
          postId,
        },   
      });
      
      await prisma.like.deleteMany({
        where: {
          postId,
        },
      })
    }
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    return "post deleted";
  } catch (err) {
    console.log(err);
  }
};

export const deleteComment = async (commentId: string) => {
  try {
      await prisma.coment.delete({
          where: {
              id: commentId,
          },
      });
      return "comment deleted";
  } catch (error) {
      console.log(error);
  }
}
