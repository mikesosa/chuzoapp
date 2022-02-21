import { IonCol, IonGrid, IonIcon, IonRow } from "@ionic/react";
import { Blinker } from "../../atoms";
import { send } from "ionicons/icons";

import "./MyScreen.css";

export interface IMyScreenProps {
  screenText: string;
  suggestions: any[];
  suggestionClicked: (suggestion: string) => any;
}

export function MyScreen({
  screenText,
  suggestions,
  suggestionClicked,
}: IMyScreenProps) {
  return (
    <IonGrid className="my-screen">
      <div className="screen-row">
        <div className="result">
          <Blinker />
          {screenText}
        </div>
        <div className="actions">
          <IonIcon icon={send}></IonIcon>
        </div>
      </div>
      <IonRow className="suggestions-row">
        {suggestions.map(({ suggestion }, index) => (
          <IonCol onClick={() => suggestionClicked(suggestion)} key={index}>
            <div>{suggestion.toUpperCase()}</div>
          </IonCol>
        ))}
      </IonRow>
    </IonGrid>
  );
}
