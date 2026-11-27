import { useState } from 'react';

const initialForm = { name: '', email: '', message: '' };

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submittedName, setSubmittedName] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: '' }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Name is required.';
    if (!form.email.trim()) nextErrors.email = 'Email is required.';
    if (!form.message.trim()) nextErrors.message = 'Message is required.';

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setSubmittedName(form.name.trim());
    setForm(initialForm);
  }

  if (submittedName) {
    return (
      <p className="success-message">
        Thank you, {submittedName}! We&apos;ll be in touch.
      </p>
    );
  }

  return (
    <form className="form-stack" onSubmit={handleSubmit} noValidate>
      {['name', 'email', 'message'].map((field) => (
        <div className="field" key={field}>
          <label htmlFor={`contact-${field}`}>
            {field === 'message' ? 'Message' : field[0].toUpperCase() + field.slice(1)}
          </label>
          {field === 'message' ? (
            <textarea
              id={`contact-${field}`}
              name={field}
              placeholder="Message"
              value={form[field]}
              onChange={handleChange}
              rows={4}
              aria-invalid={Boolean(errors[field])}
            />
          ) : (
            <input
              id={`contact-${field}`}
              name={field}
              type={field === 'email' ? 'email' : 'text'}
              placeholder={field === 'email' ? 'you@example.com' : 'Your name'}
              value={form[field]}
              onChange={handleChange}
              aria-invalid={Boolean(errors[field])}
            />
          )}
          {errors[field] && <p className="error-message">{errors[field]}</p>}
        </div>
      ))}
      <button type="submit">Send message</button>
    </form>
  );
}
