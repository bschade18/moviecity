import { useState, useEffect } from "react";

import { popularBaseUrl } from "../../config";

export const useHomeFetch = () => {
  const [state, setState] = useState({ movies: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchMovies = async endpoint => {
    setError(false);
    setLoading(true);

    const isLoadMore = endpoint.search("page");
    // -1 returned if no match found i.e. just display popular movies from 1st page
    // 'page' not specified in endpoint

    try {
      const result = await (await fetch(endpoint)).json();

      setState(prev => ({
        ...prev,
        movies:
          isLoadMore !== -1
            ? [...prev.movies, ...result.results]
            : [...result.results],
        heroImage: prev.heroImage || result.results[0],
        currentPage: result.page,
        totalPages: result.total_pages
      }));
    } catch (error) {
      setError(true);
      console.log(error);
    }
    setLoading(false);
  };

  // just want this to run once when we start the app and we have mounted component
  // provide a dependency array

  useEffect(() => {
    fetchMovies(`${popularBaseUrl}`);
  }, []);

  return [{ state, loading, error }, fetchMovies];
};
