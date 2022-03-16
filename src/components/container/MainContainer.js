import FilterSideBar from "../FilterSideBar";
import MainSection from "../MainSection";
import classes from "./mainContainer.module.css";

import { useEffect, useState } from "react";

function MainContainer({ onFilterChange }) {
  const [filteredObj, setFilteredObj] = useState({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    onFilterChange(filteredObj);
  }, [filteredObj]);

  useEffect(() => {
    window.innerWidth < 768 && setIsFilterOpen(false);
  }, [window.innerWidth > 768]);

  const handleFilterChange = (e) => {
    setFilteredObj({ ...filteredObj, ...e });
  };

  return (
    <div className={classes["main-container"]}>
      {window.innerWidth > 768 || isFilterOpen ? (
        <FilterSideBar
          minPriceRange={200}
          maxPriceRange={800}
          shoeSizes={[30, 40, 50]}
          onFilterSideBarChange={handleFilterChange}
        />
      ) : null}
      <div
        className={classes["main-container--filter-dropdown"]}
        onClick={() => setIsFilterOpen(!isFilterOpen)}
      >
        {!isFilterOpen ? "Open" : "Close"} Filter
      </div>
      <MainSection onSortByPriceChange={handleFilterChange} />
    </div>
  );
}

export default MainContainer;
