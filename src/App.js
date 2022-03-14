import { FilterContext } from "./context/FilterContext";
import Header from "./components/container/Header";
import MainContainer from "./components/container/MainContainer";
import { useState } from "react";

function App(props) {
  const [ctxValue, setCtxValue] = useState({});

  const handleSearchQueryChange = (e) => {
    setCtxValue({ ...ctxValue, searchQuery: e.target.value });
  };

  const handleFilterChange = (filteredObj) => {
    setCtxValue({ ...ctxValue, ...filteredObj });
  };

  return (
    <FilterContext.Provider value={ctxValue}>
      <div className="App" {...props}>
        <Header onSearchQueryChange={handleSearchQueryChange} />
        <MainContainer onFilterChange={handleFilterChange} />
      </div>
    </FilterContext.Provider>
  );
}

export default App;
