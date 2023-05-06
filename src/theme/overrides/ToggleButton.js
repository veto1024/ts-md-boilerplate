// ----------------------------------------------------------------------

export function ToggleButton(theme) {
  return {
    MuiToggleButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: theme.palette.success.main,
            color: theme.palette.success.contrastText
          },
          '&:not(.Mui-selected)': {
            backgroundColor: theme.palette.info.main,
            color: theme.palette.info.contrastText
          },
          '&.Mui-selected:hover': {
            backgroundColor: theme.palette.success.main
          }
        }
      }
    }
  };
}

export function ToggleButtonGroup(theme) {
  return {
    MuiToggleButtonGroup: {
      styleOverrides: {
        grouped: {
          '&:not(:first-of-type)': {
            marginTop: '12px',
            border: '1px solid rgba(0, 0, 0, 1)',
            borderRadius: '12px'
          },
          '&:not(:last-of-type)': {
            marginTop: '12px',
            border: '2px solid rgba(0, 0, 0, 1)',
            borderRadius: '12px'
          }
        }
      }
    }
  };
}
