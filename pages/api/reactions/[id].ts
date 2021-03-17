import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import {
  getArticleReactions,
  getMyReaction,
  getViews,
  putView,
} from "../../../lib/db/queries";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  const id = parseInt(req.query["id"].toString());
  const address = req.socket.address()["address"];
  if (address && id) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
    // Concurrent async operations see link above
    let reqs: Array<Promise<any>> = [
      (async () => getArticleReactions(id))(),
      (async () => getViews(id))(),
      (async () => putView(address, id))(),
    ];
    if (session) {
      const user = session.user as User;
      reqs = [...reqs, (async () => getMyReaction(user.id, id))()];
    }

    const [reactions, views, _, myReaction] = await Promise.all(reqs);
    res.status(200).json({
      reactions,
      myReaction: myReaction?.type,
      views: views.count._all,
    });
  } else {
    res.status(400);
  }
  res.end();
}
