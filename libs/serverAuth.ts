import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/libs/prismadb';
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) {
    return res.status(401).json({ error: "Not authenticated" });
  } 

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    }
  });

  if (!currentUser) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  return { currentUser };
};

export default serverAuth;

