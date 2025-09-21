function Button1() {
  return <button>Кнопка №1</button>;
}

function Button1_1() {
  return (
    <button>
      <h2>Приклад кнопки 2</h2>
    </button>
  );
}

export default function Task1() {
  return (
    <div>
      <h1>Завдання №1 (створення кнопки)</h1>
      <Button1 />
      <div>
        <Button1_1 />
      </div>
    </div>
  );
}
