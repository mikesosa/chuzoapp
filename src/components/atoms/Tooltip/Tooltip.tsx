import "./Tooltip.css";

export interface ITooltipProps {
  text: string;
}

export function Tooltip({ text }: ITooltipProps) {
  return <div className="tooltipText">{text}</div>;
}
