import { IonPage } from "@ionic/react";
import { debounce } from "lodash";
import { useContext, useEffect, useRef, useState } from "react";
import { TextContext } from "../contexts";
import "./Board.css";

import { Keyboard, MyScreen } from "../components/organisms";

const Board: React.FC = () => {
  const [screenText, setScreenText] = useState("");
  const { getSuggestions, suggestions, setSuggestions } =
    useContext(TextContext);

  const handleClick = (letter: string) => {
    setScreenText(screenText + letter);
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

  const handleAcceptSuggestion = () => {
    // Check if first letter of suggestion is the same as the last letter of the screen text
    const suggestion = suggestions[0].suggestion;
    const suggestionFirstLetter = suggestion.slice(0, 1).toLocaleLowerCase();
    const screenLastLetter = screenText.slice(-1).toLocaleLowerCase();
    // If so, then we can assume that the user is trying to type the whole word
    if (suggestionFirstLetter === screenLastLetter) {
      setScreenText(screenText.slice(0, -1) + suggestion.toUpperCase());
    } else {
      setScreenText(screenText + suggestion.toUpperCase());
    }

    setSuggestions([]);
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
      { key: "⬅️", handleClick: () => handleBackSpace() },
    ],
    [
      { key: "🔴", handleClick: () => handleErase(), size: "3" },
      { key: "_", handleClick: () => handleSpace(), size: "6" },
      { key: "✅", handleClick: () => handleAcceptSuggestion(), size: "3" },
    ],
  ];

  return (
    <IonPage className="board-page">
      <MyScreen
        screenText={screenText}
        suggestions={suggestions}
        suggestionClicked={(selection) => handleClick(selection.toUpperCase())}
      />
      <Keyboard boardCharacters={KEYBOARD_CHARACTERS} />
    </IonPage>
  );
};

export default Board;
