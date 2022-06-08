import { IonCol, IonGrid, IonIcon, IonRow, IonSpinner } from "@ionic/react";
import { Blinker } from "../../atoms";
import { send } from "ionicons/icons";

import "./MyScreen.css";

export interface IMyScreenProps {
  screenText: string;
  suggestions: any[];
  suggestionClicked: (suggestion: string) => any;
  onSend: () => any;
  loading: boolean;
}

export function MyScreen({
  screenText,
  suggestions,
  suggestionClicked,
  onSend,
  loading,
}: IMyScreenProps) {
  return (
    <IonGrid className="my-screen">
      <div className="screen-row">
        <div className="result">
          <Blinker />
          {screenText}
        </div>
        <div className={`actions ${loading ? "disabled" : "active"}`}>
          {loading ? (
            <IonSpinner />
          ) : (
            <IonIcon icon={send} onClick={onSend}></IonIcon>
          )}
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
