import React from "react";

export const FilterContext = React.createContext({
  searchQuery: "",
  category: [],
  minPrice: 10,
  maxPrice: 800,
  shoeSizes: [],
  sortByPrice: "high",
});
