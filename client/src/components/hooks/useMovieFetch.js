import { useState, useEffect, useCallback } from 'react';

import { apiKey, apiUrl } from '../../config';

export const useMovieFetch = (id) => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = useCallback(async () => {
    setError(false);
    setLoading(true);

    try {
      const endpoint = `${apiUrl}movie/${id}?api_key=${apiKey}`;
      const result = await (await fetch(endpoint)).json();

      const creditsEndpoint = `${apiUrl}movie/${id}/credits?api_key=${apiKey}`;
      const creditsResult = await (await fetch(creditsEndpoint)).json();

      const directors = creditsResult.crew.filter(
        (member) => member.job === 'Director'
      );

      setState({
        ...result,
        actors: creditsResult.cast,
        directors,
      });
    } catch {
      setError(true);
    }

    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return [state, loading, error];
};
