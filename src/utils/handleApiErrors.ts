import axios from "axios";

export function handleApiError(error: unknown, fallbackMessage = 'Ocurrió un error inesperado') {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || fallbackMessage;
      return message;
    }
    return fallbackMessage;
  }
