import z from "zod";

export const profileSchema = z.object({
  id: z.string(),
  display_name: z.string(),
  email: z.string().optional(),
  avatar_url: z.string(),
  created_at: z.date(),
});

export type AuthProvider = "facebook";

export type UserMetadata = {
  avatar_url: string;
  email: string;
  email_verified: boolean;
  full_name: string;
  name: string;
  nickname: string;
  phone_verified: boolean;
  picture: string;
  provider_id: string;
  slug: string;
  sub: string;
};

export type AppMetadata = {
  provider: AuthProvider;
  providers: AuthProvider[];
};

export type UserIdentity = {
  identity_id: string;
  id: string;
  user_id: string;
  identity_data: UserMetadata;
  provider: AuthProvider;
  last_sign_in_at: string;
  created_at: string;
  updated_at: string;
  email: string;
};

export type SocialUser = {
  id: string;
  aud: "authenticated";
  role: "authenticated";
  email: string;
  email_confirmed_at: string;
  phone: string;
  confirmed_at: string;
  last_sign_in_at: string;
  app_metadata: AppMetadata;
  user_metadata: UserMetadata;
  identities: UserIdentity[];
  created_at: string;
  updated_at: string;
  is_anonymous: boolean;
};

export type Profile = z.infer<typeof profileSchema>;
