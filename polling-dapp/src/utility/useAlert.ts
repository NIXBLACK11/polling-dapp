import { alertState } from "@/atom";
import { LucideIcon } from "lucide-react";
import { useSetRecoilState } from "recoil";

const useAlert = () => {
  const setAlert = useSetRecoilState(alertState);

  const showAlert = ({
    icon,
    title,
    description,
    className,
    duration = 3000,
  }: {
    icon?: LucideIcon;
    title?: string;
    description?: string;
    className?: string;
    duration?: number;
  }) => {
    setAlert({
      icon,
      title,
      description,
      className,
      visible: true,
    });

    if (duration) {
      setTimeout(() => {
        setAlert((prev) => ({ ...prev, visible: false }));
      }, duration);
    }
  };

  return { showAlert };
};

export default useAlert;
