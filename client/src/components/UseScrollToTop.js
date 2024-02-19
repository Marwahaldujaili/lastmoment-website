import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]); // Trigger the effect on path change
};

export default useScrollToTop;
