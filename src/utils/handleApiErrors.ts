import axios from "axios";

export function handleApiError(error: unknown, fallbackMessage = 'An error has occurred, please try again later!') {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.response?.statusText || fallbackMessage;
      return message;
    }
    return fallbackMessage;
  }
