import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Risk Atlas" },
    { name: "description", content: "Welcome to Continuum's Risk Atlas!" },
  ];
};

export const headers = () => ({
  "WWW-Authenticate": "Basic",
});

const isAuthorized = (request) => {
  const header = request.headers.get("Authorization");

  if (!header) return false;

  const base64 = header.replace("Basic ", "");
  const [username, password] = Buffer.from(base64, "base64")
    .toString()
    .split(":");

  // return username === "root" && password === "admin";
  console.log(process.env.USERNAME, process.env.PASSWORD);

  // return username === process.env.USERNAME && password === process.env.PASSWORD;
  return username === "CSS" && password === "RISK-URM-KB";
};

export const loader = async ({ request }) => {
  if (!isAuthorized(request)) {
    return json({ authorized: false }, { status: 401 });
  }

  // Load data for password-protected page here.

  return json({
    authorized: true,
    // Include extra data for password-protected page here.
  });
};

export default function Index() {
  const data = useLoaderData();

  if (!data.authorized) {
    return <h1>Unauthorized</h1>;
  }
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Risk Atlas</h1>
      <link
        rel="stylesheet"
        href="https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/themes/df-messenger-default.css"
      />
      <script src="https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js"></script>
      <df-messenger
        project-id="urm-kb"
        agent-id="3c3819e7-5e1d-480d-95f9-d2a2aeff1743"
        language-code="en"
        max-query-length="-1"
      >
        <df-messenger-chat-bubble chat-title="RiFTLAB"></df-messenger-chat-bubble>
      </df-messenger>

      <style>
        {`df-messenger {
    z-index: 999;
    position: fixed;
    bottom: 16px;
    right: 16px;
  }`}
      </style>
    </div>
  );
}
