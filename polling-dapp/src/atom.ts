import { LucideIcon } from "lucide-react";
import { atom } from "recoil";

interface AlertState {
  icon?: LucideIcon;
  title?: string;
  description?: string;
  className?: "default" | "destructive" | null | undefined;
  visible: boolean;
}

export const alertState = atom<AlertState>({
  key: "alertState",
  default: {
    icon: undefined,
    title: "",
    description: "",
    className: "default",
    visible: false,
  },
});
