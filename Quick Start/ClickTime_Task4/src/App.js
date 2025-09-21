import { useState } from "react";

export default function MyApp() {
  const [firstCount, setFirstCount] = useState(0);
  const [secondCount, setSecondCount] = useState(0);

  return (
    <div className="counter-app">
      <h1>Лічильники, які оновлюються окремо</h1>
      <CounterButton
        count={firstCount}
        onClick={() => setFirstCount(firstCount + 1)}
      />
      <CounterButton
        count={secondCount}
        onClick={() => setSecondCount(secondCount + 1)}
      />
    </div>
  );
}

function CounterButton({ count, onClick }) {
  return (
    <button className="counter-btn" onClick={onClick}>
      Натиснуто {count} разів
    </button>
  );
}
