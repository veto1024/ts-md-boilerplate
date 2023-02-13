'use strict';
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
exports.__esModule = true;
var styles_1 = require('@mui/material/styles');
// ----------------------------------------------------------------------
function createGradient(color1, color2) {
  return 'linear-gradient(to bottom, '.concat(color1, ', ').concat(color2, ')');
}
// SETUP COLORS
var GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
  5008: (0, styles_1.alpha)('#919EAB', 0.08),
  50012: (0, styles_1.alpha)('#919EAB', 0.12),
  50016: (0, styles_1.alpha)('#919EAB', 0.16),
  50024: (0, styles_1.alpha)('#919EAB', 0.24),
  50032: (0, styles_1.alpha)('#919EAB', 0.32),
  50048: (0, styles_1.alpha)('#919EAB', 0.48),
  50056: (0, styles_1.alpha)('#919EAB', 0.56),
  50080: (0, styles_1.alpha)('#919EAB', 0.8)
};
var PRIMARY = {
  lighter: '#C8FACD',
  light: '#5BE584',
  main: '#00AB55',
  dark: '#007B55',
  darker: '#005249',
  contrastText: '#fff'
};
var SECONDARY = {
  lighter: '#D6E4FF',
  light: '#84A9FF',
  main: '#3366FF',
  dark: '#1939B7',
  darker: '#091A7A',
  contrastText: '#fff'
};
var INFO = {
  lighter: '#D0F2FF',
  light: '#74CAFF',
  main: '#1890FF',
  dark: '#0C53B7',
  darker: '#04297A',
  contrastText: '#fff'
};
var SUCCESS = {
  lighter: '#E9FCD4',
  light: '#AAF27F',
  main: '#54D62C',
  dark: '#229A16',
  darker: '#08660D',
  contrastText: GREY[800]
};
var WARNING = {
  lighter: '#FFF7CD',
  light: '#FFE16A',
  main: '#FFC107',
  dark: '#B78103',
  darker: '#7A4F01',
  contrastText: GREY[800]
};
var ERROR = {
  lighter: '#FFE7D9',
  light: '#FFA48D',
  main: '#FF4842',
  dark: '#B72136',
  darker: '#7A0C2E',
  contrastText: '#fff'
};
var GRADIENTS = {
  primary: createGradient(PRIMARY.light, PRIMARY.main),
  info: createGradient(INFO.light, INFO.main),
  success: createGradient(SUCCESS.light, SUCCESS.main),
  warning: createGradient(WARNING.light, WARNING.main),
  error: createGradient(ERROR.light, ERROR.main)
};
var palette = {
  common: { black: '#000', white: '#fff' },
  primary: __assign({}, PRIMARY),
  secondary: __assign({}, SECONDARY),
  info: __assign({}, INFO),
  success: __assign({}, SUCCESS),
  warning: __assign({}, WARNING),
  error: __assign({}, ERROR),
  grey: GREY,
  gradients: GRADIENTS,
  divider: GREY[50024],
  text: { primary: GREY[800], secondary: GREY[600], disabled: GREY[500] },
  background: { paper: '#fff', default: '#fff', neutral: GREY[200] },
  action: {
    active: GREY[600],
    hover: GREY[5008],
    selected: GREY[50016],
    disabled: GREY[50080],
    disabledBackground: GREY[50024],
    focus: GREY[50024],
    hoverOpacity: 0.08,
    disabledOpacity: 0.48
  }
};
exports['default'] = palette;