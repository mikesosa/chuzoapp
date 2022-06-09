import { IonCol, IonGrid, IonIcon, IonRow } from "@ionic/react";
import { Blinker } from "../../atoms";
import { volumeHighOutline } from "ionicons/icons";

import "./MyScreen.css";

export interface IMyScreenProps {
  screenText: string;
  suggestions: any[];
  suggestionClicked: (suggestion: string) => any;
  onIconClicked: () => any;
}

export function MyScreen({
  screenText,
  suggestions,
  suggestionClicked,
  onIconClicked,
}: IMyScreenProps) {
  return (
    <IonGrid className="my-screen">
      <div className="screen-row">
        <div className="result">
          <Blinker />
          {screenText}
        </div>
        <div className="actions">
          <IonIcon
            icon={volumeHighOutline}
            onClick={onIconClicked}
            style={{ fontSize: "5rem" }}
          />
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
