import classes from "./header.module.css";
import searchIcon from "../../assets/img/search.svg";

function Header({ onSearchQueryChange }) {
  return (
    <header className={classes["search-header"]}>
      <div className={classes["search-header__logo"]}>Finch Shoes</div>
      <div className={classes["search-header__search-box"]}>
        <img
          className={classes["search-header__search-img"]}
          src={searchIcon}
          alt="Search Icon"
        />
        <input
          placeholder="Search Shoes"
          type="text"
          className={classes["search-header__search-input"]}
          onChange={onSearchQueryChange}
        />
      </div>
    </header>
  );
}

export default Header;
