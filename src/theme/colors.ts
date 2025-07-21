// COLOR COLLECTIONS

import { DefaultTheme } from "@react-navigation/native";

// colors.js

/** Light mode palette */
export const LIGHT_COLORS = {
  // app backgrounds
  screenBackgroundColor: "#FFFFFF",
  statusBarColor:      "#FFFFFF",

  // primary mint scale
  primary:        "#9FFFE0",
  primaryLight0:  "#E6FFFA", // +90% tint
  primaryLight:   "#CCFFF5", // +70% tint
  primaryLight1:  "#B3FFF0", // +60%
  primaryLight2:  "#99FFEB", // +50%
  primaryDark:    "#33D6B0", // –30% shade
  primaryDark1:   "#2AB598", // –40%
  primaryDark2:   "#22817F", // –50%
  primaryDark3:   "#1A6C66", // –60%
  primaryDark4:   "#13494A", // –70%
  primaryDark5:   "#0B2A2E", // –80%
  primaryDark6:   "#031010", // –90%
  transparentPrimary: "rgba(159,255,224,0.2)",
  translucentPrimary: "rgba(159,255,224,0.5)",

  // secondary (keep your existing black‑based accents)
  secondary:           "#090909",
  secondaryLight:      "#21222D",
  secondaryDark:       "#1B1C26",
  transparentSecondary:"#404355",

  // greys & neutrals
  whiteGray:     "#F3F5F7",
  gray:          "#888888",
  darkGray:      "#CFCFCF",
  lightGray:     "#F9F9F9",
  lightGray1:    "#DDDDDD",
  collpasableGray:"#F9FAFB",
  borderGray:    "#F1F1F1",
  appGray:       "#344054",
  textGray:      "#667085",

  // status colours
  warning:     "#FFAB07",
  warningDark: "#B54708",
  danger:      "#E43E3E",
  dangerDark:  "#B42318",
  success:     "#12B76A",
  successDark: "#027A48",

  // blacks & whites
  darkBlack: "#000000",
  black:     "#1E1F20",
  white:     "#FFFFFF",

  // transparency helpers
  transparent:           "transparent",
  transparentBlack:      "rgba(0, 0, 0, 0.1)",
  transparentWhite:      "rgba(255, 255, 255, 0.4)",
  transparentDarkBlack:  "#00000040",
  transparentWhiteBlur:  "rgba(255, 255, 255, 0.15)",
  translucentWhiteBlur:  "rgba(255, 255, 255, 0.8)",
  loaderBg:              "rgba(0, 0, 0, 0.6)",

  // extra greys
  gray1:      "#D0D5DD",
  gray2:      "#101828",
  gray3:      "#EEEEEE",
  gray4:      "#F0F0F0",
  gray5:      "#E5E5E5",
  gray6:      "#D6D6D6",
  darkGray1:  "#AAAAAA",

  // misc
  tooltip:            "#0F1828",
  featuredColorInner: "#DCF0F9",
  lightBlue:          "#ADDDF7",
  fadeGreen:          "#66A534",

  // grade scales
  colorGrades: {
    primaryGradeDark: "#DCF0F9",
    primaryGradeLight:"#EEF7FC",
    greenGradeDark:   "#D1FADF",
    greenGradeLight:  "#ECFDF3",
    redDark:          "#FEF3F2",
    orangeDark:       "#FFFAEB",
    grayDark:         "#F2F4F7",
  },
};

/** Dark mode palette */
export const DARK_COLORS = {
  // app backgrounds
  screenBackgroundColor: "#121212",
  statusBarColor:      "#121212",

  // same primary scale
  primary:        "#9FFFE0",
  primaryLight0:  "#E6FFFA",
  primaryLight:   "#CCFFF5",
  primaryLight1:  "#B3FFF0",
  primaryLight2:  "#99FFEB",
  primaryDark:    "#33D6B0",
  primaryDark1:   "#2AB598",
  primaryDark2:   "#22817F",
  primaryDark3:   "#1A6C66",
  primaryDark4:   "#13494A",
  primaryDark5:   "#0B2A2E",
  primaryDark6:   "#031010",
  transparentPrimary: "rgba(159,255,224,0.1)",
  translucentPrimary: "rgba(159,255,224,0.3)",

  // invert secondary for dark
  secondary:           "#FFFFFF",
  secondaryLight:      "#E0E0E0",
  secondaryDark:       "#B0B0B0",
  transparentSecondary:"rgba(255,255,255,0.2)",

  // greys & neutrals tuned darker
  whiteGray:     "#1F1F1F",
  gray:          "#888888",
  darkGray:      "#444444",
  lightGray:     "#2A2A2A",
  lightGray1:    "#383838",
  collpasableGray:"#1A1A1A",
  borderGray:    "#333333",
  appGray:       "#888888",
  textGray:      "#BBBBBB",

  // status colours (unchanged)
  warning:     "#FFAB07",
  warningDark: "#B54708",
  danger:      "#E43E3E",
  dangerDark:  "#B42318",
  success:     "#12B76A",
  successDark: "#027A48",

  // blacks & whites swapped for dark
  darkBlack: "#FFFFFF",
  black:     "#E0E0E0",
  white:     "#000000",

  // transparency helpers
  transparent:           "transparent",
  transparentBlack:      "rgba(0, 0, 0, 0.3)",
  transparentWhite:      "rgba(255, 255, 255, 0.1)",
  transparentDarkBlack:  "#FFFFFF40",
  transparentWhiteBlur:  "rgba(255, 255, 255, 0.15)",
  translucentWhiteBlur:  "rgba(255, 255, 255, 0.8)",
  loaderBg:              "rgba(255, 255, 255, 0.6)",

  // extra greys
  gray1:      "#2E2E2E",
  gray2:      "#D0D5DD",
  gray3:      "#3A3A3A",
  gray4:      "#333333",
  gray5:      "#444444",
  gray6:      "#555555",
  darkGray1:  "#AAAAAA",

  // misc
  tooltip:            "#F0F0F0",
  featuredColorInner: "#113B48",
  lightBlue:          "#5A8DAD",
  fadeGreen:          "#4F8C4A",

  // grade scales
  colorGrades: {
    primaryGradeDark: "#113B48",
    primaryGradeLight:"#224C5D",
    greenGradeDark:   "#0F4F2E",
    greenGradeLight:  "#163D23",
    redDark:          "#551A1A",
    orangeDark:       "#665B00",
    grayDark:         "#1F2022",
  },
};


export const statusBarStyle = "dark-content"; // light-content || dark-content
// export const COLORS = isDark ? DARK_COLORS : LIGHT_COLORS;
export const COLORS = LIGHT_COLORS;

export const NavTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.screenBackgroundColor,
  },
};
