import React, { useState, useEffect } from 'react';

function SkillGap({ careerId, userId, onContinue }) {
  const [career, setCareer] = useState(null);
  const [currentSkills, setCurrentSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');

  useEffect(() => {
    if (careerId) {
      fetch(`/api/careers/${careerId}`)
        .then(res => res.json())
        .then(data => setCareer(data))
        .catch(() => {});
    }
    fetch(`/api/profiles/${userId}`)
      .then(res => res.json())
      .then(data => setCurrentSkills(data.currentSkills || []))
      .catch(() => {});
  }, [careerId, userId]);

  const addSkill = () => {
    if (skillInput && !currentSkills.includes(skillInput)) {
      setCurrentSkills([...currentSkills, skillInput]);
      setSkillInput('');
    }
  };

  const saveProfile = async () => {
    if (!career) return;
    const required = career.requiredSkills || [];
    const gap = required.filter(s => !currentSkills.includes(s));
    await fetch('/api/profiles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, currentSkills, targetCareer: career._id, gap }),
    });
    onContinue();
  };

  if (!career) return <div className="loading"><h3>Loading...</h3></div>;

  const required = career.requiredSkills || [];
  const gap = required.filter(s => !currentSkills.includes(s));
  const matchPercent = required.length ? Math.round(((required.length - gap.length) / required.length) * 100) : 0;

  return (
    <div>
      <h2>Skill Gap Analysis: {career.title}</h2>
      <div className="card">
        <div className={`gap-percent ${matchPercent >= 70 ? 'low' : matchPercent >= 40 ? 'medium' : 'high'}`}>
          {matchPercent}% Match
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: matchPercent + '%' }}>{matchPercent}%</div>
          </div>
        </div>
      </div>
      <div className="grid-2">
        <div className="card">
          <h3>Your Skills</h3>
          <div style={{ display: 'flex', gap: 8 }}>
            <input value={skillInput} onChange={e => setSkillInput(e.target.value)} placeholder="Add skill" onKeyDown={e => e.key === 'Enter' && addSkill()} />
            <button className="btn btn-secondary" onClick={addSkill}>Add</button>
          </div>
          <div className="skills" style={{ marginTop: 10 }}>
            {currentSkills.map((s, i) => <span key={i} className="skill-tag have">{s}</span>)}
            {currentSkills.length === 0 && <p style={{ color: '#888' }}>No skills added yet</p>}
          </div>
        </div>
        <div className="card">
          <h3>Required Skills</h3>
          <div className="skills">
            {required.map((s, i) => (
              <span key={i} className={`skill-tag ${currentSkills.includes(s) ? 'have' : 'missing'}`}>
                {s} {currentSkills.includes(s) ? '✓' : '✗'}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="card">
        <h3>Skill Gap ({gap.length} skills missing)</h3>
        {gap.length > 0 ? (
          <ul style={{ marginLeft: 20, color: '#721c24' }}>
            {gap.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        ) : (
          <p style={{ color: '#2ecc71' }}>You have all required skills!</p>
        )}
        <button className="btn btn-primary" style={{ marginTop: 15 }} onClick={saveProfile}>Continue to Learning Path</button>
      </div>
    </div>
  );
}

export default SkillGap;
