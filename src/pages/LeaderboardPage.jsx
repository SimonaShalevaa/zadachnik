import { Link } from "react-router";
import { users } from "../data/users";

function LeaderboardPage() {
  return (
    <section>
      <div className="narrow">
        <h1>Класация</h1>
        <div className="chips">
          <button className="chip chip--active">Тази седмица</button>
          <button className="chip">Този месец</button>
          <button className="chip">Всички времена</button>
        </div>
        <ol className="card leaderboard">
          {users.map((user, index) => (
            <li key={user.id}>
              <span className={index < 3 ? "rank rank--" + (index + 1) : "rank"}>{index + 1}</span>
              <span className={user.pink ? "avatar avatar--sm avatar--alt" : "avatar avatar--sm"}>
                {user.initials}
              </span>
              <Link to={"/users/" + user.id} className="leaderboard__name">
                {user.name}
              </Link>
              <small>{user.grade} клас</small>
              <span className="points">{user.points} т.</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default LeaderboardPage;
