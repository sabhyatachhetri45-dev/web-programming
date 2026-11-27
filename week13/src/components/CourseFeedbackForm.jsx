import { useState } from 'react';

const topicsList = ['HTML', 'CSS', 'JavaScript', 'Git', 'React'];
const ratings = ['⭐⭐⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐'];
const maxComments = 300;

export default function CourseFeedbackForm() {
  const [studentName, setStudentName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [rating, setRating] = useState('');
  const [topics, setTopics] = useState([]);
  const [comments, setComments] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const isSubmitDisabled = !studentName.trim() || !studentId.trim() || !rating;

  function handleTopicChange(topic, checked) {
    setTopics((previous) =>
      checked
        ? previous.includes(topic)
          ? previous
          : [...previous, topic]
        : previous.filter((item) => item !== topic)
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = {};

    if (!studentName.trim()) {
      nextErrors.studentName = 'Student name is required.';
    }
    if (!/^\d{8}$/.test(studentId)) {
      nextErrors.studentId = 'Student ID must be exactly 8 digits.';
    }
    if (!rating) {
      nextErrors.rating = 'Please select a rating.';
    }

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="success-message">
        <h3>Thank you, {studentName}!</h3>
        <p>Your course feedback has been recorded.</p>
        {topics.length > 0 && <p>Topics: {topics.join(', ')}</p>}
        {comments && <p>Your comment: {comments}</p>}
      </div>
    );
  }

  return (
    <form className="form-stack" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="feedback-name">Student name *</label>
        <input
          id="feedback-name"
          value={studentName}
          onChange={(event) => {
            setStudentName(event.target.value);
            setErrors((previous) => ({ ...previous, studentName: '' }));
          }}
          placeholder="Enter your name"
          aria-invalid={Boolean(errors.studentName)}
        />
        {errors.studentName && <p className="error-message">{errors.studentName}</p>}
      </div>

      <div className="field">
        <label htmlFor="feedback-id">Student ID (8 digits) *</label>
        <input
          id="feedback-id"
          type="text"
          inputMode="numeric"
          maxLength={8}
          value={studentId}
          onChange={(event) => {
            setStudentId(event.target.value);
            setErrors((previous) => ({ ...previous, studentId: '' }));
          }}
          placeholder="e.g. 20241234"
          aria-invalid={Boolean(errors.studentId)}
        />
        {errors.studentId && <p className="error-message">{errors.studentId}</p>}
      </div>

      <fieldset className="field-group">
        <legend>Rating *</legend>
        <div className="choice-list">
          {ratings.map((item) => (
            <label className="choice" key={item}>
              <input
                type="radio"
                name="rating"
                value={item}
                checked={rating === item}
                onChange={(event) => {
                  setRating(event.target.value);
                  setErrors((previous) => ({ ...previous, rating: '' }));
                }}
              />
              {item}
            </label>
          ))}
        </div>
        {errors.rating && <p className="error-message">{errors.rating}</p>}
      </fieldset>

      <fieldset className="field-group">
        <legend>Topics covered well (optional)</legend>
        <div className="choice-list choice-list-inline">
          {topicsList.map((topic) => (
            <label className="choice" key={topic}>
              <input
                type="checkbox"
                checked={topics.includes(topic)}
                onChange={(event) => handleTopicChange(topic, event.target.checked)}
              />
              {topic}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="field">
        <label htmlFor="feedback-comments">Comments</label>
        <textarea
          id="feedback-comments"
          value={comments}
          onChange={(event) => setComments(event.target.value.slice(0, maxComments))}
          rows={4}
          placeholder="Share your thoughts..."
        />
        <p className={comments.length >= maxComments ? 'counter counter-warning' : 'counter'}>
          {comments.length} / {maxComments} characters
        </p>
      </div>

      <button type="submit" disabled={isSubmitDisabled}>
        Submit feedback
      </button>
    </form>
  );
}
