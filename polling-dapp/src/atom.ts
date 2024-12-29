import { web3 } from "@coral-xyz/anchor";
import { LucideIcon } from "lucide-react";
import { atom } from "recoil";

interface AlertState {
  icon?: LucideIcon;
  title?: string;
  description?: string;
  className?: "default" | "destructive" | null | undefined;
  visible: boolean;
}

interface ProfileAccount {
  authority: web3.PublicKey | null;
  totalPolls: number;
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

export const profileState = atom<ProfileAccount>({
  key: 'profileState',
  default: {
    authority: null,
    totalPolls: 0,
  }
});