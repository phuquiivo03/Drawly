export const appEnv = {
  infrastructure: {
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    facebook: {
      clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET!,
      clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID!,
    },
  },
};
