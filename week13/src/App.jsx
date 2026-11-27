import React, { useState } from 'react';
import {
  UserCheck,
  BookOpen,
  Video,
  Presentation,
  Sparkles,
  Code2,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Upload,
  X,
  RotateCcw,
  ArrowRight,
  Info,
  Send,
  Palette,
  Award,
  GraduationCap,
  Flower2,
  Compass
} from 'lucide-react';

// ============================================================================
// DECORATIVE FLORAL SVG ARTWORK (ACCESSIBLE / ARIA-HIDDEN)
// ============================================================================

function FloralBlossom({ className = 'w-12 h-12', petalColor = '#F43F5E', centerColor = '#FBBF24' }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <g opacity="0.9">
        <ellipse cx="50" cy="24" rx="14" ry="22" fill={petalColor} />
        <ellipse cx="50" cy="76" rx="14" ry="22" fill={petalColor} />
        <ellipse cx="24" cy="50" rx="22" ry="14" fill={petalColor} />
        <ellipse cx="76" cy="50" rx="22" ry="14" fill={petalColor} />
        <ellipse cx="31" cy="31" rx="13" ry="20" transform="rotate(-45 31 31)" fill={petalColor} opacity="0.85" />
        <ellipse cx="69" cy="69" rx="13" ry="20" transform="rotate(-45 69 69)" fill={petalColor} opacity="0.85" />
        <ellipse cx="69" cy="31" rx="13" ry="20" transform="rotate(45 69 31)" fill={petalColor} opacity="0.85" />
        <ellipse cx="31" cy="69" rx="13" ry="20" transform="rotate(45 31 69)" fill={petalColor} opacity="0.85" />
        <circle cx="50" cy="50" r="13" fill={centerColor} />
        <circle cx="50" cy="50" r="7" fill="#FEF3C7" />
      </g>
    </svg>
  );
}

function FloralVineDivider({ accent = 'rose' }) {
  const strokeMap = {
    rose: '#FDA4AF',
    emerald: '#6EE7B7',
    amber: '#FCD34D',
    sky: '#7DD3FC',
  };
  const petalMap = {
    rose: '#FB7185',
    emerald: '#34D399',
    amber: '#FBBF24',
    sky: '#38BDF8',
  };
  const stroke = strokeMap[accent] || strokeMap.rose;
  const petal = petalMap[accent] || petalMap.rose;

  return (
    <div className="flex items-center justify-center gap-3 my-2 select-none" aria-hidden="true">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-rose-200 to-rose-300" />
      <svg width="88" height="24" viewBox="0 0 88 24" fill="none">
        <path d="M4 12C20 4 32 20 44 12C56 4 68 20 84 12" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
        <circle cx="44" cy="12" r="5" fill={petal} />
        <circle cx="44" cy="12" r="2" fill="#FEF08A" />
        <ellipse cx="24" cy="9" rx="4" ry="2.2" transform="rotate(-20 24 9)" fill={stroke} />
        <ellipse cx="64" cy="15" rx="4" ry="2.2" transform="rotate(-20 64 15)" fill={stroke} />
      </svg>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-rose-200 to-rose-300" />
    </div>
  );
}

// ============================================================================
// ACCENT THEME DEFINITIONS (BOTANICAL & JEWEL PALETTES)
// ============================================================================

const ACCENT_THEMES = {
  rose: {
    id: 'rose',
    name: 'Sakura Rose',
    swatch: 'bg-rose-500',
    heroGradient: 'from-rose-600 via-pink-600 to-fuchsia-600',
    activePill: 'bg-rose-600 text-white border-rose-600 shadow-sm shadow-rose-500/20',
    progressFill: 'bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400',
    focusBorder: 'focus:border-rose-500 focus:ring-2 focus:ring-rose-500/25',
    primaryBtn: 'bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white shadow-md shadow-rose-500/20',
    cardHeaderGradient: 'from-rose-600 via-pink-600 to-amber-500',
  },
  indigo: {
    id: 'indigo',
    name: 'Wisteria Indigo',
    swatch: 'bg-indigo-600',
    heroGradient: 'from-indigo-600 via-violet-600 to-purple-600',
    activePill: 'bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-500/20',
    progressFill: 'bg-gradient-to-r from-indigo-600 to-violet-500',
    focusBorder: 'focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20',
    primaryBtn: 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-md shadow-indigo-500/20',
    cardHeaderGradient: 'from-indigo-600 via-violet-600 to-purple-600',
  },
  emerald: {
    id: 'emerald',
    name: 'Botanical Mint',
    swatch: 'bg-emerald-600',
    heroGradient: 'from-emerald-600 via-teal-600 to-cyan-600',
    activePill: 'bg-emerald-600 text-white border-emerald-600 shadow-sm shadow-emerald-500/20',
    progressFill: 'bg-gradient-to-r from-emerald-600 to-teal-500',
    focusBorder: 'focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20',
    primaryBtn: 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-md shadow-emerald-500/20',
    cardHeaderGradient: 'from-emerald-600 via-teal-600 to-cyan-600',
  },
  cyan: {
    id: 'cyan',
    name: 'Hydrangea Sky',
    swatch: 'bg-sky-600',
    heroGradient: 'from-sky-600 via-cyan-600 to-blue-600',
    activePill: 'bg-sky-600 text-white border-sky-600 shadow-sm shadow-sky-500/20',
    progressFill: 'bg-gradient-to-r from-sky-600 to-cyan-500',
    focusBorder: 'focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20',
    primaryBtn: 'bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-500 hover:to-cyan-500 text-white shadow-md shadow-sky-500/20',
    cardHeaderGradient: 'from-sky-600 via-cyan-600 to-blue-600',
  },
};

// ============================================================================
// CODE SNIPPETS DATA
// ============================================================================

