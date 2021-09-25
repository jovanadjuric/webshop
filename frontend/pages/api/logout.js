import cookie from "cookie";
import { fetchJson } from "../../lib/api";

const { CMS_URL } = process.env;

async function handleLogout(req, res) {
  res.status(200).setHeader(
    "Set-Cookie",
    cookie.serialize("jwt", "", {
      path: "/api",
      expires: new Date(0),
    })
  );
  res.status(200).json({});
}

export default handleLogout;
