import color from 'color';

import { Platform } from 'react-native';

export default {

    // Badge
  badgeBg: '#ED1727',
  badgeColor: '#fff',


  // Button
  btnFontFamily: (Platform.OS === 'ios') ? 'HelveticaNeue' : 'Roboto_medium',
  btnDisabledBg: '#b5b5b5',
  btnDisabledClr: '#f1f1f1',

  get btnPrimaryBg() {
    return this.brandPrimary;
  },
  get btnPrimaryColor() {
    return this.inverseTextColor;
  },
  get btnInfoBg() {
    return this.brandInfo;
  },
  get btnInfoColor() {
    return this.inverseTextColor;
  },
  get btnSuccessBg() {
    return this.brandSuccess;
  },
  get btnSuccessColor() {
    return this.inverseTextColor;
  },
  get btnDangerBg() {
    return this.brandDanger;
  },
  get btnDangerColor() {
    return this.inverseTextColor;
  },
  get btnWarningBg() {
    return this.brandWarning;
  },
  get btnWarningColor() {
    return this.inverseTextColor;
  },
  get btnTextSize() {
    return (Platform.OS === 'ios') ? this.fontSizeBase * 1.1 :
    this.fontSizeBase - 1;
  },
  get btnTextSizeLarge() {
    return this.fontSizeBase * 1.5;
  },
  get btnTextSizeSmall() {
    return this.fontSizeBase * 0.8;
  },
  get borderRadiusLarge() {
    return this.fontSizeBase * 3.8;
  },

  buttonPadding: 6,

  get iconSizeLarge() {
    return this.iconFontSize * 1.5;
  },
  get iconSizeSmall() {
    return this.iconFontSize * 0.6;
  },


  // Color
  brandPrimary: '#5cb85c',
  brandInfo: '#1F3D26',
  brandSuccess: '#5cb85c',
  brandDanger: '#d9534f',
  brandWarning: '#f0ad4e',
  brandSidebar: '#252932',


  // Font
  fontFamily: (Platform.OS === 'ios') ? 'HelveticaNeue' : 'Roboto',
  fontSizeBase: 16,

  get fontSizeH1() {
    return this.fontSizeBase * 1.8;
  },
  get fontSizeH2() {
    return this.fontSizeBase * 1.6;
  },
  get fontSizeH3() {
    return this.fontSizeBase * 1.4;
  },


  // Footer
  footerHeight: 55,
  footerDefaultBg: (Platform.OS === 'ios') ? '#F8F8F8' : '#1F3D26',


  // FooterTab
  tabBarTextColor: (Platform.OS === 'ios') ? '#6b6b6b' : '#b3c7f9',
  tabBarActiveTextColor: (Platform.OS === 'ios') ? '#1F3D26' : '#fff',
  tabActiveBgColor: (Platform.OS === 'ios') ? '#e4f0fe' : undefined,


  // Header
  iosToolbarBtnColor: '#009eof',
  toolbarDefaultBg: (Platform.OS === 'ios') ? '#F8F8F8' : '#397C49',
  toolbarHeight: (Platform.OS === 'ios') ? 64 : 56,
  toolbarIconSize: (Platform.OS === 'ios') ? 20 : 22,
  toolbarInputColor: '#CECDD2',
  toolbarInverseBg: '#222',
  toolbarTextColor: (Platform.OS === 'ios') ? '#000' : '#fff',
  get statusBarColor() {
    return color(this.toolbarDefaultBg).darken(0.2).hexString();
  },


  // Icon
  iconFamily: 'Ionicons',
  iconFontSize: (Platform.OS === 'ios') ? 30 : 28,
  iconMargin: 7,


  // Line Height
  btnLineHeight: 19,
  lineHeightH1: 32,
  lineHeightH2: 27,
  lineHeightH3: 22,
  iconLineHeight: (Platform.OS === 'ios') ? 37 : 30,
  lineHeight: (Platform.OS === 'ios') ? 20 : 26,


  // List
  listBorderColor: '#fff',
  // listBorderColor: '#ddd',
  listDividerBg: '#ddd',
  listItemHeight: 45,
  listItemPadding: 15,
  listNoteColor: '#808080',
  listNoteSize: 13,


  // Spinner
  defaultSpinnerColor: '#45D56E',
  inverseSpinnerColor: '#1A191B',

  // Text
  textColor: '#000',
  inverseTextColor: '#fff',


  // Title
  titleFontSize: (Platform.OS === 'ios') ? 17 : 19,
  subTitleFontSize: (Platform.OS === 'ios') ? 12 : 14,
  subtitleColor: '#8e8e93',


  // Other
  borderRadiusBase: (Platform.OS === 'ios') ? 5 : 2,
  borderWidth: 1,
  contentPadding: 10,

  get darkenHeader() {
    return color(this.tabBgColor).darken(0.03).hexString();
  },

  dropdownBg: '#000',
  dropdownLinkColor: '#414142',
  inputLineHeight: 24,
  jumbotronBg: '#C9C9CE',
  jumbotronPadding: 30,
};
