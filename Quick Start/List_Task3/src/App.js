const groceryItems = [
  { name: "Nissan GTR R34", type: "auto", id: 1 },
  { name: "Acer Aspire V5", type: "PC", id: 2 },
  { name: "Samsung S24 Ultra", type: "telephone", id: 3 },
  { name: "Xiaomi 17 Pro Max", type: "telephone", id: 3 },
  { name: "Mitsubisi EVO X", type: "auto", id: 4 },
];

export default function GroceryList() {
  const renderItem = (item) => {
    let textColor;
    switch (item.type) {
      case "PC":
        textColor = "#1E90FF";
        break;
      case "telephone":
        textColor = "#228B22";
        break;
      case "auto":
        textColor = "#800080";
        break;
      default:
        textColor = "#000000";
    }

    return (
      <li key={item.id} className="grocery-item" style={{ color: textColor }}>
        {item.name}
      </li>
    );
  };

  return (
    <div className="grocery-list">
      <h3>Список товарів</h3>
      <ul>{groceryItems.map(renderItem)}</ul>
    </div>
  );
}
