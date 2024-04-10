import { NextApiRequest, NextApiResponse } from 'next';

import serverAuth from '@/libs/serverAuth';
export type IUser = {
  id: string;
  name: string | null;
  username: string | null;
  bio: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  coverImage: string | null;
  profileImage: string | null;
  hashedPassword: string | null;
  createdAt: Date;
  updatedAt: Date;
  followingIds: string[];
  hasNotification: boolean | null;
};


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const { currentUser } = (await serverAuth(req, res)) as {
      currentUser: IUser;
    };

    return res.status(200).json(currentUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

