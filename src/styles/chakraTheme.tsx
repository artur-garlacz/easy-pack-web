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
      dark: "#EF4123",
      600: "#EF4123", // to work with chakra Button colorScheme and hover state
      medium: "#F37021",
      500: "#F37021",
      light: "#F7941D",
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
