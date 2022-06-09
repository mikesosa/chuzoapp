import { IonRow } from "@ionic/react";
import { KeyLetter } from "../../atoms";
import "./BoardRow.css";

export interface IBoardRowProps {
  characters: any[];
}

export function BoardRow({ characters }: IBoardRowProps) {
  return (
    <IonRow className="board-row">
      {characters.map(({ key, handleClick, size, className }) => (
        <KeyLetter
          size={size}
          className={className}
          key={key}
          character={key}
          handleClick={() => handleClick(key)}
        />
      ))}
    </IonRow>
  );
}