const CODE_SNIPPETS = {
  studentEditor: `import React, { useState } from 'react';

const MAJORS = [
  'Computer Science',
  'Computer Engineering',
  'Software Engineering',
  'Information Systems',
  'Data Science',
];

export default function StudentProfileEditor() {
  const [form, setForm] = useState({
    name: '',
    studentId: '',
    major: MAJORS[0],
    year: '',
    bio: '',
    photoUrl: '',
  });
  const [skills, setSkills] = useState(['react', 'javascript', 'css', 'python']);
  const [skillInput, setSkillInput] = useState('');
  const [errors, setErrors] = useState({});
  const [submittedProfile, setSubmittedProfile] = useState(null);

  const MAX_BIO = 200;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  }

  function handlePhotoChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setForm((prev) => ({ ...prev, photoUrl: URL.createObjectURL(file) }));
    setErrors((prev) => ({ ...prev, photoUrl: '' }));
  }

  function handleSkillKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const tag = skillInput.trim().toLowerCase();
      if (tag && !skills.includes(tag)) {
        setSkills((prev) => [...prev, tag]);
      }
      setSkillInput('');
    }
  }

  function removeSkill(skillToRemove) {
    setSkills((prev) => prev.filter((s) => s !== skillToRemove));
  }

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required.';
    if (!/^\\d{10}$/.test(form.studentId)) errs.studentId = 'Student ID must be 10 digits.';
    if (!form.major) errs.major = 'Major is required.';
    if (!form.year) errs.year = 'Select a year (1–4).';
    if (!form.bio.trim()) errs.bio = 'Bio is required.';
    else if (form.bio.length >= MAX_BIO) errs.bio = 'Bio must be under 200 chars.';
    if (!form.photoUrl) errs.photoUrl = 'Please upload a photo.';
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmittedProfile({ ...form, skills: [...skills] });
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Controlled inputs, validation & Profile Preview card */}
    </form>
  );
}`,
  ex1: `function BioField() {
  const [bio, setBio] = useState('');
  const MAX = 200;
  const remaining = MAX - bio.length;

  return (
    <div>
      <textarea
        value={bio}
        onChange={e => setBio(e.target.value.slice(0, MAX))}
        disabled={bio.length >= MAX}
        rows={4}
        placeholder="Your bio"
      />
      <p style={{ color: remaining < 20 ? 'red' : 'gray', fontSize: 13 }}>
        {bio.length} / {MAX}
      </p>
      {bio.length >= MAX && (
        <button type="button" onClick={() => setBio('')}>Reset Bio</button>
      )}
    </div>
  );
}`,
  ex2: `function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submittedName, setSubmittedName] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    setErrors(p => ({ ...p, [name]: '' }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim())    errs.name    = 'Name is required';
    if (!form.email.trim())   errs.email   = 'Email is required';
    if (!form.message.trim()) errs.message = 'Message is required';
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setSubmittedName(form.name);
    setForm({ name: '', email: '', message: '' });
  }

  if (submittedName) return <p>Thank you, {submittedName}! We'll be in touch.</p>;

  return (
    <form onSubmit={handleSubmit}>
      {['name','email','message'].map(field => (
        <div key={field}>
          {field === 'message'
            ? <textarea name={field} value={form[field]} onChange={handleChange} rows={4} />
            : <input name={field} value={form[field]} onChange={handleChange} />
          }
          {errors[field] && <p style={{color:'red',fontSize:13}}>{errors[field]}</p>}
        </div>
      ))}
      <button type="submit">Send</button>
    </form>
  );
}`,
  ex3: `const SKILLS = ['HTML','CSS','JavaScript','React','Node.js','Python'];

function SkillPicker() {
  const [selected, setSelected] = useState([]);

  function toggle(skill, checked) {
    setSelected(prev => checked ? [...prev, skill] : prev.filter(s => s !== skill));
  }

  return (
    <div>
      <p>Selected: {selected.length} / 3</p>
      {selected.length > 3 && <p style={{color:'red'}}>Please select at most 3 skills.</p>}
      {SKILLS.map(skill => (
        <label key={skill}>
          <input
            type="checkbox"
            checked={selected.includes(skill)}
            onChange={e => toggle(skill, e.target.checked)}
          />
          {skill}
        </label>
      ))}
    </div>
  );
}`,
  feedbackForm: `function CourseFeedbackForm() {
  const [studentName, setStudentName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [rating, setRating] = useState('');
  const [topics, setTopics] = useState([]);
  const [comments, setComments] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const MAX_COMMENTS = 300;
  const isSubmitDisabled = !studentName.trim() || !studentId.trim() || !rating;

  function handleSubmit(e) {
    e.preventDefault();
    const errs = {};
    if (!studentName.trim()) errs.studentName = 'Student Name is required.';
    if (!/^\\d{8}$/.test(studentId)) errs.studentId = 'Student ID must be 8 digits.';
    if (!rating) errs.rating = 'Please select a rating.';
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitted(true);
  }

  if (submitted) return <h3>Thank you, {studentName}!</h3>;
  // ... form JSX
}`,
  slide6: `function SearchBar() {
  const [query, setQuery] = useState('');

  return (
    <div>
      <input
        type="text"
        value={query}                               // React controls value
        onChange={e => setQuery(e.target.value)}    // update state on change
        placeholder="Search..."
      />
      <p>Searching for: "{query}"</p>

      {/* Real-time character count: only possible with controlled input */}
      <span>{query.length} / 100 characters</span>

      {/* Clear programmatically */}
      <button onClick={() => setQuery('')}>Clear</button>
    </div>
  );
}`,
  slide9: `function PreferenceForm() {
  const [country, setCountry] = useState('KR');
  const [bio, setBio]         = useState('');
  const [agree, setAgree]     = useState(false);

  return (
    <form>
      {/* Select: value on <select>, NOT on <option> */}
      <select value={country} onChange={e => setCountry(e.target.value)}>
        <option value="KR">South Korea</option>
        <option value="UZ">Uzbekistan</option>
        <option value="US">United States</option>
      </select>

      {/* Textarea: same pattern as <input> */}
      <textarea value={bio} onChange={e => setBio(e.target.value)} rows={4} />

      {/* Checkbox: use checked, not value */}
      <input
        type="checkbox"
        checked={agree}
        onChange={e => setAgree(e.target.checked)}
      />
    </form>
  );
}`,
  slide20: `function LoginForm() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus]     = useState('idle'); // 4 states

  const handleSubmit = async (e) => {
    e.preventDefault(); // <- stop browser's default page reload
    setStatus('loading');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) throw new Error('Invalid credentials');
      setStatus('success');
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <input value={password} onChange={e => setPassword(e.target.value)} />
      <button disabled={status === 'loading'}>
        {status === 'loading' ? 'Logging in...' : 'Log In'}
      </button>
      {status === 'error' && <p>Login failed. Check your credentials.</p>}
    </form>
  );
}`
};

// ============================================================================
// REUSABLE UTILITY COMPONENTS
// ============================================================================

