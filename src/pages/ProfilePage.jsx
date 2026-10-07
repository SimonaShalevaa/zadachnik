import { useParams } from "react-router";
import TaskCard from "../components/TaskCard";
import NotFoundPage from "./NotFoundPage";
import { users } from "../data/users";
import { tasks } from "../data/tasks";

function ProfilePage() {
  const { userId } = useParams();

  const user = users.find((u) => u.id === Number(userId));
  if (!user) {
    return <NotFoundPage />;
  }

  const userTasks = tasks.filter((t) => t.authorId === user.id);

  return (
    <section>
      <div className="card profile">
        <span className={user.pink ? "avatar avatar--lg avatar--alt" : "avatar avatar--lg"}>{user.initials}</span>
        <div className="profile__info">
          <h1>{user.fullName || user.name}</h1>
          <p className="muted">
            {user.grade} клас{user.school && " · " + user.school}
          </p>
          {user.badges && (
            <div className="badges">
              {user.badges.map((badge) => (
                <span className="badge" key={badge}>
                  {badge}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="hero__stats">
          <div className="stat">
            <strong>{user.points}</strong>
            <span>точки</span>
          </div>
          <div className="stat">
            <strong>{userTasks.length}</strong>
            <span>задачи</span>
          </div>
        </div>
      </div>

      <h2 className="section-title profile__title">Задачи</h2>
      {userTasks.length === 0 && <p className="muted">Този потребител още не е качил задачи.</p>}
      <div className="grid">
        {userTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </section>
  );
}

export default ProfilePage;
