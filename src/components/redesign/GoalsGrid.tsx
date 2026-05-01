'use client';
import { goals } from '@/data/goals';
import './GoalsGrid.css';

export default function GoalsGrid() {
  return (
    <section className="goals" id="goals">
      <div className="goals-head">
        <div className="section-label">§ Research Goals</div>
        <h2 className="section-title">
          What are you<br /><em>optimizing</em> for?
        </h2>
      </div>
      <div className="goals-grid">
        {goals.map((goal) => {
          return (
            <a
              key={goal.id}
              className="goal-card"
              href={`/best/${goal.id}`}
            >
              <div className="goal-icon">{goal.icon}</div>
              <div className="goal-content">
                <h3>{goal.label}</h3>
                <p>{goal.description}</p>
              </div>
              <div className="goal-arrow">→</div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
