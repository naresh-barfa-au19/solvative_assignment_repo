const Pagination = ({
  pagination,
  limit,
  setLimit,
  handlePagination,
  page,
}) => {
  const handleLimitChange = (e) => {
    const value = Math.min(Number(e.target.value), 10);
    setLimit(value);
  };

  const lastPage = Math.ceil(pagination.totalCount / limit) - 1;
  return (
    <div className="pagination-container">
      <div className="pagination-controls">
        <button onClick={() => handlePagination(1)} disabled={page <= 1}>
          First
        </button>
        <button onClick={() => handlePagination(page - 1)} disabled={page <= 1}>
          Previous
        </button>
        <span>
          Page {limit ? Math.ceil(pagination.currentOffset / limit) : 1}
        </span>
        <button
          onClick={() => handlePagination(page + 1)}
          disabled={lastPage == page}
        >
          Next
        </button>
        <button
          onClick={() => handlePagination(lastPage)}
          disabled={lastPage == page}
        >
          Last
        </button>
      </div>

      <div className="limit-control">
        <label>Items per page:</label>
        <input
          type="number"
          min="1"
          max="10"
          value={limit}
          onChange={handleLimitChange}
        />
      </div>
    </div>
  );
};

export default Pagination;
