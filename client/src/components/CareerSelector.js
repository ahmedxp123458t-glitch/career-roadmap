import React, { useState, useEffect } from 'react';

function CareerSelector({ onSelect }) {
  const [careers, setCareers] = useState([]);

  useEffect(() => {
    fetch('/api/careers')
      .then(res => res.json())
      .then(data => setCareers(data))
      .catch(() => {});
  }, []);

  return (
    <div>
      <h2>Browse Careers</h2>
      <p style={{ color: '#888', marginBottom: 20 }}>Select a career to analyze your skill gap and create a learning path.</p>
      <div className="grid-3">
        {careers.map(c => (
          <div key={c._id} className="career-card" onClick={() => onSelect(c._id)}>
            <h3>{c.title}</h3>
            <p>{c.description}</p>
            <div className="salary">{c.avgSalary}</div>
            <div className="skills">
              {c.requiredSkills?.map((s, i) => <span key={i} className="skill-tag">{s}</span>)}
            </div>
            <button className="btn btn-primary" style={{ marginTop: 12 }}>Analyze Skill Gap</button>
          </div>
        ))}
        {careers.length === 0 && <div className="empty-state"><h3>No careers available</h3></div>}
      </div>
    </div>
  );
}

export default CareerSelector;
