import TaskCard from "../components/TaskCard";
import { currentUser } from "../data/users";
import { myTasks } from "../data/tasks";

function ProfilePage() {
  const user = currentUser;

  return (
    <section id="profile" className="view">
      <div className="card profile">
        <span className="avatar avatar--lg">{user.initials}</span>
        <div className="profile__info">
          <h1>{user.name}</h1>
          <p className="muted">
            {user.grade} клас · {user.school}
          </p>
          <div className="badges">
            {user.badges.map((badge) => (
              <span className="badge" key={badge}>
                {badge}
              </span>
            ))}
          </div>
        </div>
        <div className="hero__stats">
          <div className="stat">
            <strong>{user.points}</strong>
            <span>точки</span>
          </div>
          <div className="stat">
            <strong>{user.solutions}</strong>
            <span>решения</span>
          </div>
          <div className="stat">
            <strong>{user.tasks}</strong>
            <span>задачи</span>
          </div>
        </div>
      </div>

      <div className="tabs">
        <a className="tab tab--active">Моите задачи</a>
        <a className="tab">Моите решения</a>
        <a className="tab">Запазени</a>
      </div>
      <div className="grid">
        {myTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </section>
  );
}

export default ProfilePage;
