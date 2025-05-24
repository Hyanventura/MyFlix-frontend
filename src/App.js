import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home.tsx";
import { ModalAdicionar } from "./Components/ModalAdicionar.tsx";
import { ModalExcluir } from "./Components/ModalExcluir.tsx";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <ModalExcluir />
      <ModalAdicionar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
