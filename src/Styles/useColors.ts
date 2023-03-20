import { useMemo } from "react";
import { useColorScheme } from "react-native";

const useDynamicColors = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const Colors = useMemo(() => {
    return {
      backgroundColor: isDarkMode ? '#222' : '#F3F3F3',
      inputBackgroundColor: isDarkMode ? '#666666' : '#B3B3B3',
      textColor: isDarkMode ? '#FFFFFF' : '#000000'
    }
  }, [isDarkMode]);


  return Colors;
};

export default useDynamicColors;