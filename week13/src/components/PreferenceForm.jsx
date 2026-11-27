import { useState } from 'react';

export default function PreferenceForm() {
  const [country, setCountry] = useState('KR');
  const [bio, setBio] = useState('');
  const [agree, setAgree] = useState(false);

  return (
    <div className="form-stack">
      <div className="field">
        <label htmlFor="preference-country">Country</label>
        <select
          id="preference-country"
          value={country}
          onChange={(event) => setCountry(event.target.value)}
        >
          <option value="KR">South Korea</option>
          <option value="UZ">Uzbekistan</option>
          <option value="US">United States</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="preference-bio">Bio</label>
        <textarea
          id="preference-bio"
          value={bio}
          onChange={(event) => setBio(event.target.value)}
          rows={4}
        />
      </div>
      <label className="choice">
        <input
          type="checkbox"
          checked={agree}
          onChange={(event) => setAgree(event.target.checked)}
        />
        I agree to the preferences above
      </label>
      <p className="helper-text">
        Country: {country} · Agreement: {agree ? 'Yes' : 'No'}
      </p>
    </div>
  );
}
