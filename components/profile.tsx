import { useEffect, useState } from "react";
import FacebookLogin from "./ui/facebookLogin";

export default async function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch("/api/auth/facebook")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, []);
  if (!profile) return <FacebookLogin />;
  return <div></div>;
}
