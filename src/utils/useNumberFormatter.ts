import { useCallback } from "react";

const useNumberFormatter = () => {
  const formatNumber = useCallback((num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }, []);

  return { formatNumber };
};

export default useNumberFormatter;
