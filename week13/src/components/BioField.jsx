import { useState } from 'react';

export default function BioField() {
  const [bio, setBio] = useState('');
  const max = 200;
  const remaining = max - bio.length;

  return (
    <div className="form-stack">
      <label htmlFor="bio">Write a short bio</label>
      <textarea
        id="bio"
        value={bio}
        onChange={(event) => setBio(event.target.value.slice(0, max))}
        disabled={bio.length >= max}
        rows={4}
        placeholder="Your bio"
      />
      <p className={remaining < 20 ? 'counter counter-warning' : 'counter'}>
        {bio.length} / {max} characters
      </p>
      {bio.length >= max && (
        <button type="button" className="secondary-button" onClick={() => setBio('')}>
          Reset bio
        </button>
      )}
    </div>
  );
}
