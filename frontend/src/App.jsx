import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/stock")
      .then((response) => {
        setStocks(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar stocks:", error);
      });
  }, []);

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>FinShark Dashboard</h1>

      {stocks.length === 0 ? (
        <p>Nenhuma stock encontrada.</p>
      ) : (
        stocks.map((stock) => (
          <div
            key={stock.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "10px",
            }}
          >
            <h2>{stock.companyName}</h2>

            <p>
              <strong>Symbol:</strong> {stock.symbol}
            </p>

            <p>
              <strong>Industry:</strong> {stock.industry}
            </p>

            <p>
              <strong>Purchase:</strong> ${stock.purchase}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;