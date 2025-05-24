import { Button, Form, Modal } from "react-bootstrap";
import { Filme, useModal } from "../context/ModalContext";
import { useState, useEffect, useCallback } from "react";
import { createFilme, updateFilme } from "../services/api";
import { message } from "antd";

export const ModalAdicionar = () => {
  const { setModalVisible, modalVisible, dataSource, setDataSource, selectedFilme } = useModal();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    nota: "",
    ano: "",
    foto: "",
  });
  
  // Usar useEffect para atualizar o formulário quando selectedFilme mudar
  useEffect(() => {
    if (selectedFilme) {
      setFormData({
        nome: selectedFilme.nome,
        nota: selectedFilme.nota.toString(),
        ano: selectedFilme.ano.toString(),
        foto: selectedFilme.foto,
      });
    } else {
      setFormData({
        nome: "",
        nota: "",
        ano: "",
        foto: "",
      });
    }
  }, [selectedFilme, modalVisible]);

  const handleUpdateFilme = useCallback(async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const filme = {
        id: selectedFilme?.id,
        nome: formData.nome,
        nota: parseFloat(formData.nota),
        ano: parseInt(formData.ano),
        foto: formData.foto,
      } as Filme;
      await updateFilme(filme);
      setDataSource(dataSource.map((item) => item.id === selectedFilme?.id ? filme : item));
      setModalVisible(false);
      messageApi.open({
        type: 'success',
        content: 'Filme atualizado com sucesso',
      });
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: 'Erro ao atualizar filme',
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [dataSource, formData,selectedFilme?.id, setDataSource, setModalVisible, messageApi]);

  const handleAdicionarFilme = useCallback (async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const filme = {
        nome: formData.nome,
        nota: parseFloat(formData.nota),
        ano: parseInt(formData.ano),
        foto: formData.foto,
      } as Filme;
      await createFilme(filme);
      setDataSource([...dataSource, filme]);
      setModalVisible(false);
      messageApi.open({
        type: 'success',
        content: 'Filme adicionado com sucesso',
      });
    } catch (error) {
      console.log(error);
      messageApi.open({
        type: 'error',
        content: 'Erro ao adicionar filme',
      });
    } finally {
      setLoading(false);
    }
  }, [dataSource, formData, messageApi, setDataSource, setModalVisible]);

  return (
    <>
    {contextHolder}
    <Modal show={modalVisible} onHide={() => setModalVisible(false)}>
      <Form>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Novo Filme</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nome do Filme</Form.Label>
            <Form.Control
              type="text"
              name="nome"
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, nota: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, ano: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, foto: e.target.value })}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={loading} variant="secondary" onClick={() => setModalVisible(false)}>
            Cancelar
          </Button>
          <Button disabled={loading} onClick={selectedFilme ? handleUpdateFilme : handleAdicionarFilme} variant="primary" type="submit">
            Salvar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  </>
  );
};
