import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import TaskCard from "../components/TaskCard";
import NotFoundPage from "./NotFoundPage";
import { UserContext } from "../contexts/UserContext";
import { getProfile } from "../services/profileService";
import { getTasksByAuthor } from "../services/taskService";
import { getInitials } from "../utils/helpers";

function ProfilePage() {
  const { userId } = useParams();
  const { user: currentUser } = useContext(UserContext);

  const [result, setResult] = useState({ id: null, profile: null, tasks: [], error: "" });

  useEffect(() => {
    Promise.all([getProfile(userId), getTasksByAuthor(userId)])
      .then(([profile, tasks]) => setResult({ id: userId, profile: profile, tasks: tasks, error: "" }))
      .catch((err) => setResult({ id: userId, profile: null, tasks: [], error: err.message }));
  }, [userId]);

  if (result.id !== userId) {
    return <p className="loading">Зареждане…</p>;
  }

  if (result.error) {
    return <div className="form-alert">{result.error}</div>;
  }

  const profile = result.profile;
  if (!profile) {
    return <NotFoundPage />;
  }

  const isMe = currentUser && currentUser.id === profile.id;

  return (
    <section>
      <div className="card profile">
        <span className="avatar avatar--lg">{getInitials(profile.full_name)}</span>
        <div className="profile__info">
          <h1>{profile.full_name}</h1>
          <p className="muted">
            {profile.role === "teacher" ? "Учител" : profile.grade + " клас"}
            {profile.school && " · " + profile.school}
          </p>
        </div>
        <div className="hero__stats">
          <div className="stat">
            <strong>{profile.points}</strong>
            <span>точки</span>
          </div>
          <div className="stat">
            <strong>{result.tasks.length}</strong>
            <span>задачи</span>
          </div>
        </div>
      </div>

      <h2 className="section-title profile__title">{isMe ? "Моите задачи" : "Задачи"}</h2>
      {result.tasks.length === 0 && (
        <p className="muted">{isMe ? "Още нямаш качени задачи." : "Този потребител още не е качил задачи."}</p>
      )}
      <div className="grid">
        {result.tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </section>
  );
}

export default ProfilePage;
