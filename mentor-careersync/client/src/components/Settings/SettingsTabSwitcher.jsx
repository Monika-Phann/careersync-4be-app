import React from 'react'
import { Box, Typography } from '@mui/material'
import { PersonOutline, LockOutlined } from '@mui/icons-material'
import { SettingsTabSwitcherStyles } from './SettingsTabSwitcher.styles'

function SettingsTabSwitcher({ activeTab, onTabChange }) {
  const tabs = [
    {
      id: 'profile',
      label: 'Profile',
      icon: PersonOutline,
    },
    {
      id: 'security',
      label: 'Security',
      icon: LockOutlined,
    },
  ]

  return (
    <Box sx={SettingsTabSwitcherStyles.container}>
      {tabs.map((tab) => {
        const IconComponent = tab.icon
        const isActive = activeTab === tab.id

        return (
          <Box
            key={tab.id}
            sx={{
              ...SettingsTabSwitcherStyles.tab,
              ...(isActive ? SettingsTabSwitcherStyles.tabActive : {}),
            }}
            onClick={() => onTabChange(tab.id)}
          >
            <IconComponent
              sx={{
                ...SettingsTabSwitcherStyles.icon,
                ...(isActive ? SettingsTabSwitcherStyles.iconActive : {}),
              }}
            />
            <Typography
              sx={{
                ...SettingsTabSwitcherStyles.label,
                ...(isActive ? SettingsTabSwitcherStyles.labelActive : {}),
              }}
            >
              {tab.label}
            </Typography>
          </Box>
        )
      })}
    </Box>
  )
}

export default SettingsTabSwitcher

