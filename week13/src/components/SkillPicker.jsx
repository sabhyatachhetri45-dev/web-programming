import { useState } from 'react';

const skills = ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Python'];

export default function SkillPicker() {
  const [selected, setSelected] = useState([]);

  function toggle(skill, checked) {
    setSelected((previous) =>
      checked
        ? previous.includes(skill)
          ? previous
          : [...previous, skill]
        : previous.filter((item) => item !== skill)
    );
  }

  return (
    <div className="form-stack">
      <p className="helper-text">Select your programming skills (maximum 3).</p>
      <p className="counter">Selected: {selected.length} / 3</p>
      {selected.length > 3 && (
        <p className="error-message">Please select at most 3 skills.</p>
      )}
      <div className="choice-list">
        {skills.map((skill) => (
          <label className="choice" key={skill}>
            <input
              type="checkbox"
              checked={selected.includes(skill)}
              onChange={(event) => toggle(skill, event.target.checked)}
            />
            {skill}
          </label>
        ))}
      </div>
    </div>
  );
}
