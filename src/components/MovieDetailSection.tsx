import { LucideIcon } from "lucide-react";

const MovieDetailSection = ({
  Icon,
  header,
  children,
}: {
  Icon: LucideIcon;
  header: string;
  children: React.ReactNode;
}) => {
  return (
    <section className="space-y-4 rounded-lg border-2 border-muted p-4">
      <div className="flex items-center gap-2">
        <Icon className="size-5" />

        <h1 className="text-xl font-bold">{header}</h1>
      </div>

      {children}
    </section>
  );
};

export default MovieDetailSection;
