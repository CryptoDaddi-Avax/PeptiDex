'use client';
import { goals } from '@/data/goals';
import { stacks } from '@/data/stacks';
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
          // Find the matching stack(s) for this goal
          const matchingStacks = stacks.filter((s) => goal.stackNames.includes(s.stack_name));
          const peptideCount = matchingStacks.reduce((sum, s) => sum + s.peptides.length, 0);

          return (
            <a
              key={goal.id}
              className="goal-card"
              href={`/goals/${goal.id}`}
            >
              <div className="goal-icon">{goal.icon}</div>
              <div className="goal-content">
                <h3>{goal.label}</h3>
                <p>{goal.description}</p>
                <div className="goal-meta">
                  {matchingStacks.length} stack{matchingStacks.length !== 1 ? 's' : ''} · {peptideCount} peptides
                </div>
              </div>
              <div className="goal-arrow">→</div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
