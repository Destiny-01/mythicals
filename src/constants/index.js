export const SERVER_URL =
  process.env.NODE_ENV === "production"
    ? "https://mythicals.onrender.com"
    : "http://localhost:8000";
