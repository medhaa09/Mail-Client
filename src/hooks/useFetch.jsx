import React from "react";

const useFetch = (url, makeRequest) => {
  const [data, setData] = React.useState(null);
  const [status, setStatus] = React.useState("idle");
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if (!makeRequest) return;

    (async () => {
      try {
        setStatus("pending");
        const response = await fetch(url);
        if (response.status === 200) {
          const jsonResponse = await response.json();
          setData(jsonResponse);
        }
        setStatus("resolved");
      } catch (error) {
        setStatus("rejected");
        setError(error);
      }
    })();
  }, [url, makeRequest]);

  return {
    data,
    status,
    error,
  };
};

export default useFetch;
