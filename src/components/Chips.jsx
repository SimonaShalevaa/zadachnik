function Chips({ items, active, className = "" }) {
  return (
    <div className={`chips ${className}`.trim()}>
      {items.map((item) => (
        <button key={item} className={item === active ? "chip chip--active" : "chip"}>
          {item}
        </button>
      ))}
    </div>
  );
}

export default Chips;
