import PageRouter from "@/components/PageRouter";
import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="relative mx-auto grid w-full max-w-screen-2xl grid-rows-[1fr_auto] gap-6 p-4 py-8 sm:p-8">
      <div className="grid place-items-center">
        <LoaderCircle className="size-16 animate-spin" />
      </div>

      <PageRouter hrefPath="" maxPages={1} page={1} />
    </div>
  );
}
