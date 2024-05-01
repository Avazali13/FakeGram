import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

export const scrollTheme = extendTheme({
    styles: {
      global: (props) => ({
        "::-webkit-scrollbar": {
          width: "8px",
        },
        "::-webkit-scrollbar-thumb": {
          bg: mode("red.300", "red.600")(props), // Adjust color based on light/dark mode
          borderRadius: "full",
        },
      }),
    },
  });