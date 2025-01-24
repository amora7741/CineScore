import PageRouter from "@/components/PageRouter";
import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="relative mx-auto grid w-full max-w-screen-2xl grid-rows-[auto_1fr_auto] gap-2 p-4 sm:gap-4 sm:p-8 lg:gap-6">
      <p className="truncate px-2 text-lg sm:text-xl lg:text-2xl">
        Search results for
      </p>

      <div className="grid place-items-center">
        <LoaderCircle className="size-16 animate-spin" />
      </div>

      <PageRouter hrefPath="" maxPages={1} page={1} />
    </div>
  );
}
