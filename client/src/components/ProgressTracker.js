import React, { useState, useEffect } from 'react';

function ProgressTracker({ userId }) {
  const [progressList, setProgressList] = useState([]);

  useEffect(() => {
    fetch(`/api/progress?userId=${userId}`)
      .then(res => res.json())
      .then(data => setProgressList(data))
      .catch(() => {});
  }, [userId]);

  return (
    <div>
      <h2>My Progress</h2>
      {progressList.length === 0 && <div className="empty-state"><h3>No progress yet. Start a learning path!</h3></div>}
      {progressList.map(p => (
        <div key={p._id} className="card">
          <h3>{p.pathId?.careerId?.title || 'Learning Path'}</h3>
          <div className="progress-bar-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
              <span>Completion</span>
              <span>{p.percentage}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: p.percentage + '%' }}>{p.percentage}%</div>
            </div>
          </div>
          <div className="progress-stats">
            <div className="stat-card">
              <div className="number">{p.completedSteps?.length || 0}</div>
              <div className="label">Steps Done</div>
            </div>
            <div className="stat-card">
              <div className="number">{p.pathId?.steps?.length || 0}</div>
              <div className="label">Total Steps</div>
            </div>
          </div>
          <p style={{ color: '#888', fontSize: '0.85rem' }}>Last updated: {new Date(p.updatedAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

export default ProgressTracker;
