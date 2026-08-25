
import { useState, useCallback } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL

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
      });

      return response.data;
    } catch (err) {
      const mensagemErro =
        err.response?.data?.message || "Erro na requisição";

      setError(mensagemErro);
      throw new Error(mensagemErro);
    } finally {
      setLoading(false)
    }
  }, [])

  return { request, loading, error };
}

export default useApi;