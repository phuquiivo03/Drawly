"use client";

import { createClient } from "@/infrastructure/supabase/client";
import { Button } from "./button";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";

export default function FacebookLogin() {
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "facebook",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    setLoading(false);
    if (error) {
      console.error(error);
    } else {
    }
  };

  return (
    <Button
      className="bg-blue-500! text-white!"
      variant="secondary"
      onClick={handleLogin}
    >
      Login with Facebook {loading && <LoaderCircle className="animate-spin" />}
    </Button>
  );
}
