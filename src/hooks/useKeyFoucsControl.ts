import { KeyboardEvent, useRef } from 'react';

// tabIndex を使った実装でもいいかも。抽象のことを考えたときに汎用がなくなるかも？
export const useKeyFoucsControl = () => {
  const refs = useRef<Array<{ index: number; e: HTMLLIElement }>>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  return {
    inputRef: inputRef,
    focusToFirst: () => {
      refs.current.find(ref => ref.index == 0)?.e.focus();
    },
    register: (index: number) => ({
      onKeyDown(e: KeyboardEvent<HTMLLIElement>) {
        if (e.key == 'ArrowDown') {
          e.preventDefault();
          const sortElement = refs.current.sort((a, b) => a.index - b.index);
          const nextElement = sortElement[index + 1];
          if (nextElement) nextElement.e.focus({ preventScroll: true });
        } else if (e.key == 'ArrowUp') {
          e.preventDefault();
          if (index == 0) inputRef.current?.focus();
          const sortElement = refs.current.sort((a, b) => a.index - b.index);
          if (index - 1 < 0) return;
          const nextElement = sortElement[index - 1];
          nextElement.e.focus({ preventScroll: true });
        }
        return;
      },
      ref(element: HTMLLIElement | null) {
        if (element) refs.current.push({ index: index, e: element });
        else {
          if (refs.current.length == 1) refs.current.pop();
          refs.current.sort((a, b) => a.index - b.index).splice(index, 1);
        }
      },
    }),
  };
};
