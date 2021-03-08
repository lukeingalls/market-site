import { NextApiRequest, NextApiResponse } from "next";
import authRequest from "../../../lib/api/authRequest";
import { User, UserAttributes } from "../../../lib/db/models";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  authRequest(req, res, async () => {
    try {
      await User.update(req.body as UserAttributes, {
        where: {
          idUsers: (req.body as UserAttributes).idUsers,
        },
      });
      res.status(200).json({ success: true });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false });
    }
  });
};
