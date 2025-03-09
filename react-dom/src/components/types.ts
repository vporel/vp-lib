import { BoxProps, SxProps, Theme } from "@mui/material";
import { ElementType, ReactNode } from "react";


export type CustomBoxProps<C extends ElementType = 'div'> = Omit<BoxProps<C>, "sx"> & {
  children?: ReactNode;
  component?: C,
  sx?: SxProps<Theme>
};