import { Button, Modal } from "react-bootstrap";
import { useModal } from "../context/ModalContext";

export const ModalExcluir = () => {
  const { setModalExcluirVisible, modalExcluirVisible } = useModal();

  const handleDeleteFilme = () => {
    try {
      console.log("bla");
    } catch (error) {
      console.log(error);
    } finally {
      setModalExcluirVisible(false);
    }
  };

  return (
    <Modal
      show={modalExcluirVisible}
      onHide={() => setModalExcluirVisible(false)}
    >
      <Modal.Header>
        <Modal.Title>Excluir Filme</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Tem certeza que deseja excluir este filme?</p>
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
  );
};
