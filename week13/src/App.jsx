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
    indigo: '#A5B4FC',
    emerald: '#6EE7B7',
    cyan: '#7DD3FC',
  };
  const petalMap = {
    rose: '#FB7185',
    indigo: '#818CF8',
    emerald: '#34D399',
    cyan: '#38BDF8',
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
  const [lectureModule, setLectureModule] = useState('Week 6 · React Controlled Forms & Validation');
  const [rating, setRating] = useState('');
  const [pace, setPace] = useState('Just Right');
  const [lectureQuality, setLectureQuality] = useState('Clear & Engaging');
  const [classParticipation, setClassParticipation] = useState('Highly Interactive');
  const [materialsQuality, setMaterialsQuality] = useState('Very Helpful');
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

  if (submitted) return <h3>Thank you, {studentName}! Your K0126_002 feedback is recorded.</h3>;
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
// REUSABLE UI HELPERS (COPY BUTTON & CODE INSPECTOR DRAWER)
// ============================================================================

function CopyButton({ text, label = 'Copy Code' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-2xs transition-colors cursor-pointer"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-600" />
          <span className="text-emerald-700">Copied!</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5 text-slate-500" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}

function CodeDrawer({ title, code, accentClass = 'text-rose-700 hover:text-rose-800' }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-5 pt-4 border-t border-slate-200/80">
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className={`inline-flex items-center gap-1.5 text-xs font-extrabold transition-colors cursor-pointer ${accentClass}`}
        >
          <Code2 className="w-4 h-4" />
          <span>{open ? `Hide ${title} Code` : `Inspect ${title} Code`}</span>
        </button>
        {open && <CopyButton text={code} />}
      </div>

      {open && (
        <pre className="mt-3 p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-xs overflow-x-auto font-mono leading-relaxed">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}

// ============================================================================
// TAB 1: HOMEWORK — STUDENT PROFILE EDITOR (MAIN DEFAULT WORKSPACE)
// ============================================================================

function StudentProfileEditorView({ theme }) {
  const MAJORS = [
    'Computer Science',
    'Computer Engineering',
    'Software Engineering',
    'Information Systems',
    'Data Science',
  ];

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
  const [submittedProfile, setSubmittedProfile] = useState({
    name: 'Sabhyata Chhetri',
    studentId: '2025394710',
    major: 'Computer Science',
    year: '2',
    bio: 'Computer Science undergraduate at Gachon University passionate about building accessible, colorful, and responsive React web applications.',
    photoUrl: '',
    skills: ['react', 'javascript', 'css', 'python'],
  });

  const MAX_BIO = 200;

  const completedSteps = [
    form.name.trim().length > 0,
    /^\d{10}$/.test(form.studentId),
    Boolean(form.major),
    Boolean(form.year),
    form.bio.trim().length > 0 && form.bio.length < MAX_BIO,
    Boolean(form.photoUrl),
  ].filter(Boolean).length;

  const progressPercent = Math.round((completedSteps / 6) * 100);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  }

  function handlePhotoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setForm((prev) => ({ ...prev, photoUrl: previewUrl }));
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

  function fillDemoSabhyata() {
    const demoData = {
      name: 'Sabhyata Chhetri',
      studentId: '2025394710',
      major: 'Computer Science',
      year: '2',
      bio: 'Computer Science undergraduate at Gachon University passionate about building accessible, colorful, and responsive React web applications.',
      photoUrl: 'demo-avatar',
    };
    setForm(demoData);
    setSkills(['react', 'javascript', 'css', 'python']);
    setErrors({});
    setSubmittedProfile({ ...demoData, photoUrl: '', skills: ['react', 'javascript', 'css', 'python'] });
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
    setSkills(['react', 'forms', 'css']);
    setErrors({});
  }

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Student name is required.';
    if (!/^\d{10}$/.test(form.studentId)) {
      errs.studentId = 'Student ID must be exactly 10 digits.';
    }
    if (!form.major) errs.major = 'Major is required.';
    if (!form.year) errs.year = 'Please select an academic year (1–4).';
    if (!form.bio.trim()) {
      errs.bio = 'Bio is required.';
    } else if (form.bio.length >= MAX_BIO) {
      errs.bio = 'Bio must be strictly under 200 characters.';
    }
    if (!form.photoUrl) {
      errs.photoUrl = 'Please upload a profile photo (or click Fill Demo).';
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
    setSubmittedProfile({
      ...form,
      photoUrl: form.photoUrl === 'demo-avatar' ? '' : form.photoUrl,
      skills: [...skills],
    });
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
    <div className="space-y-6">
      {/* Informative Overview Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-white to-pink-50/80 border border-rose-200 rounded-2xl p-6 shadow-sm">
        <FloralBlossom
          className="w-24 h-24 absolute -top-5 -right-5 opacity-20 pointer-events-none"
          petalColor="#F43F5E"
          centerColor="#FBBF24"
        />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 border border-rose-200 text-rose-800 text-xs font-bold">
              <UserCheck className="w-3.5 h-3.5 text-rose-600" />
              <span>Main Homework · Controlled Form, Validation &amp; Live ID Preview</span>
            </div>
            <h2
              id="section-student-editor"
              tabIndex={-1}
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight scroll-mt-36 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 rounded-lg"
            >
              1. Student Profile Editor
            </h2>
            <p className="text-sm text-slate-700 max-w-3xl leading-relaxed">
              Complete the controlled form below for <strong className="text-slate-900">Gachon University Student Management</strong>. Every field is required, Student ID must be{' '}
              <code className="text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded font-mono text-xs">10 digits</code>, Bio must stay under{' '}
              <code className="text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded font-mono text-xs">200 characters</code>, and pressing{' '}
              <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-300 text-xs font-mono">Enter</kbd> adds skill tags.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={fillDemoSabhyata}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white hover:bg-rose-50 text-rose-700 border border-rose-300 shadow-xs transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
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
          </div>
        </div>
      </div>

      {/* Main 2-Column Split: Form Left, Digital Student ID Card Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Form Card */}
        <div className="lg:col-span-7 bg-white border border-rose-200/80 rounded-2xl p-6 sm:p-7 shadow-md shadow-rose-900/5">
          {/* 6-Step Completion Progress Bar */}
          <div className="mb-6 pb-4 border-b border-slate-100">
            <div className="flex items-center justify-between text-xs font-bold mb-1.5">
              <span className="text-slate-600">Profile Form Completion</span>
              <span className="text-rose-700 font-mono">{completedSteps} / 6 Required Fields ({progressPercent}%)</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${theme.progressFill}`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
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
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm placeholder-slate-400 focus:bg-white focus:outline-none ${theme.focusBorder}`}
                />
                {errors.name && (
                  <p className="mt-1 text-xs font-semibold text-rose-600 flex items-center gap-1">
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
                  maxLength={10}
                  value={form.studentId}
                  onChange={handleChange}
                  placeholder="e.g. 2025394710"
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-mono placeholder-slate-400 focus:bg-white focus:outline-none ${theme.focusBorder}`}
                />
                {errors.studentId && (
                  <p className="mt-1 text-xs font-semibold text-rose-600 flex items-center gap-1">
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
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-semibold focus:bg-white focus:outline-none ${theme.focusBorder}`}
                >
                  {MAJORS.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
                {errors.major && (
                  <p className="mt-1 text-xs font-semibold text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.major}
                  </p>
                )}
              </div>

              {/* Year 1-4 Radio */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Academic Year <span className="text-rose-600">*</span>
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((yr) => {
                    const selected = form.year === String(yr);
                    return (
                      <label
                        key={yr}
                        className={`flex items-center justify-center py-2.5 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                          selected
                            ? theme.activePill
                            : 'bg-slate-50 border-slate-300 text-slate-700 hover:border-rose-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="year"
                          value={String(yr)}
                          checked={selected}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        Yr {yr}
                      </label>
                    );
                  })}
                </div>
                {errors.year && (
                  <p className="mt-1 text-xs font-semibold text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.year}
                  </p>
                )}
              </div>
            </div>

            {/* Bio with Live Character Counter */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Short Bio <span className="text-rose-600">*</span>
                </label>
                <span
                  className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                    form.bio.length >= MAX_BIO
                      ? 'bg-rose-100 text-rose-700'
                      : form.bio.length > 170
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
                placeholder="Write a brief introduction (under 200 characters)..."
                className={`w-full p-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm placeholder-slate-400 focus:bg-white focus:outline-none ${theme.focusBorder}`}
              />
              {errors.bio && (
                <p className="mt-1 text-xs font-semibold text-rose-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.bio}
                </p>
              )}
            </div>

            {/* Profile Photo File Upload + Live Preview */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Profile Photo <span className="text-rose-600">*</span>
              </label>
              <div className="flex flex-wrap items-center gap-3">
                <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 hover:bg-rose-50/60 border border-slate-300 hover:border-rose-300 text-xs font-bold text-slate-700 cursor-pointer transition-colors">
                  <Upload className="w-4 h-4 text-rose-600" />
                  <span>Choose Image File</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="sr-only"
                  />
                </label>

                {form.photoUrl && form.photoUrl !== 'demo-avatar' && (
                  <img
                    src={form.photoUrl}
                    alt="Uploaded preview"
                    className="w-11 h-11 rounded-full object-cover border-2 border-rose-400 shadow-xs"
                  />
                )}
                {form.photoUrl === 'demo-avatar' && (
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                    ✓ Demo Avatar Ready
                  </span>
                )}
              </div>
              {errors.photoUrl && (
                <p className="mt-1 text-xs font-semibold text-rose-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.photoUrl}
                </p>
              )}
            </div>

            {/* Stretch: Interactive Skills Tags */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Skills Tags <span className="text-slate-400 font-normal normal-case">(Press Enter to add, × to remove)</span>
              </label>
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleSkillKeyDown}
                placeholder="Type a skill (e.g. typescript) and press Enter..."
                className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm placeholder-slate-400 focus:bg-white focus:outline-none ${theme.focusBorder}`}
              />
              <div className="flex flex-wrap gap-2 mt-2.5">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold"
                  >
                    [{skill}]
                    <button
                      type="button"
                      aria-label={`Remove ${skill}`}
                      onClick={() => removeSkill(skill)}
                      className="text-emerald-600 hover:text-rose-600 transition-colors cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className={`w-full py-3.5 px-5 rounded-xl font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${theme.primaryBtn}`}
            >
              <Award className="w-4 h-4" />
              Save &amp; Render Profile Preview Card
            </button>
          </form>

          <CodeDrawer
            title="StudentProfileEditor"
            code={CODE_SNIPPETS.studentEditor}
            accentClass="text-rose-700 hover:text-rose-800"
          />
        </div>

        {/* Digital Student ID Card Preview */}
        <div className="lg:col-span-5 sticky top-36">
          <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl border border-slate-800 relative overflow-hidden">
            <FloralBlossom
              className="w-28 h-28 absolute -bottom-6 -right-6 opacity-15 pointer-events-none"
              petalColor="#FB7185"
              centerColor="#FDE047"
            />
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-extrabold tracking-widest uppercase text-slate-400">
                PROFILE PREVIEW · DIGITAL ID
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[11px] font-bold">
                Verified Student
              </span>
            </div>

            <div className="bg-white text-slate-900 rounded-2xl overflow-hidden shadow-lg">
              {/* Top Gradient Banner */}
              <div className={`h-16 bg-gradient-to-r ${theme.cardHeaderGradient} relative`}>
                <span className="absolute top-3 right-4 text-[11px] font-extrabold text-white/90 tracking-wider uppercase">
                  Gachon University
                </span>
              </div>

              <div className="px-6 pb-6">
                <div className="-mt-9 flex items-end justify-between gap-3 mb-3">
                  {submittedProfile?.photoUrl ? (
                    <img
                      src={submittedProfile.photoUrl}
                      alt={submittedProfile.name}
                      className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-md bg-slate-100"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-rose-600 to-pink-600 text-white border-4 border-white shadow-md flex items-center justify-center font-extrabold text-2xl">
                      {getInitials(submittedProfile?.name || 'SC')}
                    </div>
                  )}
                  <span className="px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-extrabold">
                    Year {submittedProfile?.year || '2'}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-slate-900">
                  {submittedProfile?.name}
                </h3>
                <p className="text-xs font-mono font-bold text-slate-500 mt-0.5">
                  ID {submittedProfile?.studentId} · {submittedProfile?.major}
                </p>

                <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 mb-1">
                    <span>BIO</span>
                    <span>bio: {submittedProfile?.bio?.length || 0} / 200</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {submittedProfile?.bio}
                  </p>
                </div>

                <div className="mt-4">
                  <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                    Verified Skills
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {(submittedProfile?.skills || []).map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold"
                      >
                        [{skill}]
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex justify-end">
                  <CopyButton
                    text={JSON.stringify(submittedProfile, null, 2)}
                    label="Copy Profile JSON"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// TAB 2: STUDY GUIDE — EXERCISES 1 TO 3 (BOTANICAL EMERALD THEME)
// ============================================================================

function StudyGuideView() {
  // Exercise 1: BioField State
  const [bio, setBio] = useState('');
  const MAX_EX1 = 200;
  const remainingEx1 = MAX_EX1 - bio.length;

  // Exercise 2: ContactForm State
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactErrors, setContactErrors] = useState({});
  const [contactSubmittedName, setContactSubmittedName] = useState('');

  // Exercise 3: SkillPicker State
  const SKILLS_LIST = ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Python'];
  const [selectedSkills, setSelectedSkills] = useState(['HTML', 'React']);

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
    setContactSubmittedName(contactForm.name);
    setContactForm({ name: '', email: '', message: '' });
  }

  function toggleSkill(skill, checked) {
    setSelectedSkills((prev) =>
      checked ? [...prev, skill] : prev.filter((s) => s !== skill)
    );
  }

  return (
    <div className="space-y-6">
      {/* Informative Overview Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50/80 border border-emerald-200 rounded-2xl p-6 shadow-sm">
        <FloralBlossom
          className="w-24 h-24 absolute -top-5 -right-5 opacity-20 pointer-events-none"
          petalColor="#10B981"
          centerColor="#FBBF24"
        />
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold mb-2">
          <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
          <span>Study Guide · Interactive Practice Exercises 1–3</span>
        </div>
        <h2
          id="section-study-guide"
          tabIndex={-1}
          className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight scroll-mt-36 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg"
        >
          2. Study Guide: Exercises 1 to 3
        </h2>
        <p className="text-sm text-slate-700 mt-1.5 max-w-3xl leading-relaxed">
          Test all three Study Guide components live: character-capped controlled textareas with boundary disabling, multi-field form validation with automatic reset, and array-state checkbox selection with live limit warnings.
        </p>

        {/* Quick-Jump Sub-Links */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-emerald-200/70">
          <span className="text-xs font-bold text-emerald-900">Jump to Exercise:</span>
          <a href="#ex-1" className="px-3 py-1 rounded-lg bg-white hover:bg-emerald-100 border border-emerald-200 text-xs font-bold text-emerald-800 transition-colors">
            Ex 1: BioField
          </a>
          <a href="#ex-2" className="px-3 py-1 rounded-lg bg-white hover:bg-emerald-100 border border-emerald-200 text-xs font-bold text-emerald-800 transition-colors">
            Ex 2: ContactForm
          </a>
          <a href="#ex-3" className="px-3 py-1 rounded-lg bg-white hover:bg-emerald-100 border border-emerald-200 text-xs font-bold text-emerald-800 transition-colors">
            Ex 3: SkillPicker
          </a>
        </div>
      </div>

      {/* Exercise 1: BioField */}
      <div id="ex-1" className="scroll-mt-36 bg-white border border-emerald-200/80 rounded-2xl p-6 shadow-md shadow-emerald-900/5">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div>
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">
              Exercise 1
            </span>
            <h3 className="text-lg font-extrabold text-slate-900 mt-1">
              Controlled &lt;textarea&gt; with 200-Char Limit &amp; Auto-Disable
            </h3>
          </div>
          <span className="text-xs font-mono font-bold text-slate-500">
            disabled={'{bio.length >= 200}'}
          </span>
        </div>

        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value.slice(0, MAX_EX1))}
          disabled={bio.length >= MAX_EX1}
          rows={3}
          placeholder="Type up to 200 characters (textarea disables automatically at 200)..."
          className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm disabled:bg-rose-50 disabled:border-rose-300 disabled:text-rose-800 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
        />

        <div className="flex items-center justify-between mt-2">
          <p
            style={{ color: remainingEx1 < 20 ? '#dc2626' : '#475569', fontSize: 13 }}
            className="font-mono font-bold"
          >
            {bio.length} / {MAX_EX1} characters {bio.length >= MAX_EX1 && '(Limit Reached — Disabled)'}
          </p>
          {bio.length > 0 && (
            <button
              type="button"
              onClick={() => setBio('')}
              className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
            >
              Reset Bio
            </button>
          )}
        </div>

        <CodeDrawer
          title="BioField"
          code={CODE_SNIPPETS.ex1}
          accentClass="text-emerald-700 hover:text-emerald-800"
        />
      </div>

      {/* Exercise 2: ContactForm */}
      <div id="ex-2" className="scroll-mt-36 bg-white border border-emerald-200/80 rounded-2xl p-6 shadow-md shadow-emerald-900/5">
        <div className="mb-4">
          <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">
            Exercise 2
          </span>
          <h3 className="text-lg font-extrabold text-slate-900 mt-1">
            Contact Form with Inline Validation &amp; Reset
          </h3>
        </div>

        {contactSubmittedName ? (
          <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-bold text-emerald-900">
              Thank you, {contactSubmittedName}! We&apos;ll be in touch.
            </p>
            <button
              type="button"
              onClick={() => setContactSubmittedName('')}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 cursor-pointer"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleContactSubmit} className="space-y-3.5 max-w-xl">
            {['name', 'email', 'message'].map((field) => (
              <div key={field}>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  {field}
                </label>
                {field === 'message' ? (
                  <textarea
                    name={field}
                    value={contactForm[field]}
                    onChange={handleContactChange}
                    rows={3}
                    placeholder="Your message..."
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:bg-white focus:outline-none focus:border-emerald-500"
                  />
                ) : (
                  <input
                    name={field}
                    value={contactForm[field]}
                    onChange={handleContactChange}
                    placeholder={`Enter ${field}...`}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:bg-white focus:outline-none focus:border-emerald-500"
                  />
                )}
                {contactErrors[field] && (
                  <p className="mt-1 text-xs font-semibold text-rose-600">{contactErrors[field]}</p>
                )}
              </div>
            ))}
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs cursor-pointer"
            >
              Send Message
            </button>
          </form>
        )}

        <CodeDrawer
          title="ContactForm"
          code={CODE_SNIPPETS.ex2}
          accentClass="text-emerald-700 hover:text-emerald-800"
        />
      </div>

      {/* Exercise 3: SkillPicker */}
      <div id="ex-3" className="scroll-mt-36 bg-white border border-emerald-200/80 rounded-2xl p-6 shadow-md shadow-emerald-900/5">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">
              Exercise 3
            </span>
            <h3 className="text-lg font-extrabold text-slate-900 mt-1">
              Programming Skill Picker (Max 3 Warning)
            </h3>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
              selectedSkills.length > 3
                ? 'bg-rose-100 text-rose-700 border border-rose-200'
                : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
            }`}
          >
            Selected: {selectedSkills.length} / 3
          </span>
        </div>

        {selectedSkills.length > 3 && (
          <div className="mb-3 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Please select at most 3 skills.</span>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {SKILLS_LIST.map((skill) => {
            const checked = selectedSkills.includes(skill);
            return (
              <label
                key={skill}
                className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                  checked
                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-emerald-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => toggleSkill(skill, e.target.checked)}
                  className="sr-only"
                />
                <span className="w-4 h-4 rounded border border-current flex items-center justify-center">
                  {checked && <Check className="w-3 h-3" />}
                </span>
                <span>{skill}</span>
              </label>
            );
          })}
        </div>

        <CodeDrawer
          title="SkillPicker"
          code={CODE_SNIPPETS.ex3}
          accentClass="text-emerald-700 hover:text-emerald-800"
        />
      </div>
    </div>
  );
}

// ============================================================================
// TAB 3: VIDEO LECTURE EXERCISE — AMBER & CORAL THEME (ENHANCED)
// ============================================================================

function VideoLectureFeedbackView() {
  const TOPICS = [
    { name: 'HTML', desc: 'Semantic structure & form attributes' },
    { name: 'CSS', desc: 'Responsive layouts & Tailwind styling' },
    { name: 'JavaScript', desc: 'ES6+ array methods & regex validation' },
    { name: 'Git', desc: 'Version control & GitHub workflow' },
    { name: 'React', desc: 'useState, controlled inputs & onSubmit' },
  ];

  const LECTURE_MODULES = [
    'Week 6 · React Controlled Forms & Validation (K0126_002)',
    'Week 5 · React State, Events & Conditional Rendering',
    'Week 4 · Modern JavaScript (ES6+) & DOM APIs',
    'Week 3 · Responsive CSS Grid, Flexbox & Tailwind',
  ];

  const PACE_OPTIONS = ['Too Fast', 'Just Right', 'Too Slow'];

  const LECTURE_QUALITY_OPTIONS = [
    'Clear & Engaging',
    'Well-Structured',
    'Needs More Live Demos',
  ];

  const PARTICIPATION_OPTIONS = [
    'Highly Interactive',
    'Balanced Q&A',
    'Needs More Group Practice',
  ];

  const MATERIALS_OPTIONS = [
    'Very Helpful (Slides & Study Guide)',
    'Good Reference Code',
    'Needs More Examples',
  ];

  const RATINGS = [
    { stars: '⭐⭐⭐⭐⭐', label: '5 / 5 — Excellent' },
    { stars: '⭐⭐⭐⭐', label: '4 / 5 — Very Good' },
    { stars: '⭐⭐⭐', label: '3 / 5 — Good' },
  ];

  const [studentName, setStudentName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [lectureModule, setLectureModule] = useState(LECTURE_MODULES[0]);
  const [rating, setRating] = useState('');
  const [pace, setPace] = useState('Just Right');
  const [lectureQuality, setLectureQuality] = useState(LECTURE_QUALITY_OPTIONS[0]);
  const [classParticipation, setClassParticipation] = useState(PARTICIPATION_OPTIONS[0]);
  const [materialsQuality, setMaterialsQuality] = useState(MATERIALS_OPTIONS[0]);
  const [topics, setTopics] = useState([]);
  const [comments, setComments] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const MAX_COMMENTS = 300;
  // Bonus: Disable submit button while any required field is empty
  const isSubmitDisabled = !studentName.trim() || !studentId.trim() || !rating;

  const requiredCompletedCount = [
    studentName.trim().length > 0,
    /^\d{8}$/.test(studentId),
    Boolean(rating),
  ].filter(Boolean).length;

  function handleTopicToggle(topicName, checked) {
    setTopics((prev) =>
      checked ? [...prev, topicName] : prev.filter((t) => t !== topicName)
    );
  }

  function fillDemoFeedback() {
    setStudentName('Sabhyata Chhetri');
    setStudentId('20253947');
    setLectureModule(LECTURE_MODULES[0]);
    setRating('⭐⭐⭐⭐⭐');
    setPace('Just Right');
    setLectureQuality(LECTURE_QUALITY_OPTIONS[0]);
    setClassParticipation(PARTICIPATION_OPTIONS[0]);
    setMaterialsQuality(MATERIALS_OPTIONS[0]);
    setTopics(['HTML', 'CSS', 'JavaScript', 'React']);
    setComments(
      'The lectures were super clear and engaging, class participation kept everyone active, and the study guide + lecture slides provided great hands-on React examples!'
    );
    setErrors({});
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
    setLectureModule(LECTURE_MODULES[0]);
    setRating('');
    setPace('Just Right');
    setLectureQuality(LECTURE_QUALITY_OPTIONS[0]);
    setClassParticipation(PARTICIPATION_OPTIONS[0]);
    setMaterialsQuality(MATERIALS_OPTIONS[0]);
    setTopics([]);
    setComments('');
    setErrors({});
    setSubmitted(false);
  }

  const feedbackReceiptJson = JSON.stringify(
    {
      course: 'Web Programming (K0126_002)',
      institution: 'Gachon University · Department of Computer Science',
      module: lectureModule,
      studentName,
      studentId,
      rating,
      lectureQuality,
      classParticipation,
      materialsProvided: materialsQuality,
      lecturePace: pace,
      topicsCoveredWell: topics,
      comments: comments || '(No additional comments)',
    },
    null,
    2
  );

  return (
    <div className="space-y-6">
      {/* Informative Overview Banner with Web Programming Class Context */}
      <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-orange-50/80 border border-amber-200 rounded-2xl p-6 shadow-sm">
        <FloralBlossom
          className="w-24 h-24 absolute -top-5 -right-5 opacity-20 pointer-events-none"
          petalColor="#F59E0B"
          centerColor="#F43F5E"
        />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-200 text-amber-800 text-xs font-bold">
              <Video className="w-3.5 h-3.5 text-amber-600" />
              <span>Video Lecture · Page 13 Exercise · Web Programming (K0126_002)</span>
            </div>
            <h2
              id="section-video-lecture"
              tabIndex={-1}
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight scroll-mt-36 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg"
            >
              3. Video Lecture: Course Feedback Form
            </h2>
            <p className="text-sm text-slate-700 max-w-3xl leading-relaxed">
              Built for <strong className="text-slate-900">Web Programming · K0126_002 (Gachon University)</strong> to evaluate our React Forms &amp; Frontend Architecture lectures. Combines 8-digit Student ID validation, star ratings, optional topic mastery chips, a 300-character live counter, and a derived boolean (<code className="text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded font-mono text-xs">isSubmitDisabled</code>) that unlocks submission once required fields are complete.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={fillDemoFeedback}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white hover:bg-amber-50 text-amber-800 border border-amber-300 shadow-xs transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Fill Demo (Sabhyata)
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-xs transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              Reset
            </button>
          </div>
        </div>

        {/* Web Programming Class Syllabus & Metadata Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5 pt-4 border-t border-amber-200/70">
          <div className="bg-white/80 border border-amber-200/80 rounded-xl p-3">
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-amber-700">
              Course &amp; Section
            </p>
            <p className="text-xs font-bold text-slate-900 mt-0.5">
              Web Programming · K0126_002
            </p>
            <p className="text-[11px] text-slate-600">
              Dept. of Computer Science · Gachon Univ.
            </p>
          </div>
          <div className="bg-white/80 border border-amber-200/80 rounded-xl p-3">
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-amber-700">
              Core Stack Covered
            </p>
            <p className="text-xs font-bold text-slate-900 mt-0.5">
              HTML5 · CSS3 · ES6+ JS · Git · React
            </p>
            <p className="text-[11px] text-slate-600">
              Controlled inputs, hooks &amp; client validation
            </p>
          </div>
          <div className="bg-white/80 border border-amber-200/80 rounded-xl p-3">
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-amber-700">
              Bonus Unlock Gate
            </p>
            <p className="text-xs font-bold text-slate-900 mt-0.5">
              {requiredCompletedCount} / 3 Required Fields Ready
            </p>
            <p className="text-[11px] text-slate-600">
              {isSubmitDisabled
                ? 'Submit button locked until Name, ID & Rating are set'
                : 'Unlocked! Ready to submit feedback'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Feedback Card */}
      <div className="max-w-3xl mx-auto bg-white border border-amber-200/90 rounded-2xl p-6 sm:p-8 shadow-lg shadow-amber-900/5">
        {submitted ? (
          <div className="space-y-5">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-orange-500/25">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">
                Thank you, {studentName}!
              </h3>
              <p className="text-sm text-slate-600 max-w-lg mx-auto">
                Your evaluation for <strong className="text-slate-900">Web Programming (K0126_002)</strong> has been recorded for Student ID{' '}
                <span className="font-mono font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                  {studentId}
                </span>.
              </p>
            </div>

            {/* Structured Submission Receipt */}
            <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-5 space-y-3 text-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-200/80 pb-2.5">
                <span className="font-extrabold uppercase tracking-wider text-amber-900">
                  Official Course Feedback Receipt
                </span>
                <CopyButton text={feedbackReceiptJson} label="Copy Feedback JSON" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <span className="text-slate-500 block">Evaluated Lecture Module</span>
                  <span className="font-bold text-slate-900">{lectureModule}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Overall Rating &amp; Lecture Pace</span>
                  <span className="font-bold text-slate-900">
                    {rating} · Pace: {pace}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">How Were the Lectures?</span>
                  <span className="font-bold text-amber-900">{lectureQuality}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Class Participation</span>
                  <span className="font-bold text-amber-900">{classParticipation}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-slate-500 block">Materials Provided (Slides &amp; Study Guide)</span>
                  <span className="font-bold text-amber-900">{materialsQuality}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-500 block mb-1">Topics Covered Well</span>
                {topics.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {topics.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 font-bold"
                      >
                        ✓ {t}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-slate-600 italic">None selected (optional)</span>
                )}
              </div>

              {comments.trim() && (
                <div>
                  <span className="text-slate-500 block mb-1">Student Comments</span>
                  <p className="p-3 rounded-xl bg-white border border-amber-200/80 text-slate-800 leading-relaxed">
                    &ldquo;{comments}&rdquo;
                  </p>
                </div>
              )}
            </div>

            <div className="text-center pt-1">
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
            {/* Lecture Module Context Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Web Programming Lecture Session
              </label>
              <select
                value={lectureModule}
                onChange={(e) => setLectureModule(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-amber-50/40 border border-amber-200 text-slate-900 text-sm font-semibold focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
              >
                {LECTURE_MODULES.map((mod) => (
                  <option key={mod} value={mod}>
                    {mod}
                  </option>
                ))}
              </select>
            </div>

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
                  placeholder="e.g. Sabhyata Chhetri"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm placeholder-slate-400 focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                />
                {errors.studentName && (
                  <p className="mt-1 text-xs font-semibold text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.studentName}
                  </p>
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
                  placeholder="e.g. 20253947"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-mono placeholder-slate-400 focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                />
                {errors.studentId && (
                  <p className="mt-1 text-xs font-semibold text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.studentId}
                  </p>
                )}
              </div>
            </div>

            {/* 3. Rating */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                3. Video Lecture Rating <span className="text-rose-600">*</span>
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
                <p className="mt-1 text-xs font-semibold text-rose-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.rating}
                </p>
              )}
            </div>

            {/* Lecture Pacing Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Lecture Pacing &amp; Depth
              </label>
              <div className="grid grid-cols-3 gap-2">
                {PACE_OPTIONS.map((option) => {
                  const active = pace === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setPace(option)}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        active
                          ? 'bg-amber-100 border-amber-400 text-amber-900 shadow-2xs'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-amber-300'
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Classroom Experience: Lectures, Participation & Materials Evaluation */}
            <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-900">
                  Classroom Experience &amp; Materials Evaluation
                </span>
                <span className="text-[11px] font-semibold text-amber-700">
                  K0126_002 Course Quality
                </span>
              </div>

              {/* How were the lectures? */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  How were the lectures?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {LECTURE_QUALITY_OPTIONS.map((opt) => {
                    const active = lectureQuality === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setLectureQuality(opt)}
                        className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          active
                            ? 'bg-amber-500 border-amber-500 text-white shadow-xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-amber-300'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* How was class participation? */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  How was class participation &amp; student engagement?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {PARTICIPATION_OPTIONS.map((opt) => {
                    const active = classParticipation === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setClassParticipation(opt)}
                        className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          active
                            ? 'bg-amber-500 border-amber-500 text-white shadow-xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-amber-300'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Were the materials provided good? */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Were the materials provided (Slides, Study Guide &amp; Starter Code) helpful?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {MATERIALS_OPTIONS.map((opt) => {
                    const active = materialsQuality === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setMaterialsQuality(opt)}
                        className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          active
                            ? 'bg-amber-500 border-amber-500 text-white shadow-xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-amber-300'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 4. Topics Covered Well */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                4. Web Programming Topics Covered Well{' '}
                <span className="text-slate-400 font-normal normal-case">(Optional)</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {TOPICS.map((topic) => {
                  const checked = topics.includes(topic.name);
                  return (
                    <label
                      key={topic.name}
                      className={`flex items-start gap-2.5 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                        checked
                          ? 'bg-amber-100/90 border-amber-400 text-amber-950 shadow-2xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-amber-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => handleTopicToggle(topic.name, e.target.checked)}
                        className="sr-only"
                      />
                      <span
                        className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                          checked
                            ? 'bg-amber-600 border-amber-600 text-white'
                            : 'bg-white border-slate-300'
                        }`}
                      >
                        {checked && <Check className="w-3 h-3" />}
                      </span>
                      <div>
                        <span className="font-extrabold block">{topic.name}</span>
                        <span className="text-[11px] text-slate-600">{topic.desc}</span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* 5. Comments */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  5. Additional Comments &amp; Questions
                </label>
                <span
                  className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                    comments.length >= MAX_COMMENTS
                      ? 'bg-rose-100 text-rose-700'
                      : comments.length > 250
                      ? 'bg-amber-100 text-amber-800'
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
                placeholder="Share feedback on our Web Programming (K0126_002) video lecture, live coding pace, or React form concepts..."
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
                  ? `Fill Required Fields (${requiredCompletedCount}/3 Ready) to Enable Submit`
                  : 'Submit Web Programming Feedback'}
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