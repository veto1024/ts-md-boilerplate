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
var jsx_runtime_1 = require('react/jsx-runtime');
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
var react_1 = require('react');
// material
var material_1 = require('@mui/material');
var styles_1 = require('@mui/material/styles');
//
var shape_1 = require('./shape');
var palette_1 = require('./palette');
var typography_1 = require('./typography');
var overrides_1 = require('./overrides');
var shadows_1 = require('./shadows');
// ----------------------------------------------------------------------
function ThemeConfig(_a) {
  var children = _a.children;
  var themeOptions = (0, react_1.useMemo)(function () {
    return {
      palette: palette_1['default'],
      shape: shape_1['default'],
      typography: typography_1['default'],
      shadows: shadows_1['default'],
      customShadows: shadows_1.customShadows
    };
  }, []);
  var theme = (0, styles_1.createTheme)(themeOptions);
  theme.components = (0, overrides_1['default'])(theme);
  return (0, jsx_runtime_1.jsx)(
    styles_1.StyledEngineProvider,
    __assign(
      { injectFirst: true },
      {
        children: (0, jsx_runtime_1.jsxs)(
          styles_1.ThemeProvider,
          __assign({ theme: theme }, { children: [(0, jsx_runtime_1.jsx)(material_1.CssBaseline, {}), children] })
        )
      }
    )
  );
}
exports['default'] = ThemeConfig;
