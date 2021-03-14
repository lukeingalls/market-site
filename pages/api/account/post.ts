import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { postUser } from "../../../lib/db/queries";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (session) {
    try {
      const user = JSON.parse(req.body) as User;
      // @ts-ignore
      if (user.id === session.user.id) {
        const pUser = await postUser(user);
        res.status(200).json({ ...pUser });
      } else {
        throw new Error("User id doesn't match the session");
      }
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  } else {
    res.status(401);
  }
  res.end();
}
