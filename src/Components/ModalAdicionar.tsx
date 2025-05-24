import { Button, Form, Modal } from "react-bootstrap";
import { Filme, useModal } from "../context/ModalContext";
import { useState, useEffect, useCallback, useRef } from "react";
import { createFilme, updateFilme } from "../services/api";
import { message } from "antd";
import { compressImage } from "../utils/CompressImage";

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
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
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
        content: 'Filme atualizado com sucesso.',
      });
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: 'Erro ao atualizar filme.',
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
        content: 'Filme adicionado com sucesso.',
      });
    } catch (error) {
      console.log(error);
      messageApi.open({
        type: 'error',
        content: 'Erro ao adicionar filme.',
      });
    } finally {
      setLoading(false);
    }
  }, [dataSource, formData, messageApi, setDataSource, setModalVisible]);

  // Função para converter arquivo para Base64
  const convertToBase64 = useCallback((file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }, []);

  // Manipulador de mudança de arquivo
  const handleFileChange = useCallback(async (e) => {
    try {
      const file = e.target.files[0];
      if (file) {
        // Validar o tipo de arquivo
        const fileType = file.type.toLowerCase();
        if (fileType !== 'image/jpeg' && fileType !== 'image/png') {
          messageApi.open({
            type: 'error',
            content: 'Por favor, selecione apenas imagens JPEG ou PNG.',
          });
          e.target.value = ''; // Limpar o input
          return;
        }
        
        // Validar tamanho do arquivo (limite de 5MB)
        if (file.size > 5 * 1024 * 1024) {
          messageApi.open({
            type: 'error',
            content: 'A imagem deve ter no máximo 5MB.',
          });
          e.target.value = ''; // Limpar o input
          return;
        }
        const compressedFile = await compressImage(file);
        const base64 = await convertToBase64(compressedFile);
        setFormData(prev => ({ ...prev, foto: base64 as string }));
      }
    } catch (error) {
      console.error("Erro ao converter imagem:", error);
      messageApi.open({
        type: 'error',
        content: 'Erro ao processar a imagem.',
      });
    }
  }, [convertToBase64, messageApi]);

  // Manipuladores de eventos de drag and drop
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(async (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    try {
      const file = e.dataTransfer.files[0];
      const fileType = file.type.toLowerCase();
      if (fileType !== 'image/jpeg' && fileType !== 'image/png') {
        messageApi.open({
          type: 'error',
          content: 'Por favor, arraste apenas imagens JPEG ou PNG.',
        });
        e.target.value = ''; // Limpar o input
        return;
      }

      if (file && file.type.startsWith('image/')) {
        const base64 = await convertToBase64(file);
        setFormData(prev => ({ ...prev, foto: base64 as string }));
      } else {
        messageApi.open({
          type: 'error',
          content: 'Por favor, arraste apenas arquivos de imagem.',
        });
      }
    } catch (error) {
      console.error("Erro ao processar imagem arrastada:", error);
      messageApi.open({
        type: 'error',
        content: 'Erro ao processar a imagem.',
      });
    }
  }, [convertToBase64, messageApi]);

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
            <div 
              className={`drag-area ${isDragging ? 'dragging' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: `2px dashed ${isDragging ? '#007bff' : '#ced4da'}`,
                borderRadius: '4px',
                padding: '20px',
                textAlign: 'center',
                cursor: 'pointer',
                backgroundColor: isDragging ? 'rgba(0, 123, 255, 0.1)' : 'transparent',
                transition: 'all 0.3s'
              }}
            >
              <p style={{ color: isDragging ? '#f9c74f' : '#495057'}}>Clique ou arraste uma imagem aqui</p>
              <Form.Control
                ref={fileInputRef}
                type="file"
                name="foto"
                accept="image/jpeg, image/png"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </div>
            {formData.foto && (
              <div style={{ marginTop: '10px' }}>
                <p>Preview da imagem:</p>
                <img 
                  src={formData.foto} 
                  alt="" 
                  style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px', borderRadius: '4px', border: '1px solid #ccc' }} 
                  />
              </div>
            )}
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
