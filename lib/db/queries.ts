import { User } from "./models";

const getUser = (uid: string) => {
  return User.findOne({
    where: {
      idUsers: uid,
    },
  });
};

export { getUser };
