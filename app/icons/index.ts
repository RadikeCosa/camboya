export { default as HomeIcon } from "./HomeIcon";
export { default as DocumentIcon } from "./DocumentIcon";
export { default as DocumentChartIcon } from "./DocumentChartIcon";
export { default as BarChartIcon } from "./BarChartIcon";
export { default as ArrowIcon } from "./ArrowIcon";

// Common icon props type
export interface IconProps {
  className?: string;
}

// Icon component type for use in navigation config
export type IconComponent = React.ComponentType<IconProps>;
