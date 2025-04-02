import { useState, useEffect, useRef } from "react";
import axios from "axios";
import SearchBox from "./components/SearchBox";
import ResultsTable from "./components/ResultTable";
import Pagination from "./components/Pagination";
import Spinner from "./components/Spinner";
import { fetchCities } from "./api/fetchCities";
import "./index.css";

export default function App() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({});
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const searchInputRef = useRef(null);

  const fetchData = async (page = 1) => {
    if (!search.trim()) return;
    setIsLoading(true);
    try {
      const payload = { query: search, limit, page };
      const { data } = await fetchCities(payload);
      setResults(data.data);
      setPagination({
        totalCount: data.metadata.totalCount,
        currentOffset: data.metadata.currentOffset,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setIsLoading(false);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      fetchData();
    }
  };

  useEffect(() => {
    if (search.trim()?.length === 0) {
      setResults([]);
      setPagination({});
      setLimit(5);
    }
  }, [search]);

  useEffect(() => {
    if (limit) {
      fetchData();
    }
  }, [limit]);

  const handlePagination = async (pageNo) => {
    if (pageNo > 0) {
      await fetchData(pageNo);
      setPage(pageNo);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "/") {
        e.preventDefault();
        searchInputRef.current.focus();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <div className="app-container">
      <SearchBox
        ref={searchInputRef}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleSearch}
      />

      {isLoading ? (
        <Spinner />
      ) : (
        <ResultsTable
          results={results}
          search={search}
          page={limit * (page - 1)}
        />
      )}

      {results?.length > 0 && (
        <Pagination
          pagination={pagination}
          limit={limit}
          setLimit={setLimit}
          handlePagination={handlePagination}
          page={page}
        />
      )}
    </div>
  );
}
