import { merge } from 'lodash';
import { Card } from './Card';
import { Lists } from './Lists';
import { Paper } from './Paper';
import { Input } from './Input';
import { Button } from './Button';
import { Tooltip } from './Tooltip';
import { Backdrop } from './Backdrop';
import { Typography } from './Typography';
import { IconButton } from './IconButton';
import { Autocomplete } from './Autocomplete';
import { Theme } from '@mui/material';
import { ToggleButton, ToggleButtonGroup } from './ToggleButton';

// ----------------------------------------------------------------------

export function ComponentsOverrides(theme: Theme) {
  return merge(
    Card(theme),
    Lists(theme),
    Paper(theme),
    Input(theme),
    Button(theme),
    Tooltip(theme),
    Backdrop(theme),
    Typography(theme),
    IconButton(theme),
    Autocomplete(theme),
    ToggleButton(theme),
    ToggleButtonGroup(theme)
  );
}
