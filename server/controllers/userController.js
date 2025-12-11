import prisma from "../config/db.js";

export const getUserCreations = async (req, res) => {
  try {
    const { userId } = req.auth();

    const creations = await prisma.creations.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        cratedAt: "desc",
      },
    });
    return res.status(200).json({ data: creations, success: true });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};

export const getPublishedCreations = async (req, res) => {
  try {
    const creations = await prisma.creations.findMany({
      where: {
        publish: true,
      },
      orderBy: {
        cratedAt: "desc",
      },
    });
    return res.status(200).json({ data: creations, success: true });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};



export const toogleLikeCreation = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { id } = req.body;

    const creation = await prisma.creations.findUnique({
      where: { id },
    });

    if (!creation) {
      return res.status(400).json({
        message: "Creation not found",
        success: false,
      });
    }

    const currentLikes = creation.likes || [];
    const userIdStr = userId.toString();

    let updatedLikes;
    let message;

    if (currentLikes.includes(userIdStr)) {
      updatedLikes = currentLikes.filter((u) => u !== userIdStr);
      message = "Creation unliked";
    } else {
      updatedLikes = [...currentLikes, userIdStr];
      message = "Creation liked";
    }

    await prisma.creations.update({
      where: { id },
      data: {
        likes: { set: updatedLikes },
      },
    });

    return res.status(200).json({ data: message, success: true });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};
