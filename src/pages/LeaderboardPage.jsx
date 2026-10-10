import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getTopProfiles } from "../services/profileService";
import { getInitials } from "../utils/helpers";

function LeaderboardPage() {
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getTopProfiles()
      .then((data) => setProfiles(data))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <section>
      <div className="narrow">
        <h1>Класация</h1>
        <p className="muted">Най-активните помощници в Задачник.</p>

        {isLoading && <p className="loading">Зареждане…</p>}
        {error && <div className="form-alert">{error}</div>}

        {!isLoading && !error && (
          <ol className="card leaderboard">
            {profiles.map((profile, index) => (
              <li key={profile.id}>
                <span className={index < 3 ? "rank rank--" + (index + 1) : "rank"}>{index + 1}</span>
                <span className="avatar avatar--sm">{getInitials(profile.full_name)}</span>
                <Link to={"/users/" + profile.id} className="leaderboard__name">
                  {profile.full_name}
                </Link>
                <small>{profile.grade ? profile.grade + " клас" : "Учител"}</small>
                <span className="points">{profile.points} т.</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}

export default LeaderboardPage;
