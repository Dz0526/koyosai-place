import {
  SetStateAction,
  Dispatch,
  createContext,
  useState,
  ReactNode,
} from 'react';

type Props = {
  children: ReactNode;
};

type FormUiContextState = {
  isFocusSearchInput: boolean;
  setIsFocusSearchInput: Dispatch<SetStateAction<boolean>>;
  isMouseOverSuggestion: boolean;
  setIsMouseOverSuggestion: Dispatch<SetStateAction<boolean>>;
};

export const FormUiContext = createContext<FormUiContextState>({
  isFocusSearchInput: false,
  setIsFocusSearchInput: () => null,
  isMouseOverSuggestion: false,
  setIsMouseOverSuggestion: () => null,
});

export const FormUiContextProvider = ({ children }: Props) => {
  const [isFocusSearchInput, setIsFocusSearchInput] = useState(false);
  const [isMouseOverSuggestion, setIsMouseOverSuggestion] = useState(false);

  return (
    <FormUiContext.Provider
      value={{
        isFocusSearchInput: isFocusSearchInput,
        setIsFocusSearchInput: setIsFocusSearchInput,
        isMouseOverSuggestion,
        setIsMouseOverSuggestion,
      }}
    >
      {children}
    </FormUiContext.Provider>
  );
};
