// StockContainer.js
import React from "react";
import Stock from "./Stock";

function StockContainer({ stocks, onStockClick }) {
  return (
    <div>
      <h2>Stocks</h2>
      {/* render stock list here*/}
      {stocks.map((stock) => (
        <Stock key={stock.id} stock={stock} onClick={onStockClick} />
      ))}
    </div>
  );
}

export default StockContainer;
