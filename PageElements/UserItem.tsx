"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function UserItem() {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
      <Avatar >
        <AvatarImage src="https://github.com/shadcn.png" />
        < AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="grow">
        <p className="text-[10px] font-bold">Nom Prenom</p>
        <p className="text-[8px] text-neutral-500">user@gmail.com</p>
      </div>
    </div>
  );
}