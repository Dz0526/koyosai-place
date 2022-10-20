import { FormUiContext } from 'context/FormUiContext';
import { useContext } from 'react';

export const useFormUi = () => {
  const context = useContext(FormUiContext);

  return {
    isFocusSearchInput: context.isFocusSearchInput,
    setIsFocusSearchInput: context.setIsFocusSearchInput,
    isMouseOverSuggestion: context.isMouseOverSuggestion,
    setIsMouseOverSuggestion: context.setIsMouseOverSuggestion,
  };
};
