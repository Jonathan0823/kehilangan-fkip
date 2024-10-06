
import { prisma } from "@/app/lib/prisma";

interface Post {
  userId: string;
  userName: string;
  userImage: string;
  timeAgo: string; 
  title: string;
  description: string;
  image?: string; 
  type?: string;
    date: string;
}

export const createPost = async (formData: Post) => {
  const { title, description, image, userImage, date, userName, userId, type } = formData; 
    console.log( title, description, image, userImage, date, userName, userId, type );
  try {
    const post = await prisma.post.create({
      data: {
        title,
        description,
        image,
        date,
        userImage,
        userName,
        userId,
        type,
      },
    });
    return post; 
  } catch (err) {
    throw new Error("err"); 
  }
};
