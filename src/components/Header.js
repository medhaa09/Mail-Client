const Header = ({ selectedFilter, handleSelectFilter }) => {
  return (
    <div className="header">
      <div className="filter-container">
        
        <div
          className="filter-controllers-container"
          onClick={handleSelectFilter}
        >
          <button
            className={`filter-btn unread ${
              selectedFilter === "unread" ? "active" : ""
            }`}
            data-filter={"unread"}
          >
            Unread
          </button>
          <button
            className={`filter-btn read ${
              selectedFilter === "read" ? "active" : ""
            }`}
            data-filter={"read"}
          >
            Read
          </button>
          <button
            className={`filter-btn favorites ${
              selectedFilter === "favorites" ? "active" : ""
            }`}
            data-filter={"favorites"}
          >
            Favorites
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
