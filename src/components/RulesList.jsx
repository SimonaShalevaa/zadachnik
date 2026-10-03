function RulesList({ rules }) {
  return (
    <ul className="rules">
      {rules.map((rule) => (
        <li key={rule}>{rule}</li>
      ))}
    </ul>
  );
}

export default RulesList;
