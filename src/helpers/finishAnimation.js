import { useContext } from "react";
import { context } from "../context/context";

const calculateAccuracy = () => {
  const wrongCount = Array.from(document.querySelectorAll(".wrong")).length;
  const charCount = Array.from(document.querySelectorAll(".character")).length;

  return Math.ceil(((charCount - wrongCount) / charCount) * 100 * 10) / 10;
};

const calculateWrongCharacters = () => {
  const wrongCount = Array.from(document.querySelectorAll(".wrong")).length;
  return wrongCount;
};

export const finishAnimation = (state, setState, gamemode) => {
  const accuracy = calculateAccuracy();
  const wrongCharacters = calculateWrongCharacters();

  const defaultFinish = () => {
    const timer1 = setTimeout(() => {
      setState({ ...state, setting: true, caretHidden: true });
      const timer2 = setTimeout(() => {
        // set as finished to show results page
        setState({
          ...state,
          setting: false,
          finished: true,
          caretHidden: true,
          accuracy: accuracy,
          wrongCharacters: wrongCharacters
        });
        return clearTimeout(timer2);
      }, 150);
      return clearTimeout(timer1);
    }, 600);
  };

  const quoteFinish = () => {
    const timer1 = setTimeout(() => {
      setState({ ...state, quoteFinished: true, caretHidden: true });
      const timer2 = setTimeout(() => {
        defaultFinish();
        return clearTimeout(timer2);
      }, 800);
      return clearTimeout(timer1);
    }, 400);
  };

  switch (gamemode) {
    case "quotes": {
      quoteFinish();
      break;
    }
    default:
      defaultFinish();
  }
};
