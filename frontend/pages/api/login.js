import { fetchJson } from "../../lib/api";
import cookie from "cookie";

const { CMS_URL } = process.env;

async function handleLogin(req, res) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  const { email, password } = req.body;

  try {
    const { jwt, user } = await fetchJson(`${CMS_URL}/auth/local`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        identifier: email,
        password: password,
      }),
    });

    res.status(200).setHeader(
      "Set-Cookie",
      cookie.serialize("jwt", jwt, {
        path: "/api",
        httpOnly: true,
      })
    );
    res.status(200).json({
      id: user.id,
      name: user.username,
    });
  } catch (err) {
    res.status(401).end();
  }
}

export default handleLogin;
