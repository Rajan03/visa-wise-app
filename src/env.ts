export const env = {
  ENV: process.env.NODE_ENV as string,

  // GOOGLE
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,

  // FIREBASE
  FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL as string,
  FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY as string,
  FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
  FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY as string,
  FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN as string,
  FIREBASE_STORAGE_BUCKET: process.env
    .NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
  FIREBASE_MESSAGING_SENDER_ID: process.env
    .NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID as string,
  FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID as string,

  // STRIPE
  VERIFY_EMAIL_URL: process.env.NEXT_PUBLIC_VERIFY_EMAIL_REDIRECT_URL as string,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY as string,
  STRIPE_ENDPOINT_ECRET: process.env
    .NEXT_PUBLIC_STRIPE_ENDPOINT_SECRET as string,
  STRIPE_PUBLISHABLE_KEY: process.env
    .NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,

  // EMAIL
  NODEMAILER_EMAIL:
    process.env.NODE_ENV === "production"
      ? (process.env.EMAIL_USER as string)
      : (process.env.NEXT_PUBLIC_TEST_EMAIL_USER as string),
  NODEMAILER_PW:
    process.env.NODE_ENV === "production"
      ? (process.env.EMAIL_PW as string)
      : (process.env.NEXT_PUBLIC_TEST_EMAIL_PW as string),
};
