import { Polar } from "@polar-sh/sdk";

// Use a default token for development if the environment variable is missing
const accessToken = process.env.POLAR_ACCESS_TOKEN || 'polar_oat_TKaQPBHvw7nBjTjqPK7dJYs4wHpLHakSw0RlD4VuYzA';

// No need to throw an error since we have a fallback
// if (!accessToken) {
//   throw new Error("POLAR_ACCESS_TOKEN is not configured");
// }

export const polar = new Polar({
  server: "sandbox",
  accessToken: accessToken,
});
