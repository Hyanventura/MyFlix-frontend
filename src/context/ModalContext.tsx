// src/context/ModalContext.jsx
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

export type Filme = {
  id: number;
  nome: string;
  nota: number;
  ano: number;
  foto: string;
};

type ContextType = {
  openModal: (data: Filme[]) => void;
  openModalExcluir: () => void;
  setModalExcluirVisible: Dispatch<SetStateAction<boolean>>;
  modalExcluirVisible: boolean;
  closeModal: () => void;
  setDataSource: Dispatch<SetStateAction<Filme[]>>;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  dataSource: Filme[];
  modalVisible: boolean;
};

const Context = createContext<ContextType>({} as ContextType);

export const useModal = () => useContext(Context);

export const ModalProvider = ({ children }) => {
  const [dataSource, setDataSource] = useState<Filme[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalExcluirVisible, setModalExcluirVisible] = useState(false);

  const openModalExcluir = () => {
    setModalExcluirVisible(true);
  };

  const openModal = (content: Filme[]) => {
    setDataSource(content);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setDataSource([]);
  };

  return (
    <Context.Provider
      value={{
        openModal,
        closeModal,
        setDataSource,
        setModalVisible,
        dataSource,
        modalVisible,
        openModalExcluir,
        setModalExcluirVisible,
        modalExcluirVisible,
      }}
    >
      {children}
    </Context.Provider>
  );
};
