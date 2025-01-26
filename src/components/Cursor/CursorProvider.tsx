import { createContext, useContext, useState } from 'react';
import FollowCursor from './FollowCursor';
import SplashCursor from './SplashCursor';

export type CursorType = 'follow' | 'splash';

export const CursorContext = createContext<{
  insets:
    | {
        height: number;
        width: number;
        top: number;
        left: number;
        borderRadius?: string;
      }
    | undefined;
  setCursorType: (type: CursorType) => void;
  setCursorInsets: (
    args:
      | {
          height: number;
          width: number;
          top: number;
          left: number;
          borderRadius?: string;
        }
      | undefined,
  ) => void;
}>({
  insets: undefined,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCursorType: (type: CursorType) => {},
  setCursorInsets: (
    args:
      | {
          height: number;
          width: number;
          top: number;
          left: number;
          borderRadius?: string;
        }
      | undefined,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  ) => {},
});

const CursorProvider = ({ children }: { children: React.ReactNode }) => {
  const [cursorType, setCursorTypeState] = useState<CursorType>('follow');
  const [insets, setCursorSize] = useState<
    | {
        height: number;
        width: number;
        top: number;
        left: number;
        borderRadius?: string;
      }
    | undefined
  >(undefined);

  const setCursorType = (type: CursorType) => {
    setCursorTypeState(type);
  };

  const setCursorInsets = (
    args:
      | {
          height: number;
          width: number;
          top: number;
          left: number;
        }
      | undefined,
  ) => {
    setCursorSize(args);
  };

  return (
    <CursorContext.Provider
      value={{
        insets,
        setCursorType,
        setCursorInsets,
      }}
    >
      {cursorType === 'splash' ? <SplashCursor /> : <FollowCursor />}
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (context === undefined) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
};

export default CursorProvider;
