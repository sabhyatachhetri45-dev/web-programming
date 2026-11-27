import { useEffect, useState } from 'react';

const majors = [
  'Computer Engineering',
  'Computer Science',
  'Software Engineering',
  'Information Systems',
  'Data Science',
];

const initialForm = {
  name: '',
  studentId: '',
  major: majors[0],
  year: '',
  bio: '',
  photoUrl: '',
};

export default function StudentProfileEditor() {
  const [form, setForm] = useState(initialForm);
  const [skills, setSkills] = useState(['react', 'forms', 'css']);
  const [skillInput, setSkillInput] = useState('');
  const [errors, setErrors] = useState({});
  const [submittedProfile, setSubmittedProfile] = useState(null);
  const maxBioLength = 200;

  useEffect(() => {
    const photoUrl = form.photoUrl;
    return () => {
      if (photoUrl) URL.revokeObjectURL(photoUrl);
    };
  }, [form.photoUrl]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: '' }));
  }

  function handlePhotoChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    setForm((previous) => ({
      ...previous,
      photoUrl: URL.createObjectURL(file),
    }));
    setErrors((previous) => ({ ...previous, photoUrl: '' }));
  }

  function handleSkillKeyDown(event) {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    const tag = skillInput.trim().toLowerCase();
    if (tag && !skills.includes(tag)) {
      setSkills((previous) => [...previous, tag]);
    }
    setSkillInput('');
  }

  function validate() {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Name is required.';
    if (!/^\d{10}$/.test(form.studentId)) {
      nextErrors.studentId = 'Student ID must be exactly 10 digits.';
    }
    if (!form.major) nextErrors.major = 'Major is required.';
    if (!form.year) nextErrors.year = 'Please select a year (1–4).';
    if (!form.bio.trim()) {
      nextErrors.bio = 'Bio is required.';
    } else if (form.bio.length >= maxBioLength) {
      nextErrors.bio = 'Bio must be strictly under 200 characters.';
    }
    if (!form.photoUrl) nextErrors.photoUrl = 'Please upload a profile photo.';
    return nextErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmittedProfile({ ...form, skills: [...skills] });
  }

  function getInitials(fullName) {
    return fullName
      .trim()
      .split(/\s+/)
      .map((part) => part[0]?.toUpperCase())
      .slice(0, 2)
      .join('');
  }

  return (
    <div className="profile-editor">
      <form className="form-stack profile-form" onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="profile-name">Full name</label>
          <input
            id="profile-name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Kim Minho"
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>

        <div className="field">
          <label htmlFor="profile-student-id">Student ID (10 digits)</label>
          <input
            id="profile-student-id"
            type="text"
            name="studentId"
            inputMode="numeric"
            value={form.studentId}
            onChange={handleChange}
            maxLength={10}
            placeholder="e.g. 2024123456"
            aria-invalid={Boolean(errors.studentId)}
          />
          {errors.studentId && <p className="error-message">{errors.studentId}</p>}
        </div>

        <div className="field">
          <label htmlFor="profile-major">Major</label>
          <select
            id="profile-major"
            name="major"
            value={form.major}
            onChange={handleChange}
            aria-invalid={Boolean(errors.major)}
          >
            {majors.map((major) => (
              <option key={major} value={major}>
                {major}
              </option>
            ))}
          </select>
          {errors.major && <p className="error-message">{errors.major}</p>}
        </div>

        <fieldset className="field-group">
          <legend>Year</legend>
          <div className="choice-list choice-list-inline">
            {[1, 2, 3, 4].map((year) => (
              <label className="choice" key={year}>
                <input
                  type="radio"
                  name="year"
                  value={String(year)}
                  checked={form.year === String(year)}
                  onChange={handleChange}
                />
                Year {year}
              </label>
            ))}
          </div>
          {errors.year && <p className="error-message">{errors.year}</p>}
        </fieldset>

        <div className="field">
          <label htmlFor="profile-bio">Bio (under 200 characters)</label>
          <textarea
            id="profile-bio"
            name="bio"
            value={form.bio}
            onChange={handleChange}
            maxLength={maxBioLength}
            rows={4}
            aria-invalid={Boolean(errors.bio)}
          />
          <p className={form.bio.length >= maxBioLength ? 'counter counter-warning' : 'counter'}>
            {form.bio.length} / {maxBioLength}
          </p>
          {errors.bio && <p className="error-message">{errors.bio}</p>}
        </div>

        <div className="field">
          <label htmlFor="profile-photo">Profile photo</label>
          <input
            id="profile-photo"
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            aria-invalid={Boolean(errors.photoUrl)}
          />
          {form.photoUrl && (
            <img className="photo-upload-preview" src={form.photoUrl} alt="Selected profile preview" />
          )}
          {errors.photoUrl && <p className="error-message">{errors.photoUrl}</p>}
        </div>

        <div className="field">
          <label htmlFor="profile-skill-input">Skills (press Enter to add)</label>
          <input
            id="profile-skill-input"
            type="text"
            value={skillInput}
            onChange={(event) => setSkillInput(event.target.value)}
            onKeyDown={handleSkillKeyDown}
            placeholder="Type a skill and press Enter"
          />
          <div className="skill-tags">
            {skills.map((skill) => (
              <span className="skill-tag" key={skill}>
                [{skill}]
                <button
                  type="button"
                  className="remove-skill"
                  aria-label={`Remove ${skill}`}
                  onClick={() => setSkills((previous) => previous.filter((item) => item !== skill))}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <button type="submit">Save &amp; preview profile</button>
      </form>

      <aside className="profile-preview">
        <p className="preview-label">PROFILE PREVIEW</p>
        {submittedProfile ? (
          <div className="profile-preview-card">
            <div className="profile-preview-heading">
              {submittedProfile.photoUrl ? (
                <img
                  className="profile-avatar"
                  src={submittedProfile.photoUrl}
                  alt={submittedProfile.name}
                />
              ) : (
                <div className="profile-avatar profile-initials">
                  {getInitials(submittedProfile.name)}
                </div>
              )}
              <div>
                <h3>{submittedProfile.name}</h3>
                <p className="profile-detail">
                  ID {submittedProfile.studentId} · Year {submittedProfile.year}
                </p>
                <p className="profile-major">{submittedProfile.major}</p>
              </div>
            </div>
            <p className="profile-bio">{submittedProfile.bio}</p>
            <div className="skill-tags preview-skills">
              {submittedProfile.skills.map((skill) => (
                <span className="skill-tag" key={skill}>
                  [{skill}]
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="preview-placeholder">
            Complete the form and submit it to see your profile card.
          </div>
        )}
      </aside>
    </div>
  );
}
