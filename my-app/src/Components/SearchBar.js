import React, { useState, useRef, useEffect } from "react";
import { AiFillHeart } from "react-icons/ai";
import { FiFilter } from "react-icons/fi";

function SearchBar({
  onSearch,
  handleTempTypeChange,
  handleTempYearRangeChange,
  tempSelectedYearRanges,
  tempSelectedTypes,
  handleApplyFilters,
  onFavClick
}) {
  const [query, setQuery] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerRef = useRef(null);

  // Toggle the drawer open/close
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
    if (isDrawerOpen) {
      handleApplyFilters(); // Apply filters when closing the drawer
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  // Function to close the drawer if clicked outside
  const handleClickOutside = (event) => {
    if (drawerRef.current && !drawerRef.current.contains(event.target)) {
      setIsDrawerOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const yearRanges = [
    { label: "1800 to 1899", min: 1800, max: 1899 },
    { label: "1900 to 1999", min: 1900, max: 1999 },
    { label: "2000 to 2010", min: 2000, max: 2010 },
    { label: "2010 to 2020", min: 2010, max: 2020 },
    { label: "2021 to Present", min: 2021, max: new Date().getFullYear() },
  ];

  return (
    <>
      <div className="filter-drawer">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for movies..."
            value={query}
            onChange={handleInputChange}
          />
        </div>

        <div className="container">
          <div className="icons-wraper">
          <div className="filter-icon" onClick={toggleDrawer}>
            <FiFilter />
          </div>
          <div className="filter-icon" onClick={onFavClick}>
          <AiFillHeart style={{ color: "red" }} />
          </div>
          </div>

          <div
            className={`drawer ${isDrawerOpen ? "open" : ""}`}
            ref={drawerRef}
          >
            <div className="drawer-content">
              <span className="close-btn" onClick={toggleDrawer}>
                ×
              </span>
              <h2>Filter Options</h2>
              <hr width="100%" size="2" color="blue" />
              <br />

              <div className="radio-group">
                <h3>Movie Types</h3>
                <hr width="43%" size="2" color="blue" />
                {["Action", "Movie", "Si-fi", "Series", "Horror"].map(
                  (type) => (
                    <label key={type}>
                      <input
                        type="checkbox"
                        value={type}
                        checked={tempSelectedTypes.includes(type)}
                        onChange={() => handleTempTypeChange(type)}
                      />
                      {type}
                    </label>
                  )
                )}
              </div>
              <div className="radio-group">
                <h3>Movie Generation</h3>
                <hr width="60%" size="2" color="blue" />
                {yearRanges.map((range, index) => (
                  <label key={index}>
                    <input
                      type="checkbox"
                      value={range.label}
                      checked={tempSelectedYearRanges.some(
                        (r) => r.label === range.label
                      )}
                      onChange={() => handleTempYearRangeChange(range)}
                    />
                    {range.label}
                  </label>
                ))}
              </div>
              <div className="apply-button">
                <button
                  className="apply"
                  onClick={() => {
                    handleApplyFilters();
                    setIsDrawerOpen(false);
                  }}
                >
                  Apply
                </button>
                <button
                  className="apply"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchBar;
