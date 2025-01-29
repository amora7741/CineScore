import InfiniteMovies from "@/components/InfiniteMovies";
import { getServerAuthSession } from "@/lib/auth";
import { notFound } from "next/navigation";

const Profile = async () => {
  const session = await getServerAuthSession();

  if (!session) {
    notFound();
  }

  return (
    <main className="relative mx-auto grid w-full max-w-screen-2xl grid-rows-[auto_1fr] space-y-6 p-4 py-8 sm:p-8">
      <div className="space-y-2 px-2">
        <p className="text-xl sm:text-2xl lg:text-4xl">
          Hello <span className="font-bold">{session.user.username}</span>!
        </p>
        <p className="text-sm italic sm:text-base">
          Here are your favorite movies :&#41;
        </p>
      </div>

      <InfiniteMovies />
    </main>
  );
};

export default Profile;
