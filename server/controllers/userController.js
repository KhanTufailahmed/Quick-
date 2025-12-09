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
    return res.status(200).json({ data: creations, succcess: true });
  } catch (error) {
    return res.status(400).json({ message: error.message, succcess: false });
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
    return res.status(200).json({ data: creations, succcess: true });
  } catch (error) {
    return res.status(400).json({ message: error.message, succcess: false });
  }
};

export const toogleLikeCreation = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { id } = req.body;

    const creation = await prisma.creations.findUnique({
      where: {
        id: id,
      },
    });

    if (!creation)
      return res
        .status(400)
        .json({ message: "Creation not found", succcess: false });

    const currentLikes = creation.likes;

    const userIdStr = userId.toString();

    let updatedLikes;
    let message;

    if (currentLikes.includes(userIdStr)) {
      updatedLikes = currentLikes.filter((user) => user !== userIdStr);
      message: "Creation unliked";
    } else {
      updatedLikes = [...currentLikes, userIdStr];
      message: "Creation liked";
    }

    const formattedLikes = `{${updatedLikes.join(",")}}`;

    const updatedCreation = await prisma.creations.update({
      where: {
        id: id,
      },
      data: {
        likes: formattedLikes,
      },
    });

    res.status(200).json({ data: message, succcess: true });
  } catch (error) {
    return res.status(400).json({ message: error.message, succcess: false });
  }
};
