'use client';

import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material";
import { FC, ReactNode } from "react";

const theme = createTheme();

interface ThemeProviderProps {
    children: ReactNode
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
    return (
        <MuiThemeProvider theme={theme}>
            {children}
        </MuiThemeProvider>
    );
}
