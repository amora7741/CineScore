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
    <section className="h-fit space-y-4 rounded-lg border-2 border-muted p-4">
      <div className="flex items-center gap-2">
        <Icon className="size-5" />

        <h2 className="text-xl font-bold">{header}</h2>
      </div>

      {children}
    </section>
  );
};

export default MovieDetailSection;
