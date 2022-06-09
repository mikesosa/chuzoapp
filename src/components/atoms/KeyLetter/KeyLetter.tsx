import { IonCol } from "@ionic/react";
import "./KeyLetter.css";

export interface IKeyLetterProps {
  handleClick: (e: any) => void;
  character: string;
  size?: string;
  className?: string;
}

export function KeyLetter({
  handleClick,
  character,
  size,
  className,
}: IKeyLetterProps) {
  return (
    <IonCol
      sizeLg={size}
      onClick={handleClick}
      className={`key-letter ${className}`}
    >
      <div>{character}</div>
    </IonCol>
  );
}
