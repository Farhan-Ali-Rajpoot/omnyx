import { CSSProperties, forwardRef, HTMLProps, SVGProps } from "react";
import { diamondCircleIcon } from "./svgs/diomondCircle";
import appNameTextSVG from "./svgs/appNameText";
import radialDashCircle from "./svgs/radialDash";
import worldMap from "./svgs/world-map";




export interface CustomIconProps extends HTMLProps<SVGSVGElement> {
  pathClassName?: string;
}


export const AppNameTextSVG = appNameTextSVG;
export const AppIconJSX = diamondCircleIcon;
export const RadialDashCircle = radialDashCircle;
export const WorldMap = worldMap;
