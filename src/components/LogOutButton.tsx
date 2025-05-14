"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { logOutAction } from "@/actions/users";


function LogOutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogOut = async () => {
    setLoading(true);

    try {
      const {errorMessage} = await logOutAction()

      if (!errorMessage) {
        toast("You have been logged out successfully", {
          description: "See you again soon!",
          action: {
            label: "X",
            onClick: () => console.log("Undo logout"),
          },
          style: {
            backgroundColor: "rgb(16, 185, 129)", // Emerald green
            color: "white",
          },
        });
        router.push("/");
      } else {
        throw new Error("Failed to log out");
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to log out", {
        description: "Something went wrong. Please try again.",
        style: {
          backgroundColor: "rgb(239, 68, 68)", // Red color
          color: "white",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button variant="outline" className="w-24" onClick={handleLogOut} disabled={loading}>
      {loading ? <Loader2 className="animate-spin" /> : "Log Out"}
    </Button>
  );
}

export default LogOutButton;
