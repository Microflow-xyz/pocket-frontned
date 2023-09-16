'use client';
import { useState } from 'react';

import { Drawer, DrawerProps, styled, SxProps, Theme } from '@mui/material';

import { DrawerContent } from '@/components/navigation-drawer/DrawerContent';
import { PoktLogo } from '@/components/navigation-drawer/PoktLogo';

interface StyledDrawerProps extends DrawerProps {
  width?: number | string;
  sx?: SxProps<Theme>;
}

const StyledDrawer = styled(Drawer)<StyledDrawerProps>`
  display: ${({ variant }) => (variant === 'temporary' ? 'block' : 'none')};

  ${({ theme }) => theme.breakpoints.up('sm')} {
    display: ${({ variant }) => (variant === 'temporary' ? 'none' : 'block')};
  }

  & .MuiDrawer-paper {
    box-sizing: border-box;
    background-color: ${({ theme }) => theme.palette.surfaceContainerLow.main};
    width: ${({ width }) => width + 'px'};
    border: none;
    border-bottom-right-radius: 1rem;
    border-top-right-radius: 1rem;
  }
`;

interface NavigationDrawerProps {
  width: number;
}

export const NavigationDrawer = ({ width }: NavigationDrawerProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <nav>
      {/* Desktop Version */}
      <StyledDrawer variant="permanent" width={width} open>
        <PoktLogo />
        <DrawerContent />
      </StyledDrawer>
      {/* Small/Medium Screen Version */}
      <StyledDrawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        width={width}
      >
        <DrawerContent />
      </StyledDrawer>
    </nav>
  );
};
