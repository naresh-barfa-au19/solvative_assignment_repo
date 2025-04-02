import React, { forwardRef } from 'react';
import './SearchBox.css';

const SearchBox = forwardRef(({ value, onChange, onKeyDown }, ref) => {
  return (
    <div className="search-container">
      <input
        ref={ref}
        type="text"
        className="search-input"
        placeholder="Search city..."
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
});

export default SearchBox;