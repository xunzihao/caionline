import PropTypes from 'prop-types';
import 'simplebar/src/simplebar.css';
import styled from '@emotion/styled';
import { AppBar, Avatar, Badge, Box, IconButton, Toolbar, Tooltip, Stack } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Users as UsersIcon } from '../icons/users';
import AccountPopover from './navbar/AccountPopover';
import NotificationsPopover from './navbar/NotificationsPopover';
import Searchbar from './navbar/Searchbar';

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3]
}));

export const DashboardNavbar = (props) => {
  const { onSidebarOpen, ...other } = props;

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280
          },
          width: {
            lg: 'calc(100% - 280px)'
          }
        }}
        {...other}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: 'inline-flex',
                lg: 'none'
              }
            }}
          >
            <MenuIcon fontSize="small"/>
          </IconButton>
          <Searchbar/>
          <Box sx={{ flexGrow: 1 }}/>
          <IconButton sx={{ ml: 1 }}>
            <UsersIcon fontSize="small"/>
          </IconButton>
          <Box sx={{ ml: 1 }}>
            <NotificationsPopover/>
          </Box>
          <Box sx={{ ml: 1 }}>
            <AccountPopover/>
          </Box>
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func
};
