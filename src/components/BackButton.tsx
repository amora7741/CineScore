"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ className }) => {
  const router = useRouter();

  return (
    <Button
      className={`h-fit rounded-full bg-muted p-4 text-card-foreground hover:bg-background ${className}`}
      onClick={() => router.back()}
    >
      <ArrowLeft className="!size-6" />
    </Button>
  );
};

export default BackButton;
