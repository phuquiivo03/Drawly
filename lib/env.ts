const nodeEnv = process.env.NODE_ENV || "development";
export const appEnv = {
  infrastructure:
    nodeEnv == "development"
      ? {
          supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
          supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
          supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
          facebook: {
            clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET!,
            clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID!,
          },
        }
      : {
          supabaseKey: process.env.SUPABASE_PUBLISHABLE_KEY!,
          supabaseUrl: process.env.SUPABASE_URL!,
          facebook: {
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
            clientId: process.env.FACEBOOK_CLIENT_ID!,
          },
        },
};
