import { useState, useEffect } from "react";
import { IonCol, IonGrid, IonIcon, IonRow, IonSpinner } from "@ionic/react";
import { volumeHighOutline } from "ionicons/icons";
import "./MyScreen.css";

export interface IMyScreenProps {
  screenText: string;
  suggestions: any[];
  suggestionClicked: (suggestion: string) => any;
  onIconClicked: () => any;
  spacePressed: boolean;
}

export function MyScreen({
  screenText,
  suggestions,
  suggestionClicked,
  onIconClicked,
  spacePressed,
}: IMyScreenProps) {
  const [text, setText] = useState(screenText);
  useEffect(() => {
    setText(screenText);
  }, [screenText]);
  return (
    <IonGrid className="my-screen">
      <IonRow className="screen-row">
        <IonCol size="11" className="result">
          <span style={{ paddingRight: spacePressed ? "1.5rem" : "" }}>
            {text}
          </span>
        </IonCol>
        <IonCol size="1" className="actions" onClick={onIconClicked}>
          <IonIcon
            icon={volumeHighOutline}
            style={{
              fontSize: "3rem",
              backgroundColor: "lightyellow",
              borderRadius: "50%",
              padding: "0.8rem",
              border: "1px solid black",
            }}
          />
        </IonCol>
      </IonRow>
      <IonRow className="suggestions-row">
        {!suggestions.length && (
          <IonCol className="loadingIcon">
            <IonSpinner />
          </IonCol>
        )}
        {suggestions.map(({ suggestion }, index) => (
          <IonCol onClick={() => suggestionClicked(suggestion)} key={index}>
            <div>{suggestion.toUpperCase()}</div>
          </IonCol>
        ))}
      </IonRow>
    </IonGrid>
  );
}
