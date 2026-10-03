function HeroStats({ stats }) {
  return (
    <div className="hero__stats">
      {stats.map((stat) => (
        <div key={stat.label} className="stat">
          <strong>{stat.value}</strong>
          <span>{stat.label}</span>
        </div>
      ))}
    </div>
  );
}

export default HeroStats;
