import { useEffect, useState } from "react";
import classes from "./filterSideBar.module.css";

const categories = ["Flip Flops", "Sneakers", "Lace-Up"];

function FilterSideBar(props) {
  const [endPriceRange, setEndPriceRange] = useState(props.maxPriceRange);
  const [startPriceRange, setStartPriceRange] = useState(props.minPriceRange);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedShoeSize, setSelectedShoeSize] = useState([]);

  useEffect(() => {
    console.log(">>> FilterSideBarChange:");
    props.onFilterSideBarChange &&
      props.onFilterSideBarChange({
        maxPrice: endPriceRange,
        minPrice: startPriceRange,
        selectedCategory,
        selectedShoeSize,
      });
  }, [endPriceRange, startPriceRange, selectedCategory, selectedShoeSize]);

  let minPriceRange =
    props.minPriceRange < props.maxPriceRange / 2
      ? props.minPriceRange
      : props.maxPriceRange / 2;

  const handleFilterClick = (idx, filterName) => {
    let selectedFilter, setFilter;
    if (filterName === "category") {
      selectedFilter = selectedCategory;
      setFilter = setSelectedCategory;
    } else if (filterName === "shoeSize") {
      selectedFilter = selectedShoeSize;
      setFilter = setSelectedShoeSize;
    }

    let filtered = selectedFilter;
    if (selectedFilter.includes(idx)) {
      filtered = selectedFilter.filter((value) => value !== idx);
    } else {
      filtered.push(idx);
    }
    setFilter([...filtered]);
  };

  return (
    <aside className={classes["filter-sidebar"]}>
      <div className={classes["filter-sidebar__categories"]}>
        <h3 className={classes["filter-sidebar__categories-dropdown"]}>
          Categories
        </h3>
        <ul className={classes["filter-sidebar__categories-list"]}>
          {categories.map((category, idx) => {
            return (
              <li
                className={classes["filter-sidebar__categories-item"]}
                onClick={handleFilterClick.bind(this, category, "category")}
              >
                <input
                  type="checkbox"
                  checked={!!selectedCategory.includes(category)}
                  className={classes["filter-sidebar__categories-checkbox"]}
                />
                <label>{category}</label>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={classes["filter-sidebar__range"]}>
        <h3 className={classes["filter-sidebar__range-headline"]}>
          Price range
        </h3>
        <div className={classes["filter-sidebar__range-inputs"]}>
          <output>${startPriceRange}</output>
          <input
            type="range"
            value={startPriceRange}
            min={10}
            max={minPriceRange}
            onChange={(e) => setStartPriceRange(e.target.value)}
            className={classes["filter-sidebar__range-start"]}
          />
          <input
            type="range"
            value={endPriceRange}
            min={minPriceRange}
            max={props.maxPriceRange}
            onChange={(e) => setEndPriceRange(e.target.value)}
          />
          <output>${endPriceRange}</output>
        </div>
      </div>
      <div className={classes["filter-sidebar__sizes"]}>
        <h3 className={classes["filter-sidebar__sizes-headline"]}>Size</h3>
        <div className={classes["filter-sidebar__sizes-grid"]}>
          {props.shoeSizes.map((shoeSize, idx) => {
            return (
              <span
                className={classes["filter-sidebar__size"]}
                onClick={handleFilterClick.bind(this, shoeSize, "shoeSize")}
                style={{
                  background: selectedShoeSize.includes(shoeSize)
                    ? "var(--primary-gray)"
                    : "",
                }}
              >
                {shoeSize}
              </span>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

export default FilterSideBar;
