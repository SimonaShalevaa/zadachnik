import Avatar from "../components/Avatar";
import TaskCard from "../components/TaskCard";
import HeroStats from "../components/HeroStats";
import { CURRENT_USER } from "../data/users";
import { MY_TASKS } from "../data/tasks";

const TABS = ["Моите задачи", "Моите решения", "Запазени"];

function ProfilePage() {
  const user = CURRENT_USER;
  const stats = [
    { value: user.stats.points, label: "точки" },
    { value: user.stats.solutions, label: "решения" },
    { value: user.stats.tasks, label: "задачи" },
  ];

  return (
    <section id="profile" className="view">
      <div className="card profile">
        <Avatar user={user} size="lg" />
        <div className="profile__info">
          <h1>{user.fullName}</h1>
          <p className="muted">
            {user.grade} клас · {user.school}
          </p>
          <div className="badges">
            {user.badges.map((badge) => (
              <span key={badge} className="badge">
                {badge}
              </span>
            ))}
          </div>
        </div>
        <HeroStats stats={stats} />
      </div>
      <div className="tabs">
        {TABS.map((tab, i) => (
          <a key={tab} className={i === 0 ? "tab tab--active" : "tab"}>
            {tab}
          </a>
        ))}
      </div>
      <div className="grid">
        {MY_TASKS.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </section>
  );
}

export default ProfilePage;
