import Avatar from "../components/Avatar";
import Chips from "../components/Chips";
import { USERS } from "../data/users";
import { formatPoints } from "../utils/format";

const PERIODS = ["Тази седмица", "Този месец", "Всички времена"];

function LeaderboardPage() {
  const ranked = [...USERS].sort((a, b) => b.points - a.points);

  return (
    <section id="leaderboard" className="view">
      <div className="narrow">
        <h1>Класация</h1>
        <Chips items={PERIODS} active={PERIODS[0]} />
        <ol className="card leaderboard">
          {ranked.map((user, i) => {
            const rank = i + 1;
            return (
              <li key={user.id}>
                <span className={rank <= 3 ? `rank rank--${rank}` : "rank"}>{rank}</span>
                <Avatar user={user} />
                <strong>{user.name}</strong>
                <small>{user.grade} клас</small>
                <span className="points">{formatPoints(user.points)} т.</span>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

export default LeaderboardPage;
