import { User } from ".prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { postReaction } from "../../../lib/db/queries";

interface ReqData {
  reaction: string;
  article: number;
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (session) {
    const user = session.user as User;
    const data = JSON.parse(req.body) as ReqData;
    try {
      await postReaction(data.reaction, data.article, user.id);
      res.status(200);
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  } else {
    res.status(401);
  }
  res.end();
}
