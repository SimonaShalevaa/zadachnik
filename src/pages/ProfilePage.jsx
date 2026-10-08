import { useContext } from "react";
import { useParams } from "react-router";
import TaskCard from "../components/TaskCard";
import NotFoundPage from "./NotFoundPage";
import { UserContext } from "../contexts/UserContext";
import { users } from "../data/users";
import { tasks } from "../data/tasks";

function ProfilePage() {
  const { userId } = useParams();
  const { user: currentUser } = useContext(UserContext);

  let user = users.find((u) => String(u.id) === userId);
  if (currentUser && currentUser.id === userId) {
    user = currentUser;
  }

  if (!user) {
    return <NotFoundPage />;
  }

  const userTasks = tasks.filter((t) => t.authorId === user.id);
  const isMe = currentUser && currentUser.id === user.id;

  return (
    <section>
      <div className="card profile">
        <span className={user.pink ? "avatar avatar--lg avatar--alt" : "avatar avatar--lg"}>{user.initials}</span>
        <div className="profile__info">
          <h1>{user.fullName || user.name}</h1>
          <p className="muted">
            {user.grade ? user.grade + " клас" : "Учител"}
            {user.school && " · " + user.school}
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

      <h2 className="section-title profile__title">{isMe ? "Моите задачи" : "Задачи"}</h2>
      {userTasks.length === 0 && (
        <p className="muted">{isMe ? "Още не си качила задачи." : "Този потребител още не е качил задачи."}</p>
      )}
      <div className="grid">
        {userTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </section>
  );
}

export default ProfilePage;
