import { useContext, useEffect, useState } from "react";
import Card from "./Card";
import classes from "./mainSection.module.css";
import { FilterContext } from "../context/FilterContext";
import Shoe2 from "../assets/img/S2.jpg";
import Shoe1 from "../assets/img/S1.jpg";
import Shoe3 from "../assets/img/S3.jpg";
import Shoe4 from "../assets/img/S4.jpg";
import Shoe5 from "../assets/img/S5.jpg";
import Shoe6 from "../assets/img/S6.jpg";
import Shoe7 from "../assets/img/S7.jpg";

let shoesContent = [
  {
    category: "Flip Flops",
    name: "Nike",
    price: 710,
    images: [Shoe1, Shoe1, Shoe1, Shoe1],
    highlightColor: "blue",
    size: 50,
  },
  {
    category: "Sneakers",
    name: "Reebok",
    price: 200,
    images: [Shoe2, Shoe2, Shoe2, Shoe2],
    highlightColor: "yellow",
    size: 40,
  },
  {
    category: "Lace-Up",
    name: "Nike",
    price: 100,
    images: [Shoe3, Shoe3, Shoe3, Shoe3],
    highlightColor: "green",
    size: 40,
  },
  {
    category: "Flip Flops",
    name: "Reebok",
    price: 200,
    images: [Shoe4, Shoe4, Shoe4, Shoe4],
    highlightColor: "red",
    size: 30,
  },
  {
    category: "Sneakers",
    name: "adidas",
    price: 600,
    images: [Shoe5, Shoe5, Shoe5, Shoe5],
    highlightColor: "green",
    size: 40,
  },
  {
    category: "Lace-Up",
    name: "adidas",
    price: 400,
    images: [Shoe7, Shoe7, Shoe7, Shoe7],
    highlightColor: "purple",
    size: 50,
  },
];

function MainSection({ onSortByPriceChange }) {
  const ctx = useContext(FilterContext);
  const [filteredContent, setFilteredContent] = useState(shoesContent);
  const [selectedSortOrder, setSelectedSortOrder] = useState("");

  const filterByOrder = (filteredCnt) => {
    if (!selectedSortOrder) return filteredCnt;

    if (selectedSortOrder === "low") {
      filteredCnt.sort((a, b) => a.price - b.price);
    } else {
      filteredCnt.sort((a, b) => b.price - a.price);
    }

    return filteredCnt;
  };

  const getFilteredContent = () => {
    const filteredCnt = shoesContent.filter((shoeContent) => {
      if (!Object.keys(ctx).length) return;
      const isCategoryNotExist = !ctx?.selectedCategory?.length;
      const isSearchNotQuery = !ctx?.searchQuery?.trim()?.length;
      const isShoeSizeNotExist = !ctx?.selectedShoeSize?.length;

      const isAllFilterSatisfied =
        (isCategoryNotExist ||
          ctx?.selectedCategory?.includes(shoeContent.category)) &&
        (isSearchNotQuery ||
          shoeContent.name
            .toLocaleLowerCase()
            ?.includes(ctx?.searchQuery.toLocaleLowerCase())) &&
        (isShoeSizeNotExist ||
          ctx?.selectedShoeSize?.includes(shoeContent.size)) &&
        +ctx?.minPrice <= +shoeContent?.price &&
        +ctx?.maxPrice >= +shoeContent.price;

      if (isAllFilterSatisfied) return shoeContent;
    });

    return filterByOrder(filteredCnt);
  };

  useEffect(async () => {
    setFilteredContent([...getFilteredContent()]);
  }, [ctx, selectedSortOrder]);

  return (
    <main className={classes["main-section"]}>
      <div className={classes["sub-header"]}>
        <h3>New Arrivals</h3>
        <div className={classes["sub-header__sort"]}>
          <select
            name="price"
            className={classes["sub-header__sort-btn"]}
            value={selectedSortOrder}
            onChange={(e) => {
              onSortByPriceChange &&
                onSortByPriceChange({ sortByPrice: selectedSortOrder });
              setSelectedSortOrder(e.target.value);
            }}
          >
            <option value="">Sort by Price</option>
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
          </select>
        </div>
      </div>
      <div className={classes["main-section__cards"]}>
        {filteredContent.map((shoeContent) => {
          return <Card shoeContent={shoeContent} />;
        })}
        {filteredContent.length <= 0 && "No Shoe Found!"}
      </div>
    </main>
  );
}

export default MainSection;
