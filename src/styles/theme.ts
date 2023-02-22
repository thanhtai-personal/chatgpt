import createMuiTheme from "@material-ui/core/styles/createTheme";

declare module "@material-ui/core/Typography/Typography" {
  interface TypographyPropsVariantOverrides {
    lightBold: true;
    bold: true;
    light: true;
    link: true;
  }
}

declare module "@material-ui/core/Button/Button" {
  interface ButtonPropsVariantOverrides {
    primary: true;
    secondary: true;
    success: true;
    danger: true;
    info: true;
  }
}

export const Colors = {
  bg: "#1C1D25",
  header: "#1C1D25",
  primary: "#3778FB",
  textPrimary: "black",
  secondary: "#5EDB7C",
  textColor: "rgba(255, 255, 255, 1)",
  subTextColor: "#FBFBFE",
  subTextColor2: "#5F606D",
  border: "#30313F",
};

export const createAppTheme = () => {
  const muiTheme = createMuiTheme({
    typography: {
      caption: {
        fontSize: "14px",
      },
    },
    components: {},
    palette: {
      primary: {
        main: Colors.primary,
      },
      secondary: {
        main: Colors.secondary,
      },
    },
  });
  return {
    ...muiTheme,
    spacing: (factor) => `${0.25 * factor}rem`,
    colors: {
      ...Colors,
    },
    metrics: {},
    formGroup: {
      border: "1px solid #D9DAED",
      padding: "10px",
      borderRadius: 10,
    },

    autoTransformWhenHolver: {
      transition: "all .2s",
      "&:hover": {
        transform: "translateY(-5px)",
      },
    },

    input: {
      borderRadius: 5,
      border: `2px solid #84DEFF`,
      padding: "8px 16px",
    },
  };
};

export type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];
export type AppTheme = ReturnType<typeof createAppTheme>;
