
import { useState, useCallback } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

function useApi() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const request = useCallback(async (endpoint, options = {}) => {
    setLoading(true)
    setError("")

    try {
      const response = await axios({
        url: `${BASE_URL}${endpoint}`,
        method: options.method || "GET",
        data: options.body,
        withCredentials: true,
      });

      return response.data;
    } catch (err) {
      const mensagemErro =
        typeof err.response?.data === "string"
          ? err.response.data
          : err.response?.data?.mensagem || "Erro na requisição"

      setError(mensagemErro);
      throw new Error(mensagemErro, { cause: err })
    } finally {
      setLoading(false)
    }
  }, [])

  return { request, loading, error };
}

export default useApi;