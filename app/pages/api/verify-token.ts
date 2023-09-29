import { NextApiResponse } from "next";
import { withSessionToken } from "shopify-nextjs-toolbox";

const handler = async (req, res: NextApiResponse) => {
  res.statusCode = 200;
  res.json(req.sessionToken);
};

export default withSessionToken(handler);
