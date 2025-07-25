// PortfolioContainer.js
import React from "react";
import Stock from "./Stock";

function PortfolioContainer({ portfolio, onStockClick }) {
  return (
    <div>
      <h2>My Portfolio</h2>
      {
        //render your portfolio stocks here
        portfolio.map((stock) => (
          <Stock key={stock.id} stock={stock} onClick={onStockClick} />
        ))
      }
    </div>
  );
}

export default PortfolioContainer;
