import React from 'react';

function Navbar({ activeView, setActiveView }) {
  const links = [
    { id: 'careers', label: 'Careers' },
    { id: 'gap', label: 'Skill Gap' },
    { id: 'path', label: 'Learning Path' },
    { id: 'progress', label: 'Progress' },
  ];

  return (
    <nav className="navbar">
      <h2>Career Roadmap</h2>
      <ul>
        {links.map(link => (
          <li key={link.id} className={activeView === link.id ? 'active' : ''} onClick={() => setActiveView(link.id)}>
            {link.label}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