function CopyButton({ text, label = 'Copy Code', variant = 'light' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const baseStyles =
    variant === 'dark'
      ? 'bg-slate-800 hover:bg-slate-700 text-slate-100 border-slate-700'
      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-xs';

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${baseStyles}`}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-600" />
          <span className="text-emerald-600">Copied!</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5 text-indigo-600" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}

function CodeDrawer({ title, code, accentClass = 'text-indigo-600 hover:text-indigo-700' }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-5 border-t border-slate-200/80 pt-3.5">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={`inline-flex items-center gap-2 text-xs font-bold transition-colors cursor-pointer ${accentClass}`}
        >
          <Code2 className="w-4 h-4" />
          {open ? `Hide Source Code` : `View Source Code (${title})`}
        </button>
        {open && <CopyButton text={code} />}
      </div>
      {open && (
        <pre className="mt-3 p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-xs overflow-x-auto font-mono leading-relaxed shadow-inner">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}

// ============================================================================
// TAB 1: STUDENT PROFILE EDITOR (MAIN HOMEWORK)
// ============================================================================

const MAJORS = [
  'Computer Science',
  'Computer Engineering',
  'Software Engineering',
  'Information Systems',
  'Data Science',
];

const SABHYATA_AVATAR_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23E11D48"/><stop offset="100%" stop-color="%237C3AED"/></linearGradient></defs><rect width="120" height="120" fill="url(%23g)"/><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="sans-serif" font-size="40" font-weight="bold">SC</text></svg>`;

const SABHYATA_DEFAULT_PROFILE = {
  name: 'Sabhyata Chhetri',
  studentId: '2025394780',
  major: 'Computer Science',
  year: '2',
  bio: 'Computer Science student at Gachon University building accessible, responsive web applications with React, JavaScript, and Python.',
  photoUrl: SABHYATA_AVATAR_SVG,
  skills: ['react', 'javascript', 'css', 'python'],
};

const SKILL_PILL_STYLES = [
  'bg-indigo-50 text-indigo-700 border-indigo-200',
  'bg-emerald-50 text-emerald-700 border-emerald-200',
  'bg-sky-50 text-sky-700 border-sky-200',
  'bg-purple-50 text-purple-700 border-purple-200',
  'bg-amber-50 text-amber-800 border-amber-200',
  'bg-rose-50 text-rose-700 border-rose-200',
];

function StudentProfileEditorView({ theme }) {
  const [form, setForm] = useState({
    name: '',
    studentId: '',
    major: MAJORS[0],
    year: '',
    bio: '',
    photoUrl: '',
  });
  const [skills, setSkills] = useState(['react', 'javascript', 'css', 'python']);
  const [skillInput, setSkillInput] = useState('');
  const [errors, setErrors] = useState({});
  const [submittedProfile, setSubmittedProfile] = useState(null);
  const [showCodeModal, setShowCodeModal] = useState(false);

  const MAX_BIO = 200;

  // Calculate live completion percentage across 6 required fields
  const completedSteps = [
    form.name.trim().length > 0,
    /^\d{10}$/.test(form.studentId),
    Boolean(form.major),
    Boolean(form.year),
    form.bio.trim().length > 0 && form.bio.length < MAX_BIO,
    Boolean(form.photoUrl),
  ].filter(Boolean).length;
  const completionPct = Math.round((completedSteps / 6) * 100);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  }

  function handlePhotoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setForm((prev) => ({ ...prev, photoUrl: objectUrl }));
    setErrors((prev) => ({ ...prev, photoUrl: '' }));
  }

  function handleSkillKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const tag = skillInput.trim().toLowerCase();
      if (tag && !skills.includes(tag)) {
        setSkills((prev) => [...prev, tag]);
      }
      setSkillInput('');
    }
  }

  function removeSkill(skillToRemove) {
    setSkills((prev) => prev.filter((s) => s !== skillToRemove));
  }

  function fillDemoData() {
    setForm({
      name: SABHYATA_DEFAULT_PROFILE.name,
      studentId: SABHYATA_DEFAULT_PROFILE.studentId,
      major: SABHYATA_DEFAULT_PROFILE.major,
      year: SABHYATA_DEFAULT_PROFILE.year,
      bio: SABHYATA_DEFAULT_PROFILE.bio,
      photoUrl: SABHYATA_DEFAULT_PROFILE.photoUrl,
    });
    setSkills([...SABHYATA_DEFAULT_PROFILE.skills]);
    setErrors({});
  }

  function handleResetForm() {
    setForm({
      name: '',
      studentId: '',
      major: MAJORS[0],
      year: '',
      bio: '',
      photoUrl: '',
    });
    setSkills(['react', 'javascript', 'css', 'python']);
    setSkillInput('');
    setErrors({});
    setSubmittedProfile(null);
  }

  function validate() {
    const errs = {};
    if (!form.name.trim()) {
      errs.name = 'Full name is required.';
    }
    if (!/^\d{10}$/.test(form.studentId)) {
      errs.studentId = 'Student ID must be exactly 10 digits.';
    }
    if (!form.major) {
      errs.major = 'Please select a major.';
    }
    if (!form.year) {
      errs.year = 'Please select your academic year (1–4).';
    }
    if (!form.bio.trim()) {
      errs.bio = 'Bio is required.';
    } else if (form.bio.length >= MAX_BIO) {
      errs.bio = 'Bio must be strictly under 200 characters.';
    }
    if (!form.photoUrl) {
      errs.photoUrl = 'Please upload a profile photo (or click Fill Demo Data).';
    }
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmittedProfile({ ...form, skills: [...skills] });
  }

  function getInitials(fullName) {
    if (!fullName.trim()) return 'SC';
    return fullName
      .trim()
      .split(/\s+/)
      .map((part) => part[0]?.toUpperCase())
      .slice(0, 2)
      .join('');
  }

  const activeProfileData = submittedProfile || {
    name: form.name || SABHYATA_DEFAULT_PROFILE.name,
    studentId: form.studentId || SABHYATA_DEFAULT_PROFILE.studentId,
    major: form.major,
    year: form.year || SABHYATA_DEFAULT_PROFILE.year,
    bio: form.bio || SABHYATA_DEFAULT_PROFILE.bio,
    photoUrl: form.photoUrl || SABHYATA_DEFAULT_PROFILE.photoUrl,
    skills: skills,
  };

  const profileJsonString = JSON.stringify(
    {
      name: activeProfileData.name,
      studentId: activeProfileData.studentId,
      major: activeProfileData.major,
      year: Number(activeProfileData.year),
      university: 'Gachon University',
      bio: activeProfileData.bio,
      skills: activeProfileData.skills,
    },
    null,
    2
  );

  return (
    <div className="space-y-6">
      {/* Informative Learning Banner with Floral Accents */}
      <div className="relative overflow-hidden bg-gradient-to-br from-rose-50/90 via-white to-indigo-50/80 border border-rose-200/90 rounded-2xl p-6 shadow-sm">
        <FloralBlossom
          className="w-24 h-24 absolute -top-5 -right-5 opacity-20 pointer-events-none rotate-12"
          petalColor="#F43F5E"
          centerColor="#FBBF24"
        />
        <FloralBlossom
          className="w-16 h-16 absolute -bottom-4 right-28 opacity-15 pointer-events-none -rotate-12"
          petalColor="#A855F7"
          centerColor="#FDE047"
        />

        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 border border-rose-200 text-rose-800 text-xs font-bold">
              <Flower2 className="w-3.5 h-3.5 text-rose-600" />
              <span>Main Homework Deliverable · Student Management Form</span>
            </div>
            <h2
              id="section-student-editor"
              tabIndex={-1}
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight scroll-mt-36 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 rounded-lg"
            >
              1. Student Profile Editor
            </h2>
            <p className="text-sm text-slate-700 max-w-3xl leading-relaxed">
              Combines <strong className="text-slate-900">controlled text, select, and radio inputs</strong>,{' '}
              <strong className="text-slate-900">10-digit Student ID regex validation</strong>,{' '}
              <code className="text-rose-700 bg-rose-100/80 px-1.5 py-0.5 rounded font-mono text-xs">
                URL.createObjectURL()
              </code>{' '}
              photo previews, <strong className="text-slate-900">keyboard skill tags</strong> (press{' '}
              <kbd className="bg-white px-1.5 py-0.5 rounded text-xs border border-slate-300 shadow-2xs">Enter</kbd> to add,{' '}
              <kbd className="bg-white px-1.5 py-0.5 rounded text-xs border border-slate-300 shadow-2xs">×</kbd> to remove), and a live character meter strictly under 200 characters.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={fillDemoData}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white hover:bg-rose-50 text-rose-700 border border-rose-200 shadow-xs transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-rose-600" />
              Fill Demo Data (Sabhyata)
            </button>
            <button
              type="button"
              onClick={handleResetForm}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-xs transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              Reset
            </button>
            <button
              type="button"
              onClick={() => setShowCodeModal(!showCodeModal)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-sm transition-all cursor-pointer"
            >
              <Code2 className="w-3.5 h-3.5" />
              {showCodeModal ? 'Hide Code' : 'Inspect Component Code'}
            </button>
          </div>
        </div>

        {/* Collapsible Source Code Drawer */}
        {showCodeModal && (
          <div className="mt-5 pt-4 border-t border-indigo-200/70">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-semibold text-indigo-900">
                StudentProfileEditor.jsx
              </span>
              <CopyButton text={CODE_SNIPPETS.studentEditor} />
            </div>
            <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-xs overflow-x-auto font-mono max-h-80 leading-relaxed">
              <code>{CODE_SNIPPETS.studentEditor}</code>
            </pre>
          </div>
        )}
      </div>

      {/* Main Two-Column Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        {/* Left Column: Student Form (7 cols) */}
        <form
          onSubmit={handleSubmit}
          aria-labelledby="form-heading-editor"
          className="lg:col-span-7 bg-white border border-rose-200/80 rounded-2xl p-6 sm:p-7 space-y-5 shadow-md shadow-rose-900/5"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 id="form-heading-editor" className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <Flower2 className="w-5 h-5 text-rose-500" />
              <span>Student Information Form</span>
            </h3>
            <span className="text-xs font-semibold text-slate-500">All fields required (*)</span>
          </div>

          {/* Animated Form Completion Progress Bar */}
          <div className="bg-rose-50/60 border border-rose-200/70 rounded-xl p-3.5">
            <div className="flex items-center justify-between text-xs font-bold mb-1.5">
              <span className="text-slate-800">Profile Completion Progress</span>
              <span className="text-rose-700 font-mono">
                {completedSteps} / 6 fields ready ({completionPct}%)
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ease-out rounded-full ${theme.progressFill}`}
                style={{ width: `${completionPct}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Full Name <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Sabhyata Chhetri"
                className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50/70 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:bg-white focus:outline-none transition-all ${theme.focusBorder}`}
              />
              {errors.name && (
                <p className="mt-1.5 text-xs font-medium text-rose-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.name}
                </p>
              )}
            </div>

            {/* Student ID (10 digits) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Student ID (10 digits) <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                name="studentId"
                value={form.studentId}
                onChange={handleChange}
                maxLength={10}
                placeholder="e.g. 2025394780"
                className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50/70 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm font-mono focus:bg-white focus:outline-none transition-all ${theme.focusBorder}`}
              />
              {errors.studentId && (
                <p className="mt-1.5 text-xs font-medium text-rose-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.studentId}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Major Dropdown */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Major <span className="text-rose-600">*</span>
              </label>
              <select
                name="major"
                value={form.major}
                onChange={handleChange}
                className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50/70 border border-slate-300 text-slate-900 text-sm font-medium focus:bg-white focus:outline-none transition-all ${theme.focusBorder}`}
              >
                {MAJORS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              {errors.major && (
                <p className="mt-1.5 text-xs font-medium text-rose-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.major}
                </p>
              )}
            </div>

            {/* Year Radio Buttons (1-4) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Academic Year <span className="text-rose-600">*</span>
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((yr) => {
                  const active = form.year === String(yr);
                  return (
                    <label
                      key={yr}
                      className={`flex items-center justify-center py-2.5 px-2 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                        active
                          ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                          : 'bg-slate-50 border-slate-300 text-slate-700 hover:bg-indigo-50/60 hover:border-indigo-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="year"
                        value={String(yr)}
                        checked={active}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      Yr {yr}
                    </label>
                  );
                })}
              </div>
              {errors.year && (
                <p className="mt-1.5 text-xs font-medium text-rose-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.year}
                </p>
              )}
            </div>
          </div>

          {/* Bio with Live Character Counter & Color Meter */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Bio (Under 200 chars) <span className="text-rose-600">*</span>
              </label>
              <span
                className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${
                  form.bio.length >= MAX_BIO
                    ? 'bg-rose-100 text-rose-700'
                    : form.bio.length > 165
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                bio: {form.bio.length} / {MAX_BIO}
              </span>
            </div>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={3}
              placeholder="Write a brief introduction about your interests and coursework..."
              className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50/70 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:bg-white focus:outline-none transition-all ${theme.focusBorder}`}
            />
            {errors.bio && (
              <p className="mt-1.5 text-xs font-medium text-rose-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.bio}
              </p>
            )}
          </div>

          {/* Photo File Upload + Live Preview */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Profile Photo <span className="text-rose-600">*</span>
            </label>
            <div className="flex flex-wrap items-center gap-4">
              <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 text-xs font-bold cursor-pointer transition-colors">
                <Upload className="w-4 h-4 text-indigo-600" />
                <span>Upload Student Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </label>
              {form.photoUrl && (
                <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">
                  <img
                    src={form.photoUrl}
                    alt="Thumbnail preview"
                    className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-xs"
                  />
                  <span className="text-xs text-emerald-700 font-bold">Photo attached</span>
                </div>
              )}
            </div>
            {errors.photoUrl && (
              <p className="mt-1.5 text-xs font-medium text-rose-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.photoUrl}
              </p>
            )}
          </div>

          {/* Stretch Goal: Skills Tags */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Skills Tags{' '}
              <span className="text-slate-500 font-normal normal-case">
                (Press Enter to add, × to remove)
              </span>
            </label>
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleSkillKeyDown}
              placeholder="Type a skill (e.g. typescript, tailwind) and press Enter..."
              className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50/70 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:bg-white focus:outline-none transition-all ${theme.focusBorder}`}
            />
            <div className="flex flex-wrap gap-2 mt-3">
              {skills.map((skill, idx) => {
                const pillStyle = SKILL_PILL_STYLES[idx % SKILL_PILL_STYLES.length];
                return (
                  <span
                    key={skill}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-mono font-bold shadow-2xs transition-transform hover:scale-105 ${pillStyle}`}
                  >
                    [{skill}]
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      aria-label={`Remove ${skill}`}
                      className="hover:opacity-70 transition-opacity cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-3.5 px-5 rounded-xl font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${theme.primaryBtn}`}
          >
            <UserCheck className="w-4 h-4" />
            Validate &amp; Generate Digital Student ID Card
          </button>
        </form>

        {/* Right Column: Holographic Digital University Student ID Card (5 cols) */}
        <div className="lg:col-span-5 space-y-4 sticky top-36">
          <div className="flex items-center justify-between px-1">
            <h3 id="preview-heading-card" className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <Flower2 className="w-5 h-5 text-pink-500" />
              <span>Live Student ID Preview</span>
            </h3>
            <span className="text-xs font-semibold text-rose-600">Auto-updating card</span>
          </div>

          {/* Holographic Outer Frame */}
          <div className="p-1 rounded-3xl bg-gradient-to-br from-rose-500 via-fuchsia-500 to-indigo-500 shadow-xl shadow-rose-500/15">
            <div className="bg-white rounded-[22px] overflow-hidden relative">
              <FloralBlossom
                className="w-20 h-20 absolute bottom-2 right-2 opacity-10 pointer-events-none"
                petalColor="#F43F5E"
                centerColor="#F59E0B"
              />
              {/* Gradient University Card Header */}
              <div className={`bg-gradient-to-r ${theme.cardHeaderGradient} px-6 py-4 text-white flex items-center justify-between`}>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/85">
                    WEB PROGRAMMING · K0126_002
                  </p>
                  <h4 className="text-sm font-extrabold tracking-wide">
                    DIGITAL STUDENT ID CARD
                  </h4>
                </div>
                {submittedProfile ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-xs text-white text-xs font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-full bg-black/20 text-white/90 text-[11px] font-semibold">
                    Live Draft
                  </span>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6">
                <div className="flex items-center gap-4">
                  {/* Avatar with Gradient Ring */}
                  <div className="p-1 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 shrink-0 shadow-md">
                    {activeProfileData.photoUrl ? (
                      <img
                        src={activeProfileData.photoUrl}
                        alt="Student avatar"
                        className="w-16 h-16 rounded-full object-cover bg-white border-2 border-white"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-slate-900 text-white flex items-center justify-center font-extrabold text-xl border-2 border-white">
                        {getInitials(activeProfileData.name)}
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="text-xl font-extrabold text-slate-900 truncate">
                      {activeProfileData.name}
                    </h4>
                    <p className="text-xs font-mono font-semibold text-slate-500 mt-0.5">
                      ID {activeProfileData.studentId} · Year {activeProfileData.year}
                    </p>
                    <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                      <span className="inline-block px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-bold">
                        {activeProfileData.major}
                      </span>
                      <span className="inline-block px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200 text-[11px] font-semibold">
                        Gachon Univ.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bio Quote Box */}
                <div className="mt-5 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                    <span>STUDENT BIO</span>
                    <span>bio: {activeProfileData.bio.length} / 200</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {activeProfileData.bio}
                  </p>
                </div>

                {/* Skill Chips */}
                <div className="mt-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Verified Technical Skills
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProfileData.skills.map((skill, idx) => (
                      <span
                        key={skill}
                        className={`px-2.5 py-0.5 rounded-md border text-xs font-mono font-bold ${
                          SKILL_PILL_STYLES[idx % SKILL_PILL_STYLES.length]
                        }`}
                      >
                        [{skill}]
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-slate-400 font-medium">
                    {submittedProfile ? 'Official Submission Ready' : 'Submit form to lock card'}
                  </span>
                  <CopyButton text={profileJsonString} label="Copy Profile JSON" />
                </div>
              </div>
            </div>
          </div>

          {submittedProfile && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 shadow-xs">
              <Award className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>All validation checks passed! Profile Preview card updated.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// TAB 2: STUDY GUIDE (EXERCISES 1–3) — EMERALD & TEAL THEME
// ============================================================================

function StudyGuideView() {
  // Exercise 1 State
  const [bio, setBio] = useState('');
  const MAX_BIO = 200;
  const remaining = MAX_BIO - bio.length;
  const bioPercent = Math.min(100, Math.round((bio.length / MAX_BIO) * 100));

  // Exercise 2 State
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactErrors, setContactErrors] = useState({});
  const [submittedContactName, setSubmittedContactName] = useState('');

  // Exercise 3 State
  const SKILL_LIST = ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Python'];
  const [selectedSkills, setSelectedSkills] = useState([]);

  function handleContactChange(e) {
    const { name, value } = e.target;
    setContactForm((p) => ({ ...p, [name]: value }));
    setContactErrors((p) => ({ ...p, [name]: '' }));
  }

  function handleContactSubmit(e) {
    e.preventDefault();
    const errs = {};
    if (!contactForm.name.trim()) errs.name = 'Name is required';
    if (!contactForm.email.trim()) errs.email = 'Email is required';
    if (!contactForm.message.trim()) errs.message = 'Message is required';
    if (Object.keys(errs).length) {
      setContactErrors(errs);
      return;
    }
    setSubmittedContactName(contactForm.name);
    setContactForm({ name: '', email: '', message: '' });
  }

  function toggleSkill(skill, checked) {
    setSelectedSkills((prev) =>
      checked ? [...prev, skill] : prev.filter((s) => s !== skill)
    );
  }

  return (
    <div className="space-y-6">
      {/* Informative Overview Banner (Emerald & Teal with Botanical Accents) */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50/80 border border-emerald-200 rounded-2xl p-6 shadow-sm">
        <FloralBlossom
          className="w-24 h-24 absolute -top-5 -right-5 opacity-20 pointer-events-none"
          petalColor="#10B981"
          centerColor="#FBBF24"
        />
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold mb-2">
          <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
          <span>Study Guide · Exercises 1~3 Practice Labs</span>
        </div>
        <h2
          id="section-study-guide"
          tabIndex={-1}
          className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight scroll-mt-36 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg"
        >
          2. Study Guide: Exercises 1 to 3
        </h2>
        <p className="text-sm text-slate-700 mt-1.5 max-w-3xl leading-relaxed">
          Master the three core Study Guide exercises: capping character counts with conditional{' '}
          <code className="text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded font-mono text-xs">disabled</code>{' '}
          states, managing multi-field form state with inline validation &amp; reset, and toggling array selections via checkboxes.
        </p>

        {/* Sub-heading Quick Links */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-emerald-200/70">
          <span className="text-xs font-bold text-emerald-900">Jump to Exercise:</span>
          <a href="#sg-ex-1" className="px-3 py-1 rounded-lg bg-white hover:bg-emerald-100 border border-emerald-200 text-xs font-bold text-emerald-800 transition-colors">
            Ex 1: Controlled Bio
          </a>
          <a href="#sg-ex-2" className="px-3 py-1 rounded-lg bg-white hover:bg-emerald-100 border border-emerald-200 text-xs font-bold text-emerald-800 transition-colors">
            Ex 2: Contact Form
          </a>
          <a href="#sg-ex-3" className="px-3 py-1 rounded-lg bg-white hover:bg-emerald-100 border border-emerald-200 text-xs font-bold text-emerald-800 transition-colors">
            Ex 3: Skill Picker
          </a>
        </div>
      </div>

      {/* 3 Exercises Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Exercise 1 */}
        <div id="sg-ex-1" className="scroll-mt-36 bg-white border border-emerald-200/80 rounded-2xl p-6 flex flex-col justify-between shadow-md shadow-emerald-900/5 hover:shadow-lg transition-shadow">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">
                Exercise 1
              </span>
              <span className="text-xs font-mono text-slate-400">BioField.jsx</span>
            </div>
            <h3 className="text-lg font-extrabold text-slate-900">
              Controlled Bio &amp; Auto-Disable
            </h3>
            <p className="text-xs text-slate-600 mt-1 mb-4 leading-relaxed">
              Caps input at 200 characters, turns the meter red when fewer than 20 characters remain, and disables the{' '}
              <code className="text-emerald-700 font-mono">&lt;textarea&gt;</code> at 200 characters.
            </p>

            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value.slice(0, MAX_BIO))}
              disabled={bio.length >= MAX_BIO}
              rows={4}
              placeholder="Type your bio (auto-disables at 200 characters)..."
              className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm placeholder-slate-400 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 disabled:bg-rose-50/60 disabled:border-rose-200 disabled:text-slate-500 disabled:cursor-not-allowed transition-all"
            />

            {/* Color-Shifting Progress Meter */}
            <div className="mt-3 space-y-1.5">
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 rounded-full ${
                    bio.length >= MAX_BIO
                      ? 'bg-rose-500'
                      : remaining < 20
                      ? 'bg-amber-500'
                      : 'bg-emerald-500'
                  }`}
                  style={{ width: `${bioPercent}%` }}
                />
              </div>
              <div className="flex items-center justify-between">
                <p
                  className={`text-xs font-mono font-bold ${
                    remaining < 20 ? 'text-rose-600' : 'text-slate-600'
                  }`}
                >
                  {bio.length} / {MAX_BIO} {bio.length >= MAX_BIO && '(Limit reached — disabled)'}
                </p>
                {bio.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setBio('')}
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset
                  </button>
                )}
              </div>
            </div>
          </div>

          <CodeDrawer
            title="BioField"
            code={CODE_SNIPPETS.ex1}
            accentClass="text-emerald-700 hover:text-emerald-800"
          />
        </div>

        {/* Exercise 2 */}
        <div id="sg-ex-2" className="scroll-mt-36 bg-white border border-emerald-200/80 rounded-2xl p-6 flex flex-col justify-between shadow-md shadow-emerald-900/5 hover:shadow-lg transition-shadow">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="px-2.5 py-0.5 rounded-md bg-teal-100 text-teal-800 text-xs font-bold">
                Exercise 2
              </span>
              <span className="text-xs font-mono text-slate-400">ContactForm.jsx</span>
            </div>
            <h3 className="text-lg font-extrabold text-slate-900">
              Contact Form &amp; Validation
            </h3>
            <p className="text-xs text-slate-600 mt-1 mb-4 leading-relaxed">
              Validates Name, Email, and Message on submit, displays inline errors next to empty fields, shows a Thank You banner, and resets inputs.
            </p>

            {submittedContactName ? (
              <div className="p-5 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 text-emerald-900 space-y-3">
                <div className="flex items-center gap-2 text-emerald-700 font-extrabold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Thank you, {submittedContactName}!</span>
                </div>
                <p className="text-xs text-emerald-800">
                  We&apos;ll be in touch shortly. The form fields have been reset.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmittedContactName('')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" /> Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-3">
                {['name', 'email', 'message'].map((field) => (
                  <div key={field}>
                    {field === 'message' ? (
                      <textarea
                        name={field}
                        value={contactForm[field]}
                        onChange={handleContactChange}
                        rows={3}
                        placeholder="Your message"
                        className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm placeholder-slate-400 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                      />
                    ) : (
                      <input
                        name={field}
                        value={contactForm[field]}
                        onChange={handleContactChange}
                        placeholder={field === 'name' ? 'Your Name' : 'Your Email'}
                        className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm placeholder-slate-400 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                      />
                    )}
                    {contactErrors[field] && (
                      <p className="text-xs font-semibold text-rose-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {contactErrors[field]}
                      </p>
                    )}
                  </div>
                ))}
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-colors cursor-pointer"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          <CodeDrawer
            title="ContactForm"
            code={CODE_SNIPPETS.ex2}
            accentClass="text-emerald-700 hover:text-emerald-800"
          />
        </div>

        {/* Exercise 3 */}
        <div id="sg-ex-3" className="scroll-mt-36 bg-white border border-emerald-200/80 rounded-2xl p-6 flex flex-col justify-between shadow-md shadow-emerald-900/5 hover:shadow-lg transition-shadow">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="px-2.5 py-0.5 rounded-md bg-cyan-100 text-cyan-800 text-xs font-bold">
                Exercise 3
              </span>
              <span className="text-xs font-mono text-slate-400">SkillPicker.jsx</span>
            </div>
            <h3 className="text-lg font-extrabold text-slate-900">
              Skill Picker (Max 3 Warning)
            </h3>
            <p className="text-xs text-slate-600 mt-1 mb-4 leading-relaxed">
              Renders 6 skill checkboxes with a live{' '}
              <code className="text-emerald-700 font-mono">Selected: X / 3</code> counter and triggers a red alert banner when more than 3 are checked.
            </p>

            <div className="flex items-center justify-between mb-3 p-3 rounded-xl bg-emerald-50/80 border border-emerald-200">
              <span className="text-xs font-bold text-slate-800">
                Selected:{' '}
                <span
                  className={`font-mono px-2 py-0.5 rounded ${
                    selectedSkills.length > 3
                      ? 'bg-rose-100 text-rose-700'
                      : 'bg-emerald-600 text-white'
                  }`}
                >
                  {selectedSkills.length} / 3
                </span>
              </span>
              {selectedSkills.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedSkills([])}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  Clear All
                </button>
              )}
            </div>

            {selectedSkills.length > 3 && (
              <div className="mb-3 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Please select at most 3 skills.</span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2.5">
              {SKILL_LIST.map((skill) => {
                const isChecked = selectedSkills.includes(skill);
                return (
                  <label
                    key={skill}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                      isChecked
                        ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-emerald-300 hover:bg-emerald-50/40'
                    }`}
                  >
                    <span>{skill}</span>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => toggleSkill(skill, e.target.checked)}
                      className="sr-only"
                    />
                    {isChecked ? (
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    ) : (
                      <span className="w-4 h-4 rounded-full border border-slate-300 bg-white" />
                    )}
                  </label>
                );
              })}
            </div>
          </div>

          <CodeDrawer
            title="SkillPicker"
            code={CODE_SNIPPETS.ex3}
            accentClass="text-emerald-700 hover:text-emerald-800"
          />
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// TAB 3: VIDEO LECTURE EXERCISE — AMBER & CORAL THEME
// ============================================================================

function VideoLectureFeedbackView() {
  const TOPICS = ['HTML', 'CSS', 'JavaScript', 'Git', 'React'];
  const RATINGS = [
    { stars: '⭐⭐⭐⭐⭐', label: '5 / 5 — Excellent' },
    { stars: '⭐⭐⭐⭐', label: '4 / 5 — Very Good' },
    { stars: '⭐⭐⭐', label: '3 / 5 — Good' },
  ];

  const [studentName, setStudentName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [rating, setRating] = useState('');
  const [topics, setTopics] = useState([]);
  const [comments, setComments] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const MAX_COMMENTS = 300;
  // Bonus: Disable submit button while any required field is empty
  const isSubmitDisabled = !studentName.trim() || !studentId.trim() || !rating;

  function handleTopicToggle(topic, checked) {
    setTopics((prev) => (checked ? [...prev, topic] : prev.filter((t) => t !== topic)));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = {};

    if (!studentName.trim()) {
      errs.studentName = 'Student Name is required.';
    }
    if (!/^\d{8}$/.test(studentId)) {
      errs.studentId = 'Student ID must be exactly 8 digits.';
    }
    if (!rating) {
      errs.rating = 'Please choose a star rating.';
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setSubmitted(true);
  }

  function handleReset() {
    setStudentName('');
    setStudentId('');
    setRating('');
    setTopics([]);
    setComments('');
    setErrors({});
    setSubmitted(false);
  }

  return (
    <div className="space-y-6">
      {/* Informative Overview Banner (Amber & Coral Theme with Marigold Floral Accents) */}
      <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-orange-50/80 border border-amber-200 rounded-2xl p-6 shadow-sm">
        <FloralBlossom
          className="w-24 h-24 absolute -top-5 -right-5 opacity-20 pointer-events-none"
          petalColor="#F59E0B"
          centerColor="#F43F5E"
        />
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-200 text-amber-800 text-xs font-bold mb-2">
          <Video className="w-3.5 h-3.5 text-amber-600" />
          <span>Video Lecture · Page 13 Exercise</span>
        </div>
        <h2
          id="section-video-lecture"
          tabIndex={-1}
          className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight scroll-mt-36 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg"
        >
          3. Video Lecture: Course Feedback Form
        </h2>
        <p className="text-sm text-slate-700 mt-1.5 max-w-3xl leading-relaxed">
          Combines required text inputs, 8-digit Student ID validation, interactive star rating cards, optional multi-select topic chips, a 300-character live counter, and a derived boolean (<code className="text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded font-mono text-xs">isSubmitDisabled</code>) that keeps the submit button disabled until all required fields are filled.
        </p>
      </div>

      <div className="max-w-2xl mx-auto bg-white border border-amber-200/90 rounded-2xl p-6 sm:p-8 shadow-lg shadow-amber-900/5">
        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-orange-500/25">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900">
              Thank you, {studentName}!
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Your feedback for Student ID <span className="font-mono font-bold text-slate-900">{studentId}</span> ({rating}) has been recorded.
            </p>
            {topics.length > 0 && (
              <div className="flex flex-wrap justify-center gap-1.5 pt-1">
                {topics.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-sm transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Submit Another Response
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* 1. Student Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  1. Student Name <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => {
                    setStudentName(e.target.value);
                    setErrors((p) => ({ ...p, studentName: '' }));
                  }}
                  placeholder="Enter full name"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm placeholder-slate-400 focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                />
                {errors.studentName && (
                  <p className="mt-1 text-xs font-semibold text-rose-600">{errors.studentName}</p>
                )}
              </div>

              {/* 2. Student ID (8 digits) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  2. Student ID (8 digits) <span className="text-rose-600">*</span>
                </label>
                <input
                  type="number"
                  value={studentId}
                  onChange={(e) => {
                    setStudentId(e.target.value);
                    setErrors((p) => ({ ...p, studentId: '' }));
                  }}
                  placeholder="e.g. 20241234"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-mono placeholder-slate-400 focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                />
                {errors.studentId && (
                  <p className="mt-1 text-xs font-semibold text-rose-600">{errors.studentId}</p>
                )}
              </div>
            </div>

            {/* 3. Rating */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                3. Course Rating <span className="text-rose-600">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {RATINGS.map((item) => {
                  const isSelected = rating === item.stars;
                  return (
                    <label
                      key={item.stars}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-gradient-to-br from-amber-500 to-orange-500 border-amber-500 text-white shadow-md shadow-amber-500/20'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-amber-50/60 hover:border-amber-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="rating"
                        value={item.stars}
                        checked={isSelected}
                        onChange={(e) => {
                          setRating(e.target.value);
                          setErrors((p) => ({ ...p, rating: '' }));
                        }}
                        className="sr-only"
                      />
                      <span className="text-base">{item.stars}</span>
                      <span
                        className={`text-[11px] font-bold mt-1 ${
                          isSelected ? 'text-white/95' : 'text-slate-500'
                        }`}
                      >
                        {item.label}
                      </span>
                    </label>
                  );
                })}
              </div>
              {errors.rating && (
                <p className="mt-1 text-xs font-semibold text-rose-600">{errors.rating}</p>
              )}
            </div>

            {/* 4. Topics Covered Well */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                4. Topics Covered Well{' '}
                <span className="text-slate-400 font-normal normal-case">(Optional)</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {TOPICS.map((topic) => {
                  const checked = topics.includes(topic);
                  return (
                    <label
                      key={topic}
                      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full border text-xs font-bold cursor-pointer transition-all ${
                        checked
                          ? 'bg-amber-100 border-amber-400 text-amber-900 shadow-2xs'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-amber-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => handleTopicToggle(topic, e.target.checked)}
                        className="sr-only"
                      />
                      {checked && <Check className="w-3.5 h-3.5 text-amber-700" />}
                      <span>{topic}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* 5. Comments */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  5. Additional Comments
                </label>
                <span
                  className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                    comments.length >= MAX_COMMENTS
                      ? 'bg-rose-100 text-rose-700'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {comments.length} / {MAX_COMMENTS}
                </span>
              </div>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value.slice(0, MAX_COMMENTS))}
                rows={3}
                placeholder="Share what worked well or suggestions for future lectures..."
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm placeholder-slate-400 focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
              />
            </div>

            {/* Bonus Submit Button */}
            <div className="pt-1">
              <button
                type="submit"
                disabled={isSubmitDisabled}
                className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 disabled:from-slate-200 disabled:to-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-bold text-sm shadow-md shadow-amber-500/20 disabled:shadow-none transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                {isSubmitDisabled
                  ? 'Fill Required Fields (*) to Enable Submit'
                  : 'Submit Course Feedback'}
              </button>
            </div>
          </form>
        )}

        <CodeDrawer
          title="CourseFeedbackForm"
          code={CODE_SNIPPETS.feedbackForm}
          accentClass="text-amber-700 hover:text-amber-800"
        />
      </div>
    </div>
  );
}

// ============================================================================
// TAB 4: LECTURE SLIDES (PATTERNS & REFERENCE) — CYAN & SKY BLUE THEME
// ============================================================================

function LectureSlidesView() {
  // Slide 6 Sandbox State
  const [query, setQuery] = useState('react');

  // Slide 9 Sandbox State
  const [country, setCountry] = useState('KR');
  const [slideBio, setSlideBio] = useState('');
  const [agree, setAgree] = useState(false);

  // Slide 20 Sandbox State
  const [email, setEmail] = useState('student@university.ac.kr');
  const [password, setPassword] = useState('••••••••');
  const [status, setStatus] = useState('idle');
  const [simulateFail, setSimulateFail] = useState(false);

  const handleSimulatedLogin = (e) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => {
      if (simulateFail) {
        setStatus('error');
      } else {
        setStatus('success');
      }
    }, 850);
  };

  return (
    <div className="space-y-6">
      {/* Informative Overview Banner (Cyan & Sky Blue Theme with Hydrangea Floral Accents) */}
      <div className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-cyan-50/80 border border-sky-200 rounded-2xl p-6 shadow-sm">
        <FloralBlossom
          className="w-24 h-24 absolute -top-5 -right-5 opacity-20 pointer-events-none"
          petalColor="#0EA5E9"
          centerColor="#FBBF24"
        />
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 border border-sky-200 text-sky-800 text-xs font-bold mb-2">
          <Presentation className="w-3.5 h-3.5 text-sky-600" />
          <span>Lecture Notes · Slides 6, 9 &amp; 20 Reference Sandboxes</span>
        </div>
        <h2
          id="section-lecture-slides"
          tabIndex={-1}
          className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight scroll-mt-36 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-lg"
        >
          4. Lecture Slides: Controlled Input Patterns
        </h2>
        <p className="text-sm text-slate-700 mt-1.5 max-w-3xl leading-relaxed">
          Explore the exact code patterns from your lecture slides side-by-side with live sandboxes: React owning input state via{' '}
          <code className="text-sky-800 bg-sky-100 px-1.5 py-0.5 rounded font-mono text-xs">value</code> +{' '}
          <code className="text-sky-800 bg-sky-100 px-1.5 py-0.5 rounded font-mono text-xs">onChange</code>, distinguishing{' '}
          <code className="text-sky-800 bg-sky-100 px-1.5 py-0.5 rounded font-mono text-xs">value</code> vs{' '}
          <code className="text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded font-mono text-xs">checked</code>, and handling async submission states.
        </p>

        {/* Sub-heading Quick Links */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-sky-200/70">
          <span className="text-xs font-bold text-sky-900">Jump to Slide:</span>
          <a href="#slide-6" className="px-3 py-1 rounded-lg bg-white hover:bg-sky-100 border border-sky-200 text-xs font-bold text-sky-800 transition-colors">
            Slide 6: SearchBar
          </a>
          <a href="#slide-9" className="px-3 py-1 rounded-lg bg-white hover:bg-sky-100 border border-sky-200 text-xs font-bold text-sky-800 transition-colors">
            Slide 9: Select &amp; Checkbox
          </a>
          <a href="#slide-20" className="px-3 py-1 rounded-lg bg-white hover:bg-sky-100 border border-sky-200 text-xs font-bold text-sky-800 transition-colors">
            Slide 20: Form Submission
          </a>
        </div>
      </div>

      {/* Slide 6: Controlled Input Pattern */}
      <div id="slide-6" className="scroll-mt-36 bg-white border border-sky-200/80 rounded-2xl p-6 shadow-md shadow-sky-900/5">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <span className="px-2.5 py-0.5 rounded-md bg-sky-100 text-sky-800 text-xs font-bold">
              Slide 6
            </span>
            <h3 className="text-lg font-extrabold text-slate-900 mt-1">
              Controlled Input Pattern (SearchBar)
            </h3>
          </div>
          <CopyButton text={CODE_SNIPPETS.slide6} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <pre className="lg:col-span-7 p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-xs overflow-x-auto font-mono leading-relaxed">
            <code>{CODE_SNIPPETS.slide6}</code>
          </pre>

          <div className="lg:col-span-5 bg-gradient-to-br from-sky-50 to-cyan-50 border border-sky-200 rounded-2xl p-5 space-y-4">
            <span className="text-xs font-extrabold tracking-wider uppercase text-sky-800">
              LIVE INTERACTIVE SANDBOX
            </span>
            <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border-2 border-sky-500 shadow-xs">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value.slice(0, 100))}
                placeholder="Search..."
                className="flex-1 px-2.5 py-1.5 text-slate-900 font-semibold text-sm focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setQuery('')}
                className="px-3.5 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 cursor-pointer"
              >
                Clear
              </button>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-slate-800">
                Searching for: <span className="font-mono font-bold text-sky-700">&quot;{query}&quot;</span>
              </p>
              <p className="text-xs font-bold text-emerald-700 font-mono">
                {query.length} / 100 characters
              </p>
            </div>
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold">
              Live count and Clear are only possible because React owns the value.
            </div>
          </div>
        </div>
      </div>

      {/* Slide 9: Controlled Select, Textarea, Checkbox */}
      <div id="slide-9" className="scroll-mt-36 bg-white border border-sky-200/80 rounded-2xl p-6 shadow-md shadow-sky-900/5">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <span className="px-2.5 py-0.5 rounded-md bg-sky-100 text-sky-800 text-xs font-bold">
              Slide 9
            </span>
            <h3 className="text-lg font-extrabold text-slate-900 mt-1">
              Controlled Select, Textarea &amp; Checkbox
            </h3>
          </div>
          <CopyButton text={CODE_SNIPPETS.slide9} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <pre className="lg:col-span-7 p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-xs overflow-x-auto font-mono leading-relaxed">
            <code>{CODE_SNIPPETS.slide9}</code>
          </pre>

          <div className="lg:col-span-5 bg-gradient-to-br from-sky-50 to-cyan-50 border border-sky-200 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold tracking-wider uppercase text-sky-800">
                WHICH PROP HOLDS THE STATE?
              </span>
              <span className="px-2 py-0.5 rounded-full bg-white border border-sky-200 text-[11px] font-mono font-bold text-sky-800">
                {country} · {agree ? 'agreed' : 'unchecked'}
              </span>
            </div>

            <div className="space-y-2">
              {[
                { el: '<select>', prop: 'value', color: 'bg-sky-600 text-white' },
                { el: '<textarea>', prop: 'value', color: 'bg-sky-600 text-white' },
                { el: 'checkbox', prop: 'checked', color: 'bg-amber-500 text-white' },
                { el: 'radio', prop: 'checked', color: 'bg-amber-500 text-white' },
              ].map((item) => (
                <div
                  key={item.el}
                  className="flex items-center justify-between bg-white px-3.5 py-2 rounded-xl border border-sky-100 shadow-2xs"
                >
                  <code className="text-xs font-bold text-slate-900">{item.el}</code>
                  <span className={`px-3 py-0.5 rounded-md text-xs font-mono font-bold ${item.color}`}>
                    {item.prop}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-sky-200/80 space-y-2.5">
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs font-semibold focus:outline-none focus:border-sky-500"
              >
                <option value="KR">South Korea (KR)</option>
                <option value="UZ">Uzbekistan (UZ)</option>
                <option value="US">United States (US)</option>
              </select>
              <textarea
                value={slideBio}
                onChange={(e) => setSlideBio(e.target.value)}
                rows={2}
                placeholder="Controlled textarea..."
                className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-sky-500"
              />
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="accent-sky-600 w-4 h-4"
                />
                <span>Agree to terms (checked: {String(agree)})</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Slide 20: Form Submission Lifecycle */}
      <div id="slide-20" className="scroll-mt-36 bg-white border border-sky-200/80 rounded-2xl p-6 shadow-md shadow-sky-900/5">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <span className="px-2.5 py-0.5 rounded-md bg-sky-100 text-sky-800 text-xs font-bold">
              Slide 20
            </span>
            <h3 className="text-lg font-extrabold text-slate-900 mt-1">
              Async Form Submission (4 Status States)
            </h3>
          </div>
          <CopyButton text={CODE_SNIPPETS.slide20} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <pre className="lg:col-span-7 p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-xs overflow-x-auto font-mono leading-relaxed">
            <code>{CODE_SNIPPETS.slide20}</code>
          </pre>

          <div className="lg:col-span-5 bg-gradient-to-br from-sky-50 to-cyan-50 border border-sky-200 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold tracking-wider uppercase text-sky-800">
                STATUS STATE SANDBOX
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border ${
                  status === 'idle'
                    ? 'bg-slate-100 text-slate-700 border-slate-300'
                    : status === 'loading'
                    ? 'bg-amber-100 text-amber-800 border-amber-300'
                    : status === 'success'
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : 'bg-rose-100 text-rose-800 border-rose-300'
                }`}
              >
                status: &apos;{status}&apos;
              </span>
            </div>

            <form onSubmit={handleSimulatedLogin} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs font-medium"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs font-medium"
              />

              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={simulateFail}
                  onChange={(e) => setSimulateFail(e.target.checked)}
                  className="accent-rose-600 w-4 h-4"
                />
                <span>
                  Simulate API error (<code className="text-rose-600 font-mono">!res.ok</code>)
                </span>
              </label>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:bg-amber-500 text-white font-bold text-xs shadow-sm transition-colors cursor-pointer"
              >
                {status === 'loading' ? 'Logging in...' : 'Log In'}
              </button>

              {status === 'success' && (
                <div className="p-2.5 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold text-center">
                  success ✓ — Logged in!
                </div>
              )}
              {status === 'error' && (
                <div className="p-2.5 rounded-xl bg-rose-100 border border-rose-300 text-rose-900 text-xs font-bold text-center">
                  error ✗ — Login failed. Check your credentials.
                </div>
              )}
            </form>

            <p className="text-xs italic text-slate-500 text-center">
              Show the error inline, never in an alert().
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN DASHBOARD APPLICATION
// ============================================================================

export default function App() {
  const [activeTab, setActiveTab] = useState('homework');
  const [accentKey, setAccentKey] = useState('rose');

  const currentTheme = ACCENT_THEMES[accentKey];

  const NAV_TABS = [
    {
      id: 'homework',
      sectionId: 'section-student-editor',
      label: '1. Student Profile Editor',
      badge: 'Homework',
      icon: UserCheck,
    },
    {
      id: 'study-guide',
      sectionId: 'section-study-guide',
      label: '2. Study Guide (Ex 1–3)',
      badge: 'Exercises',
      icon: BookOpen,
    },
    {
      id: 'video-lecture',
      sectionId: 'section-video-lecture',
      label: '3. Video Lecture (Feedback)',
      badge: 'Page 13',
      icon: Video,
    },
    {
      id: 'slides',
      sectionId: 'section-lecture-slides',
      label: '4. Lecture Slides (6, 9, 20)',
      badge: 'Ref',
      icon: Presentation,
    },
  ];

  const handleNavigateSection = (tabId, sectionId) => {
    setActiveTab(tabId);
    setTimeout(() => {
      const headingEl = document.getElementById(sectionId);
      if (headingEl) {
        headingEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        headingEl.focus({ preventScroll: true });
      }
    }, 40);
  };

  const RESOURCE_CARDS = [
    {
      targetTab: 'homework',
      title: '1. Student Profile Editor',
      weight: 'Main Homework',
      description:
        'Full student management form with 10-digit ID validation, photo preview, keyboard skill tags, and live Digital Student ID card.',
      cardBg: 'from-rose-50/90 to-pink-50/60 border-rose-200 hover:border-rose-400',
      badgeColor: 'bg-rose-600 text-white',
      ctaColor: 'text-rose-700',
    },
    {
      targetTab: 'study-guide',
      title: '2. Study Guide: Exercises 1–3',
      weight: 'Practice Labs',
      description:
        'Interactive implementations of BioField (auto-disable at 200 chars), ContactForm (validation & reset), and SkillPicker (max 3 warning).',
      cardBg: 'from-emerald-50/90 to-teal-50/60 border-emerald-200 hover:border-emerald-400',
      badgeColor: 'bg-emerald-600 text-white',
      ctaColor: 'text-emerald-700',
    },
    {
      targetTab: 'video-lecture',
      title: '3. Video Lecture: Course Feedback',
      weight: 'Page 13 Exercise',
      description:
        'Course Feedback Form featuring 8-digit Student ID validation, star rating cards, optional topic checkboxes, 300-char comments, and derived submit-button disabling.',
      cardBg: 'from-amber-50/90 to-orange-50/60 border-amber-200 hover:border-amber-400',
      badgeColor: 'bg-amber-600 text-white',
      ctaColor: 'text-amber-700',
    },
    {
      targetTab: 'slides',
      title: '4. Lecture Slides: Controlled Patterns',
      weight: 'Slides 6, 9, 20',
      description:
        'Interactive sandboxes and code references for Controlled SearchBar, Select/Textarea/Checkbox state props, and 4-state async form submission.',
      cardBg: 'from-sky-50/90 to-cyan-50/60 border-sky-200 hover:border-sky-400',
      badgeColor: 'bg-sky-600 text-white',
      ctaColor: 'text-sky-700',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/40 via-[#F8FAFC] to-indigo-50/30 text-slate-900 font-sans selection:bg-rose-500/20 selection:text-rose-900">
      {/* Skip to Main Content Accessibility Link */}
      <a
        href="#main-workspace"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:rounded-xl focus:bg-rose-600 focus:text-white focus:font-bold focus:shadow-lg"
      >
        Skip to Main Workspace
      </a>

      {/* Vibrant Botanical & Jewel-Toned Hero Header */}
      <header className="bg-white/95 backdrop-blur-xl border-b border-rose-200/80 sticky top-0 z-30 shadow-xs">
        {/* Top Colorful Gradient Banner Strip */}
        <div className={`relative overflow-hidden bg-gradient-to-r ${currentTheme.heroGradient} text-white transition-all duration-500`}>
          {/* Decorative Corner Flowers */}
          <FloralBlossom
            className="w-28 h-28 absolute -top-6 -left-6 opacity-15 pointer-events-none"
            petalColor="#FFFFFF"
            centerColor="#FDE047"
          />
          <FloralBlossom
            className="w-32 h-32 absolute -bottom-8 right-6 opacity-15 pointer-events-none rotate-45"
            petalColor="#FFFFFF"
            centerColor="#FDE047"
          />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white/20 backdrop-blur-xs text-white text-xs font-mono font-bold">
                    <Flower2 className="w-3.5 h-3.5" />
                    Web Programming · K0126_002
                  </span>
                  <span className="text-xs text-white/90 font-medium">
                    Accessible React Forms &amp; Validation Hub
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight mt-1 text-white">
                  Web Programming · K0126_002: React Forms Hub
                </h1>
              </div>

              {/* Right Controls: Sabhyata Chhetri Student Badge + Live Accent Theme Switcher */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Student Profile Identity Pill */}
                <div className="inline-flex items-center gap-2.5 bg-white/15 backdrop-blur-xs px-3.5 py-1.5 rounded-xl border border-white/25 shadow-xs">
                  <div className="w-7 h-7 rounded-full bg-white text-rose-600 flex items-center justify-center font-extrabold text-xs shadow-2xs">
                    SC
                  </div>
                  <div className="leading-tight">
                    <p className="text-xs font-extrabold text-white">Sabhyata Chhetri</p>
                    <p className="text-[10px] font-medium text-white/90 flex items-center gap-1">
                      <GraduationCap className="w-3 h-3" /> Computer Science · Gachon University
                    </p>
                  </div>
                </div>

                {/* Accent Theme Switcher Pill */}
                <div className="inline-flex items-center gap-1.5 bg-black/20 backdrop-blur-xs px-2.5 py-1.5 rounded-xl border border-white/15">
                  <Palette className="w-3.5 h-3.5 text-white/90 mr-0.5" />
                  <span className="text-[11px] font-semibold text-white/90 hidden sm:inline mr-1">
                    Theme:
                  </span>
                  {Object.values(ACCENT_THEMES).map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      title={t.name}
                      aria-label={`Switch theme to ${t.name}`}
                      onClick={() => setAccentKey(t.id)}
                      className={`w-5 h-5 rounded-full transition-transform cursor-pointer border-2 ${
                        t.swatch
                      } ${
                        accentKey === t.id
                          ? 'border-white scale-115 shadow-sm'
                          : 'border-white/40 opacity-80 hover:opacity-100'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Accessible Heading Navigation Pill Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 bg-white">
          <nav aria-label="Course Sections and Headings" className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="hidden md:inline-flex items-center gap-1 text-xs font-bold text-slate-500 mr-1 shrink-0">
              <Compass className="w-3.5 h-3.5 text-rose-500" />
              Headings:
            </span>
            {NAV_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => handleNavigateSection(tab.id, tab.sectionId)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap border transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 ${
                    isActive
                      ? currentTheme.activePill
                      : 'bg-slate-50 hover:bg-rose-50/70 text-slate-800 border-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                      isActive
                        ? 'bg-white/25 text-white'
                        : 'bg-white text-slate-600 border border-slate-200'
                    }`}
                  >
                    {tab.badge}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main id="main-workspace" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Active Workspace View */}
        <section aria-label="Active Learning Module">
          {activeTab === 'homework' && <StudentProfileEditorView theme={currentTheme} />}
          {activeTab === 'study-guide' && <StudyGuideView />}
          {activeTab === 'video-lecture' && <VideoLectureFeedbackView />}
          {activeTab === 'slides' && <LectureSlidesView />}
        </section>

        <FloralVineDivider accent={accentKey} />

        {/* Bottom Quick-Switch Learning Resource Cards */}
        <section aria-labelledby="heading-quick-switch" className="pt-2">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-5">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-rose-600">
                <Flower2 className="w-3.5 h-3.5" />
                Course Syllabus &amp; Headings Directory
              </span>
              <h2 id="heading-quick-switch" className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
                5. Quick-Switch Learning Resources
              </h2>
            </div>
            <p className="text-xs font-medium text-slate-600">
              Click any module card below to jump directly to its heading and workspace.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {RESOURCE_CARDS.map((card) => {
              const isCurrent = activeTab === card.targetTab;
              const matchingNav = NAV_TABS.find((t) => t.id === card.targetTab);
              return (
                <button
                  key={card.targetTab}
                  type="button"
                  onClick={() => handleNavigateSection(card.targetTab, matchingNav?.sectionId)}
                  className={`relative overflow-hidden text-left p-5 rounded-2xl bg-gradient-to-br border transition-all duration-200 flex flex-col justify-between gap-4 cursor-pointer group hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 ${
                    card.cardBg
                  } ${isCurrent ? 'ring-2 ring-rose-500 shadow-md' : 'shadow-xs'}`}
                >
                  <FloralBlossom
                    className="w-16 h-16 absolute -bottom-3 -right-3 opacity-15 pointer-events-none group-hover:rotate-45 transition-transform duration-500"
                    petalColor="#F43F5E"
                    centerColor="#FBBF24"
                  />
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold ${card.badgeColor}`}>
                        {card.weight}
                      </span>
                      {isCurrent && (
                        <span className="text-[11px] font-extrabold text-rose-700 bg-white px-2 py-0.5 rounded-full border border-rose-200">
                          Viewing
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-extrabold text-slate-900">
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-700 mt-1.5 leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  <div className={`inline-flex items-center gap-1.5 text-xs font-extrabold group-hover:translate-x-1 transition-transform ${card.ctaColor}`}>
                    <span>Jump to Section</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}