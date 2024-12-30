import {
  createContext,
  useContext,
  ComponentProps,
  useState,
  useCallback,
  useMemo,
} from 'react';

import { createPortal } from 'react-dom';

import Alert from '@/components/shared/Alert';

type AlertProps = ComponentProps<typeof Alert>;
type AlertOptions = Omit<AlertProps, 'open'>;

interface IAlertContextVale {
  open: (options: AlertOptions) => void;
}

const Context = createContext<IAlertContextVale | undefined>(undefined);

const defaultValue: AlertProps = {
  open: false,
  title: null,
  description: null,
  onButtonClick: () => {},
};

export function AlertContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [alertState, setAlertState] = useState(defaultValue);

  const $root_portal = document.getElementById('root-portal');

  const close = useCallback(() => {
    setAlertState(defaultValue);
  }, []);

  const open = useCallback(({ onButtonClick, ...options }: AlertOptions) => {
    setAlertState({
      ...options,
      onButtonClick: () => {
        close();
        onButtonClick();
      },
      open: true,
    });
  }, []);

  const values = useMemo(() => ({ open }), [open]);

  return (
    <Context.Provider value={values}>
      {children}
      {$root_portal && createPortal(<Alert {...alertState} />, $root_portal)}
    </Context.Provider>
  );
}

export const useAlertContext = () => {
  const values = useContext(Context);

  if (!values) {
    throw new Error('AlertContextP 내부에서 사용해주세요.');
  }

  return values;
};
