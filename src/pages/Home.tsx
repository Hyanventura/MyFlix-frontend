import React from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import {
  CalendarOutlined,
  DeleteOutlined,
  EditOutlined,
  StarFilled,
} from "@ant-design/icons";
import { Filme, useModal } from "../context/ModalContext";
import { useEffect } from "react";
import { getFilmes } from "../services/api";
import { useState } from "react";

export const Home = () => {
  const { setModalVisible, dataSource, setModalExcluirVisible } = useModal();
  const [filmes, setFilmes] = useState<Filme[]>([]);

  // GET FILMES
  useEffect(() => {
    getFilmes().then((data) => {
      console.log(data);
      setFilmes(data);
    });
  }, [dataSource]);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">🎬 MyFlix</h1>
      <Button variant="primary" onClick={() => setModalVisible(true)}>
        Adicionar Filme
      </Button>

      {/* Cards */}
      <Row className="mt-4" xs={1} sm={2} md={3} lg={4}>
        {filmes.map((filme) => (
          <Col key={filme?.id} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={filme?.foto}
                alt={filme?.nome}
                style={{ maxHeight: "385px", objectFit: "cover" }}
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
                    onClick={() => setModalVisible(true)}
                    size="sm"
                  >
                    <EditOutlined />
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => setModalExcluirVisible(true)}
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
