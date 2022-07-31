import { useNavigate } from "react-router-dom";
import { constructUrl } from "utils";

export const useNavigateToResult = () => {
  const navigateTo = useNavigate();
  return (result: Parameters<typeof constructUrl>[0]) =>
    navigateTo(constructUrl(result));
};
