import React, { useState } from "react";
import { Button, Card, Row, Col, Form } from "react-bootstrap";
import {
  CalendarOutlined,
  DeleteOutlined,
  EditOutlined,
  StarFilled,
} from "@ant-design/icons";
import { useModal } from "../context/ModalContext";
import { useEffect } from "react";
import { getFilmes } from "../services/api";

export const Home = () => {
  const { setModalVisible, dataSource, setModalExcluirVisible, setDataSource, setSelectedFilme} = useModal();
  const [filter, setFilter] = useState("");
  // GET FILMES

  useEffect(() => {
    getFilmes().then((data) => {
      setDataSource(data);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSource]);

  if (!dataSource) {
    return <div>Carregando...</div>;
  }
  
  const filteredDataSource = dataSource?.filter((filme) =>
    filme.nome.toLowerCase().includes(filter.toLowerCase())
  );
  
  return (
    <div className="container mt-4">
      <h1 className="mb-4">🎬 MyFlix</h1>
      <Row>
        <Col>
          <Button variant="primary" onClick={() => {setSelectedFilme(null); setModalVisible(true)}}>
            Adicionar Filme
          </Button>
        </Col> 
        <Col md="auto" className="ms-auto">
          <Form.Control
            type="text"
            placeholder="🔍 Pesquisar filmes"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="search-input"
          />
        </Col>
      </Row>

      {/* Cards */}
      <Row className="mt-4" xs={1} sm={2} md={3} lg={4}>
        {filteredDataSource.map((filme) => (
          <Col key={filme?.id} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={filme?.foto}
                alt={filme?.nome}
                style={{
                  height: "385px",
                  width: "100%",
                  objectFit: "cover",
                  backgroundColor: "#333",
                }}
              />

              <Card.Body>
                <Card.Title>{filme?.nome}</Card.Title>
                <Card.Text className="d-flex flex-horizontal">
                  <Col style={{ display: "flex", justifyContent: "center" }}>
                    <CalendarOutlined
                      style={{ marginRight: "8px", color: "black" }}
                    />
                    {filme?.ano}
                  </Col>
                  <Col style={{ display: "flex", justifyContent: "center" }}>
                    <StarFilled
                      style={{ marginRight: "8px", color: "yellow" }}
                    />
                    {filme?.nota}
                  </Col>
                </Card.Text>
                <Card.Footer className="d-flex justify-content-between gap-2">
                  <Button
                    variant="outline-primary"
                    onClick={() => {
                      setSelectedFilme(filme);
                      setModalVisible(true);
                    }}
                    size="sm"
                  >
                    <EditOutlined />
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => {
                      setSelectedFilme(filme);
                      setModalExcluirVisible(true);
                    }}
                    size="sm"
                  >
                    <DeleteOutlined />
                  </Button>
                </Card.Footer>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;
