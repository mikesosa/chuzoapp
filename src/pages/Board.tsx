import { IonIcon, IonPage } from "@ionic/react";
import { TextToSpeechAdvanced } from "@awesome-cordova-plugins/text-to-speech-advanced";
import { SocialSharing } from "@awesome-cordova-plugins/social-sharing";
import { debounce } from "lodash";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { TextContext } from "../contexts";
import { Keyboard, MyScreen } from "../components/organisms";
import { PUSH_URL, PUSH_TOKEN, PUSH_USER } from "../utils/constants";
import "./Board.css";
import { backspaceOutline, shareOutline } from "ionicons/icons";

const Board: React.FC = () => {
  const [screenText, setScreenText] = useState("");
  const [suggestionClicked, setSuggestionClicked] = useState(false);
  const { getSuggestions, suggestions, setSuggestions } =
    useContext(TextContext);

  const sendNotification = async (msg: string) => {
    await axios
      .post(PUSH_URL, {
        token: PUSH_TOKEN,
        user: PUSH_USER,
        message: msg,
      })
      .then((res: any) => {
        console.log("Notification sent: ", res.data);
      })
      .catch((err: any) => {
        console.log("Error at sendNotification: ", err);
      });
  };

  const handleSpeech = (text: string) => {
    TextToSpeechAdvanced.speak({
      text: text.toLocaleLowerCase(),
      locale: "en-US",
      identifier: "com.apple.ttsbundle.Samantha-compact",
    });
  };

  const handleClick = (letter: string) => {
    setSuggestionClicked(false);
    setScreenText(screenText + letter);
    handleSpeech(letter);
  };

  const debouncedSearch = useRef(
    debounce(async (criteria) => {
      await handleSearch(criteria);
    }, 700)
  ).current;

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  useEffect(() => {
    if (screenText) debouncedSearch(screenText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenText]);

  // Get suggestions for the first time
  useEffect(() => {
    if (!suggestions.length) debouncedSearch("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [suggestions]);

  const handleErase = () => {
    setScreenText("");
    setSuggestions([]);
  };

  const handleBackSpace = () => setScreenText(screenText.slice(0, -1));

  const handleSearch = async (criteria: string) => {
    const left = criteria.slice(0, -1).toLocaleLowerCase();
    const prefix = criteria.slice(-1).toLocaleLowerCase();
    try {
      await getSuggestions(left, prefix);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAcceptSuggestion = (word: string) => {
    if (word.charAt(0) === screenText.slice(-1) && !suggestionClicked) {
      setScreenText(screenText.slice(0, -1) + word);
    } else {
      setScreenText(screenText + " " + word + " ");
    }
    handleSpeech(word);
  };

  const handleSpace = () => {
    const screenLastLetter = screenText.slice(-1).toLocaleLowerCase();
    if (screenLastLetter !== " ") {
      handleClick("\0 ");
    }
  };

  const KEYBOARD_CHARACTERS = [
    [
      { key: "Q", handleClick: () => handleClick("Q") },
      { key: "W", handleClick: () => handleClick("W") },
      { key: "E", handleClick: () => handleClick("E") },
      { key: "R", handleClick: () => handleClick("R") },
      { key: "T", handleClick: () => handleClick("T") },
      { key: "Y", handleClick: () => handleClick("Y") },
      { key: "U", handleClick: () => handleClick("U") },
      { key: "I", handleClick: () => handleClick("I") },
      { key: "O", handleClick: () => handleClick("O") },
      { key: "P", handleClick: () => handleClick("P") },
    ],
    [
      { key: "A", handleClick: () => handleClick("A") },
      { key: "S", handleClick: () => handleClick("S") },
      { key: "D", handleClick: () => handleClick("D") },
      { key: "F", handleClick: () => handleClick("F") },
      { key: "G", handleClick: () => handleClick("G") },
      { key: "H", handleClick: () => handleClick("H") },
      { key: "J", handleClick: () => handleClick("J") },
      { key: "K", handleClick: () => handleClick("K") },
      { key: "L", handleClick: () => handleClick("L") },
    ],
    [
      { key: "Z", handleClick: () => handleClick("Z") },
      { key: "X", handleClick: () => handleClick("X") },
      { key: "C", handleClick: () => handleClick("C") },
      { key: "V", handleClick: () => handleClick("V") },
      { key: "B", handleClick: () => handleClick("B") },
      { key: "N", handleClick: () => handleClick("N") },
      { key: "M", handleClick: () => handleClick("M") },
      {
        key: (
          <IonIcon
            icon={backspaceOutline}
            style={{ fontSize: "8rem" }}
          ></IonIcon>
        ),
        handleClick: () => handleBackSpace(),
      },
    ],
    [
      {
        key: "CLEAR",
        handleClick: () => handleErase(),
        size: "3",
        className: "clearBtn",
      },
      {
        key: "SPACE",
        handleClick: () => handleSpace(),
        size: "6",
        className: "spaceBtn",
      },
      { key: ",", handleClick: () => handleClick(","), size: "1" },
      { key: ".", handleClick: () => handleClick("."), size: "1" },
      {
        key: (
          <IonIcon icon={shareOutline} style={{ fontSize: "3rem" }}></IonIcon>
        ),
        handleClick: () => handleShare(),
        size: "1",
        className: "shareBtn",
      },
    ],
  ];

  const handleShare = async () => {
    await SocialSharing.share(screenText);
    await sendNotification(screenText);
  };

  return (
    <IonPage className="board-page">
      <MyScreen
        onIconClicked={() => handleSpeech(screenText)}
        screenText={screenText}
        suggestions={suggestions}
        suggestionClicked={(selection) => {
          setSuggestionClicked(true);
          handleAcceptSuggestion(selection.toUpperCase());
        }}
      />
      <Keyboard boardCharacters={KEYBOARD_CHARACTERS} />
    </IonPage>
  );
};

export default Board;
