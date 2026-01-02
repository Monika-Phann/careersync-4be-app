import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
} from '@mui/material'
import {
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material'
import DashboardIcon from '../UI/Icons/DashboardIcon'
import CreateSessionIcon from '../UI/Icons/CreateSessionIcon'
import BookingManagementIcon from '../UI/Icons/BookingManagementIcon'
import UserManagementIcon from '../UI/Icons/UserManagementIcon'
import CertificationIcon from '../UI/Icons/CertificationIcon'
import PaymentEarningIcon from '../UI/Icons/PaymentEarningIcon'
import SettingIcon from '../UI/Icons/SettingIcon'
import { SidebarStyles } from './Sidebar.styles'

const menuItems = [
  {
    text: 'Dashboard',
    icon: <DashboardIcon />,
    path: '/',
  },
  {
    text: 'Mentor Sessions',
    icon: <CreateSessionIcon />,
    path: null,
    subItems: [
      { text: 'Session Profile', icon: null, path: '/session-profile' },
      { text: 'Session Schedule', icon: null, path: '/session-schedule' },
    ],
  },
  {
    text: 'Booking Management',
    icon: <BookingManagementIcon />,
    path: null,
    subItems: [
      { text: 'Total Bookings', icon: <BookingManagementIcon />, path: '/bookings' },
      { text: 'Total Booking Requests', icon: <BookingManagementIcon />, path: '/booking-requests' },
    ],
  },
  {
    text: 'User Management',
    icon: <UserManagementIcon />,
    path: '/users',
  },
  {
    text: 'Certification',
    icon: <CertificationIcon />,
    path: '/certification',
  },
  {
    text: 'Earning & Invoice',
    icon: <PaymentEarningIcon />,
    path: null,
    subItems: [
      { text: 'Earning Summary', icon: <PaymentEarningIcon />, path: '/earnings' },
      { text: 'Total Invoice', icon: <PaymentEarningIcon />, path: '/invoices' },
    ],
  },
  {
    text: 'Settings',
    icon: <SettingIcon />,
    path: '/settings',
  },
]

function Sidebar({
  variant = 'permanent',
  open = true,
  onClose,
  onNavigate,
  transitionDuration = 200,
}) {
  const navigate = useNavigate()
  const location = useLocation()
  const [openItems, setOpenItems] = useState({})

  const handleItemClick = (item) => {
    if (item.subItems) {
      setOpenItems((prev) => ({
        ...prev,
        [item.text]: !prev[item.text],
      }))
    } else if (item.path) {
      navigate(item.path)
      if (onNavigate) onNavigate()
    }
  }

  const isActive = (path) => {
    if (!path) return false
    return location.pathname === path
  }

  const isParentActive = (item) => {
    if (!item.subItems) return false
    return item.subItems.some((subItem) => isActive(subItem.path))
  }

  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onClose}
      transitionDuration={transitionDuration}
      ModalProps={{ keepMounted: true }}
      sx={SidebarStyles.drawer}
      PaperProps={{
        sx: {
          ...SidebarStyles.drawerPaper,
          position: variant === 'permanent' ? 'fixed' : 'relative',
        },
      }}
    >
      <Box sx={SidebarStyles.logoContainer}>
        <img 
          src="/logo/careersyncLogo.svg" 
          alt="CareerSync Logo" 
          style={{ width: '143px', height: 'auto' }}
        />
      </Box>
      <List sx={SidebarStyles.list}>
        {menuItems.map((item) => (
          <React.Fragment key={item.text}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => handleItemClick(item)}
                sx={{
                  ...SidebarStyles.listItemButton,
                  ...(isActive(item.path) || isParentActive(item)
                    ? SidebarStyles.activeItem
                    : {}),
                }}
              >
                <ListItemIcon
                  sx={{
                    ...SidebarStyles.listItemIcon,
                    ...(isActive(item.path) || isParentActive(item)
                      ? SidebarStyles.activeIcon
                      : {}),
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    ...SidebarStyles.listItemText,
                    ...(isActive(item.path) || isParentActive(item)
                      ? SidebarStyles.activeText
                      : {}),
                  }}
                />
                {item.subItems &&
                  (openItems[item.text] ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>
            </ListItem>
            {item.subItems && (
              <Collapse in={openItems[item.text]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.subItems.map((subItem) => (
                    <ListItem key={subItem.text} disablePadding>
                      <ListItemButton
                        onClick={() => {
                          navigate(subItem.path)
                          if (onNavigate) onNavigate()
                        }}
                        sx={{
                          ...SidebarStyles.subItemButton,
                          ...(isActive(subItem.path)
                            ? SidebarStyles.activeSubItem
                            : {}),
                        }}
                      >
                        {subItem.icon && (
                          <ListItemIcon sx={SidebarStyles.subItemIcon}>
                            {subItem.icon}
                          </ListItemIcon>
                        )}
                        <ListItemText
                          primary={subItem.text}
                          sx={SidebarStyles.subItemText}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  )
}

export default Sidebar

