import { Button, Modal } from "react-bootstrap";
import { useModal } from "../context/ModalContext";
import { deleteFilme } from "../services/api";
import { message } from "antd";
import { useCallback } from "react";

export const ModalExcluir = () => {
  const { setModalExcluirVisible, modalExcluirVisible, dataSource, setDataSource, selectedFilme } = useModal();
  const [messageApi, contextHolder] = message.useMessage();

  const handleDeleteFilme = useCallback(async () => {
      if (!selectedFilme) return;
      try {
        await deleteFilme(selectedFilme.id);
        setDataSource(dataSource.filter((filme) => filme.id !== selectedFilme.id));
      } catch (error) {
        messageApi.open({
          type: 'error',
          content: 'Erro ao excluir filme',
        });
        console.log(error);
      } finally {
        messageApi.open({
          type: 'success',
          content: 'Filme excluído com sucesso',
        });
        setModalExcluirVisible(false);
      }
    }, [selectedFilme, setDataSource, dataSource, setModalExcluirVisible, messageApi]);

  return (
    <>
    {contextHolder}
    <Modal
      show={modalExcluirVisible}
      onHide={() => setModalExcluirVisible(false)}
    >
      <Modal.Header>
        <Modal.Title>Excluir Filme</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Tem certeza que deseja excluir o filme "{selectedFilme?.nome}"?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button title="Cancelar" onClick={() => setModalExcluirVisible(false)}>
          Cancelar
        </Button>
        <Button title="Excluir" onClick={handleDeleteFilme} variant="danger">
          Excluir
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  );
};
