import { IonCol } from "@ionic/react";
import "./KeyLetter.css";

export interface IKeyLetterProps {
  handleClick: (e: any) => void;
  character: string;
  size?: string;
}

export function KeyLetter({ handleClick, character, size }: IKeyLetterProps) {
  return (
    <IonCol sizeLg={size} onClick={handleClick} className="key-letter">
      {character}
    </IonCol>
  );
}
