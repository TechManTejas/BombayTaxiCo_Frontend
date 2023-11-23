export interface Colors {
    blue: string;
    blue100: string;
    blue200: string;
    blue300: string;
    blue400: string;
    blue500: string;
    blue600: string;
    blue700: string;
    blue800: string;
    blue900: string;
  
    red: string;
    red100: string;
    red200: string;
    red300: string;
    red400: string;
    red500: string;
    red600: string;
    red700: string;
    red800: string;
    red900: string;
  
    green: string;
    green100: string;
    green200: string;
    green300: string;
    green400: string;
    green500: string;
    green600: string;
    green700: string;
    green800: string;
    green900: string;
  
    yellow: string;
    yellow100: string;
    yellow200: string;
    yellow300: string;
    yellow400: string;
    yellow500: string;
    yellow600: string;
    yellow700: string;
    yellow800: string;
    yellow900: string;
  
    black: string;
    black100: string;
    black200: string;
    black300: string;
    black400: string;
    black500: string;
    black600: string;
    black700: string;
    black800: string;
    black900: string;
  
    white: string;
    white100: string;
    white200: string;
    white300: string;
    white400: string;
    white500: string;
    white600: string;
    white700: string;
    white800: string;
    white900: string;
  }
  
  export interface Spacing {
    xxxs: number;
    xxs: number;
    xs: number;
    sm: number;
    default: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
    xxxl: number;
    x4l: number;
    u52: number;
    u56: number;
    u90: number;
  }
  
  export interface FontSize {
    xxs: number;
    xs: number;
    sm: number;
    md: number;
    default: number;
    lg: number;
    xl: number;
    xxl: number;
    xxxl: number;
    x4l: number;
  }
  
  export interface FontFamily {
    light: string;
    regular: string;
    semiBold: string;
    extraBold: string;
  }
  
  export interface Theme {
    colors: Colors;
    spacing: Spacing;
    fontSize: FontSize;
    fontFamily: FontFamily;
  }
  
  export const defaultTheme: Theme = {
    colors: {
      blue: "#00146d",
      blue100: "#e6e8f0",
      blue200: "#ccd0e2",
      blue300: "#808ab6",
      blue400: "#4d5b99",
      blue500: "#1a2c7c",
      blue600: "#001262",
      blue700: "#000e4c",
      blue800: "#000a37",
      blue900: "#000621",
  
      red: "#d90017",
      red100: "#fbe6e8",
      red200: "#f7ccd1",
      red300: "#ec808b",
      red400: "#e44d5d",
      red500: "#dd1a2e",
      red600: "#c30015",
      red700: "#980010",
      red800: "#6d000c",
      red900: "#410007",
  
      green: "#00a962",
      green100: "#e6f6ef",
      green200: "#cceee0",
      green300: "#80d4b1",
      green400: "#4dc391",
      green500: "#1ab272",
      green600: "#009858",
      green700: "#007645",
      green800: "#005531",
      green900: "#00331d",
  
      yellow: "#ebd808",
      yellow100: "#fdfbe6",
      yellow200: "#fbf7ce",
      yellow300: "#f5ec84",
      yellow400: "#f1e452",
      yellow500: "#eddc21",
      yellow600: "#d4c207",
      yellow700: "#a59706",
      yellow800: "#766c04",
      yellow900: "#464102",
  
      black: "#0c080c",
      black100: "#e7e6e7",
      black200: "#cecece",
      black300: "#868486",
      black400: "#555255",
      black500: "#242124",
      black600: "#0b070b",
      black700: "#080608",
      black800: "#060406",
      black900: "#040204",
  
      white: "#ecf3f8",
      white100: "#fdfefe",
      white200: "#fdfdfe",
      white300: "#f6f9fc",
      white400: "#f2f7fa",
      white500: "#eef4f9",
      white600: "#d4dbdf",
      white700: "#a5aaae",
      white800: "#767a7c",
      white900: "#47494a",
    },
    spacing: {
      xxxs: 1,
      xxs: 2,
      xs: 4,
      sm: 8,
      default: 10,
      md: 12,
      lg: 16,
      xl: 24,
      xxl: 32,
      xxxl: 48,
      x4l: 64,
      u52: 52,
      u56: 56,
      u90: 90,
    },
    fontSize: {
      xxs: 6,
      xs: 8,
      sm: 10,
      md: 12,
      default: 14,
      lg: 18,
      xl: 20,
      xxl: 24,
      xxxl: 32,
      x4l: 48,
    },
    fontFamily: {
      light: "Poppins_200ExtraLight",
      regular: "Poppins_400Regular",
      semiBold: "Poppins_600SemiBold",
      extraBold: "Poppins_800ExtraBold",
    },
  };
  