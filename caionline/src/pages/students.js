import * as React from 'react';
import { Stack } from '@mui/material';
import { Button } from '@mui/material';
export default function BasicButtons(){
  return(
    <Stack>
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
    </Stack>
  )
}

