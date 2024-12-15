"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

export default function CommandDialogDemo() {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSearch = () => {
    if (search.trim()) {
      router.push(`/search?searchTerm=${search}`);
      setOpen(false); // Fermer la barre après la recherche
    }
  };

  return (
    <><div className="flex-grow relative  gap-2">
    <button
      onClick={() => setOpen(true)} // Ouvre la barre de commande
      className="w-full flex-grow inline-flex items-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input hover:bg-accent hover:text-accent-foreground px-2 py-2 relative h-8 justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none"
      >
      <span className="inline-flex lg:hidden"> Type a command or search... </span>
    </button>
    </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Type a command or search..."
          onValueChange={(value) => setSearch(value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSearch();
            }
          }}
        />
        <CommandList>
        <CommandEmpty>
          Press <span style={{ fontWeight: "bold" }}>Enter</span> ↵ to search
        </CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem onSelect={() => router.push("/accueil")}>
              <Calendar />
              <span>Dashboard</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="favoris">
            <CommandItem onSelect={() => router.push("/favoris")}>
              <User />
              <span>Favoris</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
