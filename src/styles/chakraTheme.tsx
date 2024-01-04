import { defineStyleConfig, extendTheme } from "@chakra-ui/react";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const checkboxTheming = createMultiStyleConfigHelpers([
  "container",
  "control",
  "icon",
  "label",
]);

export const Checkbox = checkboxTheming.defineMultiStyleConfig({
  baseStyle: checkboxTheming.definePartsStyle({
    label: {
      _disabled: {
        _checked: {
          opacity: 1,
        },
      },
    },
    control: {
      _disabled: {
        background: "inherit",
        borderColor: "inherit",
      },
    },
  }),
});

const radioTheming = createMultiStyleConfigHelpers([
  "container",
  "control",
  "label",
]);

export const Radio = radioTheming.defineMultiStyleConfig({
  baseStyle: radioTheming.definePartsStyle({
    label: {
      _disabled: {
        _checked: {
          opacity: 1,
        },
      },
    },
    control: {
      _disabled: {
        background: "inherit",
        borderColor: "inherit",
      },
    },
  }),
});

const Container = defineStyleConfig({
  baseStyle: {
    maxWidth: "1504px",
    px: 8,
  },
});

const Text = defineStyleConfig({
  variants: { caption: { color: "gray.600", fontSize: "sm" } },
});

const theme = {
  styles: {
    global: {
      "td, th": {
        fontVariantNumeric: "normal !important",
      },
    },
  },
  components: {
    Container,
    Text,
    Radio,
    Checkbox,
  },
  fonts: {
    heading: `'Greycliff CF', sans-serif`,
    body: `'Greycliff CF', sans-serif`,
  },
  colors: {
    brand: {
      100: "rgba(168, 196, 154, 0.1)",
      200: "rgba(168, 196, 154, 0.2)",
      300: "rgba(168, 196, 154, 0.3)",
      400: "rgba(168, 196, 154, 0.4)",
      500: "rgba(168, 196, 154, 0.5)",
      600: "rgba(168, 196, 154, 0.6)",
      main: "rgba(168, 196, 154, 1)",
    },
    neutrals: {
      grey: {
        dark: "#252929",
      },
    },
    ep: {
      grey: {
        300: "#DBDBDB",
      },
    },
  },
};

// After adding custom token, you should run "pnpm chakra:generate-theme-types"

const themeExtension = extendTheme(theme);

export default themeExtension;
