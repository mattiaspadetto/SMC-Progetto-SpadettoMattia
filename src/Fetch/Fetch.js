import { useState, useEffect } from "react";

export const useFetch = (url, method) => {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [numberOfFetchs, setNumberOfFetchs] = useState(0);

  useEffect(() => {
    fetch(url, {method: method})
      .then((response) => response.json())
      .then((result) => {
        setIsLoaded(true);
        setData(result);
      })
      .catch((err) => {
        setIsLoaded(true);
        setError(err);
      });
  }, [numberOfFetchs]);

  return {
    data: data,
    isLoaded: isLoaded,
    error: error,
    fetchAgain: () => setNumberOfFetchs((x) => x + 1),
  };
};
