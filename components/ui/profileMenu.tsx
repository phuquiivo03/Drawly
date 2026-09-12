import { useUserStore } from "@/stores/user.store";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./button";
import { LogOut } from "lucide-react";
import { createClient } from "@/infrastructure/supabase/server";

function ProfileMenu() {
  const { user, setUser } = useUserStore((state) => state);
  const [open, setOpen] = useState<boolean>(false);
  const handleLogout = () => {
    fetch("/api/auth/logout", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUser(null);
        } else {
          console.error("Logout failed!");
        }
      })
      .catch(() => {
        console.error("Logout failed!");
      });
  };
  if (!user || !user.user_metadata) return;
  return (
    <div
      className=" relative"
      onMouseEnter={() => {
        setOpen(true);
      }}
      onMouseLeave={() => {
        setOpen(false);
      }}
    >
      <div className=" flex gap-2  items-center">
        <span className="text-black font-bold text-md">
          {user.user_metadata.nickname}
        </span>
        <Image
          className="rounded-full w-9 h-9 border-[1px] border-accent "
          src={user.user_metadata.avatar_url}
          width={200}
          height={200}
          alt=""
        />
      </div>
      {open && (
        <div className="p-4 rounded-2xl shadow-sm bg-white absolute top-[100%] right-0 w-[200px] ">
          <button
            onClick={handleLogout}
            className="w-full p-2 text-start hover:bg-[#cccccc4f] rounded-sm flex font-medium items-center justify-between"
          >
            Logout <LogOut size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileMenu;
