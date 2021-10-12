import { useCallback, useEffect, useState } from "react";

const useFetch = (config) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const sendRequest = useCallback(async (config) => {
    setLoading(true);
    setData(null);
    try {
      const result = await fetch(config.uri, {
        method: config.method,
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(config.body),
      });

      if (!result.ok) {
        throw new Error(result.status);
      }
      const data = await result.json();
      setData(data);
    } catch (e) {
      setError(e);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    if (config.body) {
      sendRequest(config);
    }
  }, [sendRequest, config]);

  return { data, loading, error, fetch };
};

export default useFetch;
