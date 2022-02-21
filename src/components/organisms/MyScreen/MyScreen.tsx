import { IonIcon } from "@ionic/react";
import { Blinker, Tooltip } from "../../atoms";
import { send } from "ionicons/icons";

import "./MyScreen.css";

export interface IMyScreenProps {
  screenText: string;
  suggestions: any[];
}

export function MyScreen({ screenText, suggestions }: IMyScreenProps) {
  return (
    <div className="my-screen">
      <div className="tooltip">
        <span>{screenText}</span>
        <Blinker />
        <Tooltip text={suggestions[0]?.suggestion.toUpperCase()} />
      </div>
      <div className="actions">
        <IonIcon icon={send}></IonIcon>
      </div>
    </div>
  );
}
