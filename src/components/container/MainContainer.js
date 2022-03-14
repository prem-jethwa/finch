import FilterSideBar from "../FilterSideBar";
import MainSection from "../MainSection";
import classes from "./mainContainer.module.css";

import { useEffect, useState } from "react";

function MainContainer({ onFilterChange }) {
  const [filteredObj, setFilteredObj] = useState({});

  useEffect(() => {
    onFilterChange(filteredObj);
  }, [filteredObj]);

  const handleFilterChange = (e) => {
    setFilteredObj({ ...filteredObj, ...e });
  };

  return (
    <div className={classes["main-container"]}>
      <FilterSideBar
        minPriceRange={200}
        maxPriceRange={800}
        shoeSizes={[30, 40, 50]}
        onFilterSideBarChange={handleFilterChange}
      />
      <MainSection onSortByPriceChange={handleFilterChange} />
    </div>
  );
}

export default MainContainer;
