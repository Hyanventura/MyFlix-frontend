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
  openModalExcluir: (filme: Filme) => void;
  setModalExcluirVisible: Dispatch<SetStateAction<boolean>>;
  modalExcluirVisible: boolean;
  setDataSource: Dispatch<SetStateAction<Filme[]>>;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  dataSource: Filme[];
  modalVisible: boolean;
  selectedFilme: Filme | null;
  setSelectedFilme: Dispatch<SetStateAction<Filme | null>>;
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  openModalEditar: (filme: Filme) => void;
};

const Context = createContext<ContextType>({} as ContextType);

export const useModal = () => useContext(Context);

export const ModalProvider = ({ children }) => {
  const [dataSource, setDataSource] = useState<Filme[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalExcluirVisible, setModalExcluirVisible] = useState(false);
  const [selectedFilme, setSelectedFilme] = useState<Filme | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const openModalExcluir = (filme: Filme) => {
    setSelectedFilme(filme);
    setModalExcluirVisible(true);
  };

  const openModalEditar = (filme: Filme) => {
    setSelectedFilme(filme);
    setIsEditing(true);
    setModalVisible(true);
  };

  return (
    <Context.Provider
      value={{
        setDataSource,
        setModalVisible,
        dataSource,
        modalVisible,
        openModalExcluir,
        setModalExcluirVisible,
        modalExcluirVisible,
        selectedFilme,
        setSelectedFilme,
        isEditing,
        setIsEditing: () => {},
        openModalEditar,
      }}
    >
      {children}
    </Context.Provider>
  );
};
