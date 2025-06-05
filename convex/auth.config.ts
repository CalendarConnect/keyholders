export default {
  providers: [
    {
      domain: process.env.CLERK_SIGNING_KEY || "https://smiling-maggot-62.clerk.accounts.dev",
      applicationID: "convex",
    },
  ]
};