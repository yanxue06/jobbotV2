import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Login from "./Login";
import Signup from "./Signup";
import { authService } from "@/services/auth";

type AuthView = "login" | "signup";

interface AuthModalProps {
  trigger?: React.ReactNode;
  onAuthSuccess?: () => void;
}

export default function AuthModal({ trigger, onAuthSuccess }: AuthModalProps) {
  const [view, setView] = useState<AuthView>("login");
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
    if (onAuthSuccess) onAuthSuccess();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button variant="outline">Login / Sign up</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md p-0 gap-0">
        {view === "login" ? (
          <Login
            onSuccess={handleSuccess}
            onSignupClick={() => setView("signup")}
          />
        ) : (
          <Signup
            onSuccess={handleSuccess}
            onLoginClick={() => setView("login")}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
