import Image from "next/image";
import Link from "next/link"; 

export function HeaderSideBarre() {
  const URL = "/accueil";
  return (
    <div className="flex flex-col items-center p-4 dark:bg-white rounded-lg">
      <Link href={URL}>
        <Image
          src="/cinetica.png" // Assure-toi que le chemin de l'image est correct
          alt="Logo"
          className="rounded-full border-4 shadow-lg transition-transform duration-300 hover:scale-110"
          width={120}
          height={120}
        />
      </Link>
    </div>
  );
}

