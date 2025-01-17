import { Popcorn } from "lucide-react";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(550px,_40%)]">
      <div className="relative hidden size-full overflow-hidden lg:flex">
        <Image
          priority
          src="/movies.png"
          alt="Background image"
          width={500}
          height={500}
          className="absolute -z-50 size-full scale-105 object-cover"
        />

        <div className="grid size-full place-items-center bg-background/80 backdrop-blur-lg">
          <Popcorn className="animate-float size-28 text-red-500 xl:size-40" />
        </div>
      </div>
      <div className="relative size-full overflow-hidden shadow-lg">
        <Image
          priority
          src="/movies.png"
          alt="Background image"
          width={500}
          height={500}
          className="absolute -z-50 hidden size-full scale-105 object-cover sm:flex lg:hidden"
        />

        <div className="grid size-full place-items-center bg-background/80 backdrop-blur-lg">
          {children}
        </div>
      </div>
    </main>
  );
}
