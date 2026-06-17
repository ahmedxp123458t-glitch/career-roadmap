import React, { useState, useEffect } from 'react';

function LearningPath({ careerId, userId }) {
  const [path, setPath] = useState(null);
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    if (careerId) {
      fetch(`/api/learning-paths?careerId=${careerId}`)
        .then(res => res.json())
        .then(data => {
          if (data.length) setPath(data[0]);
        })
        .catch(() => {});
    }
  }, [careerId]);

  useEffect(() => {
    if (path) {
      fetch(`/api/progress?userId=${userId}&pathId=${path._id}`)
        .then(res => res.json())
        .then(data => {
          if (data.length) setProgress(data[0]);
        })
        .catch(() => {});
    }
  }, [path, userId]);

  const toggleStep = async (index) => {
    if (!path || !progress) return;
    const completed = progress.completedSteps || [];
    const updated = completed.includes(index)
      ? completed.filter(i => i !== index)
      : [...completed, index];
    const pct = Math.round((updated.length / path.steps.length) * 100);
    const res = await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, pathId: path._id, completedSteps: updated, percentage: pct }),
    });
    const data = await res.json();
    setProgress(data);
  };

  if (!path) return <div className="loading"><h3>Loading learning path...</h3></div>;

  const steps = path.steps || [];
  const completedSteps = progress?.completedSteps || [];
  const percentage = progress?.percentage || 0;

  return (
    <div>
      <h2>Learning Path: {path.careerId?.title || 'Career'}</h2>
      <div className="card">
        <div className="progress-bar-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
            <span>Progress</span>
            <span>{percentage}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: percentage + '%' }}>{percentage}%</div>
          </div>
        </div>
        <div className="progress-stats">
          <div className="stat-card">
            <div className="number">{completedSteps.length}</div>
            <div className="label">Completed</div>
          </div>
          <div className="stat-card">
            <div className="number">{steps.length}</div>
            <div className="label">Total Steps</div>
          </div>
          <div className="stat-card">
            <div className="number">{steps.length - completedSteps.length}</div>
            <div className="label">Remaining</div>
          </div>
        </div>
      </div>
      {steps.map((step, i) => (
        <div key={i} className={`card step-card ${completedSteps.includes(i) ? 'completed' : ''}`}>
          <div className="step-number">{i + 1}</div>
          <div className="step-content">
            <h4>{step.title}</h4>
            {step.duration && <p>Duration: {step.duration}</p>}
            {step.resources?.length > 0 && (
              <div className="resources">
                {step.resources.map((r, j) => <span key={j} className="resource-tag">{r}</span>)}
              </div>
            )}
          </div>
          <button
            className={`btn ${completedSteps.includes(i) ? 'btn-success' : 'btn-secondary'}`}
            onClick={() => toggleStep(i)}
          >
            {completedSteps.includes(i) ? '✓ Done' : 'Mark Done'}
          </button>
        </div>
      ))}
    </div>
  );
}

export default LearningPath;
