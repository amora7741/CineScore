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
      className={`h-fit rounded-full bg-muted/50 p-2 text-card-foreground backdrop-blur-lg hover:bg-background ${className}`}
      onClick={() => router.back()}
    >
      <ArrowLeft className="!size-6" />
    </Button>
  );
};

export default BackButton;
