import { Button, Form, Modal } from "react-bootstrap";
import { useModal } from "../context/ModalContext";
import { useState } from "react";

export const ModalAdicionar = () => {
  const { setModalVisible, modalVisible, dataSource, setDataSource } = useModal();
  const [formData, setFormData] = useState({
    nome: "",
    nota: "",
    ano: "",
    foto: "",
  });

  return (
    <Modal show={modalVisible} onHide={() => setModalVisible(false)}>
      <Form >
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Novo Filme</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nome do Filme</Form.Label>
            <Form.Control
              type="text"
              name="nome"
              value={formData.nome}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nota (0 a 10)</Form.Label>
            <Form.Control
              type="number"
              name="nota"
              value={formData.nota}
              min="0"
              max="10"
              step="0.1"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Ano</Form.Label>
            <Form.Control
              type="number"
              name="ano"
              value={formData.ano}
              min="1900"
              max="2100"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Foto do Filme</Form.Label>
            <Form.Control
              type="file"
              name="foto"
              accept="image/*"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalVisible(false)}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            Salvar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
