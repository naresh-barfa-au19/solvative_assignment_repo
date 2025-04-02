const ResultsTable = ({ results, search, page }) => {
    if (!search) return <div className="table-message">Start searching</div>;
    if (results?.length === 0) return <div className="table-message">No result found</div>;
  
    return (
      <table className="results-table">
        <thead>
          <tr>
            <th>#</th>
            <th>City Name</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {results?.map((place, index) => (
            <tr key={place.id}>
              <td>{page + index + 1}</td>
              <td>{place.name}</td>
              <td>
                <img 
                  src={`https://flagsapi.com/${place.countryCode}/flat/24.png`}
                  alt={`${place.country} flag`}
                />
                {place.country}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default ResultsTable;