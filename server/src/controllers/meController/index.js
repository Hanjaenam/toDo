// eslint-disable-next-line import/prefer-default-export
export const getInfo = async (req, res) => {
  // 어차피 onlyPrivate 되어 있음
  const { hash, salt, ...userInfo } = req.user._doc;
  return res.json(userInfo);
  // if (req.user) {
  //   const { hash, salt, ...userInfo } = req.user._doc;
  //   return res.json(userInfo);
  //   // try {
  //   //   const {
  //   //     _doc: { hash, salt, ...user },
  //   //   } = await req.user.populate('project').execPopulate();
  //   // } catch (err) {
  //   //   console.log(err);
  //   //   return res.status(500).end();
  //   // }
  // }
  // return res.status(204).end();
};

export const logOut = (req, res) => {
  req.logout();
  return res.status(200).end();
};
