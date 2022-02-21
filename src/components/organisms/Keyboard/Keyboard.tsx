import { IonGrid } from "@ionic/react";
import { BoardRow } from "../../molecules";
import "./Keyboard.css";

export interface IKeyboardProps {
  boardCharacters: any[][];
}

export function Keyboard({ boardCharacters }: IKeyboardProps) {
  return (
    <IonGrid className="board-grid">
      {boardCharacters.map((row: any, index: number) => (
        <BoardRow key={index} characters={row} />
      ))}
    </IonGrid>
  );
}
