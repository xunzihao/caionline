import { useRef, useState, useEffect } from 'react';
import { alpha } from '@mui/material/styles';
import {
  Box,
  Divider,
  Typography,
  Stack,
  MenuItem,
  Avatar,
  IconButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
// components
import MenuPopover from './MenuPopover';

import { axios } from '../../helpers/axiosKit';
import Router from 'next/router';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import fetchJson, { FetchError } from '../../lib/fetchJson';
// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
    linkTo: '/'
  },
  {
    label: 'Profile',
    icon: 'eva:person-fill',
    linkTo: '/account'
  },
  {
    label: 'Settings',
    icon: 'eva:settings-2-fill',
    linkTo: '/settings'
  }
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const router = useRouter();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(null);
  const {
    isLoading,
    isFetching,
    isError,
    data
  } = useQuery(['/api/user'], async ({ queryKey }) => {
    let res = await fetch(queryKey);
    let data = await res.json();
    return data;
  });

  useEffect(() => {
    if (!isFetching && data && !data.isLoggedIn) { Router.push('/login'); }
  }, [data, isFetching]);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };
  const handleMenuItem = (e) => {
    setOpen(null);
    router.push(e);
  };
  const handleLogout = async () => {
    setOpen(null);
    try {
      fetchJson('/api/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      }).then(rtn => {
        delete axios.defaults.headers.common['Authorization'];
      });
    } catch (error) {
      if (error instanceof FetchError) {
        setErrorMsg(error.data.message);
      } else {
        console.error('An unexpected error happened:', error);
      }
    }
    router.replace('/login');
  };
  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: '\'\'',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8)
            }
          })
        }}
      >
        <Avatar src={data?.avatarUrl}
                alt="photoURL"/>
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75
          }
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2"
                      noWrap>
            {data?.login}
          </Typography>
          <Typography variant="body2"
                      sx={{ color: 'text.secondary' }}
                      noWrap>
            {data?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }}/>

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label}
                      to={option.linkTo}
                      icon={option.icon}
                      onClick={() => handleMenuItem(option.linkTo)}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }}/>

        <MenuItem onClick={handleLogout}
                  sx={{ m: 1 }}>
          <ListItemIcon>
            <LogoutIcon/>
          </ListItemIcon>
          <ListItemText>
            Logout
          </ListItemText>
        </MenuItem>
      </MenuPopover>
    </>
  );
}
