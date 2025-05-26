import axios from "axios";

// Crie uma instância do axios com configuração base
const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 10000,
});

export const getFilmes = async () => {
  try {
    const response = await api.get("/filmes");
    const data = response.data;

    if (Array.isArray(data)) {
      return data;
    } else {
      return [];
    }

  } catch (error) {
    console.error("Erro no ao listar filmes:", error);
    return []; // Evita quebrar a aplicação
  }
};

export const createFilme = async (filme) => {
  try {
    const response = await api.post("/filmes", filme);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === "ERR_NETWORK") {
        console.error("Erro de conexão: Verifique se o servidor está rodando");
      } else {
        console.error("Erro ao criar filme:", error.response?.data || error.message);
      }
    }
    throw error;
  }
};

export const updateFilme = async (filme) => {
  try {
    const response = await api.put(`/filmes/${filme.id}`, filme);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro ao atualizar filme:", error.response?.data || error.message);
    }
    throw error;
  }
};

export const deleteFilme = async (id) => {
  try {
    const response = await api.delete(`/filmes/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro ao excluir filme:", error.response?.data || error.message);
    }
    throw error;
  }
};
