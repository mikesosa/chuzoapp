import React, { useState } from "react";
import { API_SENTENCE_LIKELY } from "../utils/constants";
import axios from "axios";

export const TextContext = React.createContext("" as any);

export interface ITextContextProviderProps {
  children: any;
}

export function TextContextProvider({ children }: ITextContextProviderProps) {
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const getSuggestions = async (left: string, prefix: string) => {
    setLoadingSuggestions(true);
    try {
      const response: any = await axios.get(
        `${API_SENTENCE_LIKELY}${left}&prefix=${prefix}`
      );
      const results = response?.data?.futures.map((future: any) => {
        return { suggestion: future.next, predictions: future.predictions };
      });
      setSuggestions(results);
      setLoadingSuggestions(false);
    } catch (error) {
      setLoadingSuggestions(false);
    }
  };

  return (
    <TextContext.Provider
      value={
        {
          getSuggestions,
          loadingSuggestions,
          suggestions,
          setSuggestions,
        } as any
      }
    >
      {children}
    </TextContext.Provider>
  );
}
