// src/pages/Home.jsx
import { useState } from 'react';
import { Modal, Button, Form, Card, Row, Col } from 'react-bootstrap';
import CalendarOutlined, { StarOutlined } from '@ant-design/icons'

type Filme = {
  id: number,
  nome: string,
  nota: string,
  ano: string,
  foto: string
}

export const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [filmes, setFilmes] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    nome: '',
    nota: '',
    ano: '',
    foto: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'foto' && files[0]) {
      setFormData({ ...formData, foto: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const novoFilme = {
      ...formData,
      id: Date.now(),
    };
    setFilmes([...filmes, novoFilme]);
    setFormData({
      nome: '',
      nota: '',
      ano: '',
      foto: null,
    });
    setShowModal(false);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">🎬 MyFlix</h1>

      <Button variant="primary" onClick={() => setShowModal(true)}>
        Adicionar Filme
      </Button>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Form onSubmit={handleSubmit}>
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
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nota (0 a 10)</Form.Label>
              <Form.Control
                type="number"
                name="nota"
                value={formData.nota}
                onChange={handleChange}
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
                onChange={handleChange}
                min="1900"
                max="2100"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Foto do Filme</Form.Label>
              <Form.Control type="file" name="foto" accept="image/*" onChange={handleChange} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Salvar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Cards */}
      <Row className="mt-4" xs={1} sm={2} md={3} lg={4}>
        {filmes.map((filme) => (
          <Col key={filme.id} className="mb-4">
            <Card>
              {filme.fotoPreview && (
                <Card.Img
                  variant="top"
                  src={filme.fotoPreview}
                  alt={filme.nome}
                  style={{ height: '300px', objectFit: 'cover' }}
                />
              )}
              <Card.Body>
                <Card.Title>{filme.nome}</Card.Title>
                <Card.Text>
                  <Col>
                    <CalendarOutlined style={{ color: 'black'}}/> 
                    {filme.ano}
                  </Col>
                  <Col>
                    <StarOutlined style={{color:'yellow'}}/> 
                    {filme.nota}
                  </Col>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;
