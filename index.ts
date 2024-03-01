import express from "express";
import crypto from "crypto";

const PORT = 3000;
const CLIENT_ID = process.env.CLIENT_ID as string;
const CLIENT_SECRET = process.env.CLIENT_SECRET as string;

const app = express();

app.use(express.static("static"));

app.get("/oauth/google", (req, res) => {
  const params = new URLSearchParams();

  params.set("response_type", "code");
  params.set("client_id", CLIENT_ID);
  params.set("redirect_uri", "http://localhost:3000/oauth/google/callback");
  params.set("scope", "email");

  const state = crypto.randomBytes(16).toString("hex");
  params.set("state", state);

  const url = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;

  res.set("Set-Cookie", `oauth_state=${state}; HttpOnly; Secure; SameSite=Lax`);
  res.redirect(url);
});

app.get("/oauth/google/callback", async (req, res) => {
  const { code, state } = req.query;
  const oauthState = getCookie("oauth_state", req.headers.cookie as string);

  if (state !== oauthState) {
    return res.status(400).send("Invalid state");
  }

  const accessToken = await exchangeCodeForToken(code as string);
  const userInfo = await getUserInfo(accessToken);

  res.header("Content-Type", "application/json").send(JSON.stringify(userInfo));
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

function getCookie(name: string, cookies: string) {
  const cookie = cookies.split(";").find((cookie) => cookie.trim().startsWith(`${name}=`));
  if (!cookie) {
    return null;
  }
  return cookie.split("=")[1];
}

async function exchangeCodeForToken(code: string) {
  const resp = await fetch(`https://oauth2.googleapis.com/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: "http://localhost:3000/oauth/google/callback",
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }).toString(),
  });

  if (!resp.ok) {
    throw new Error("Something went wrong");
  }

  const { access_token } = (await resp.json()) as { access_token: string };

  return access_token;
}

async function getUserInfo(accessToken: string) {
  const resp = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const json = (await resp.json()) as { email: string };
  return json;
}
