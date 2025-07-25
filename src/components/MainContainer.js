// MainContainer.js
import React, { useState, useEffect } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [sortBy, setSortBy] = useState(""); // "Alphabetically" or "Price"
  const [filterBy, setFilterBy] = useState("All"); // "Tech", "Sportswear", "Finance", or "All"

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then((r) => r.json())
      .then((data) => setStocks(data))
      .catch((error) => console.error("Error fetching stocks:", error));
  }, []);

  const handleBuyStock = (stockToBuy) => {
    if (!portfolio.some((stock) => stock.id === stockToBuy.id)) {
      setPortfolio([...portfolio, stockToBuy]);
    }
  };

  const handleSellStock = (stockToSell) => {
    setPortfolio(portfolio.filter((stock) => stock.id !== stockToSell.id));
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterBy(event.target.value);
  };

  const sortedAndFilteredStocks = [...stocks]
    .filter((stock) => {
      if (filterBy === "All") {
        return true;
      }
      return stock.type === filterBy;
    })
    .sort((a, b) => {
      if (sortBy === "Alphabetically") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "Price") {
        return a.price - b.price;
      }
      return 0; // No sorting if sortBy is not set
    });

  return (
    <div>
      <SearchBar
        sortBy={sortBy}
        filterBy={filterBy}
        onSortChange={handleSortChange}
        onFilterChange={handleFilterChange}
      />
      <div className="row">
        <div className="col-8">
          <StockContainer
            stocks={sortedAndFilteredStocks}
            onStockClick={handleBuyStock}
          />
        </div>
        <div className="col-4">
          <PortfolioContainer
            portfolio={portfolio}
            onStockClick={handleSellStock}
          />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
