import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const links = [
  ['directory.html', 'Student directory'],
  ['products.html', 'Product cards'],
  ['courses.html', 'Course catalog'],
  ['practice.html', 'Interactive practice'],
  ['gallery.html', 'Project gallery'],
  ['examples.html', 'Component lab'],
];

// Highlights the exercise you're on in the nav.
const currentPage = window.location.pathname.split('/').pop();

function Header() {
  return <header className="site-header"><a className="brand" href="./coursework.html">React Lab <span>Week 11</span></a><nav aria-label="Week 11 pages">{links.map(([href, label]) => <a key={href} href={`./${href}`} aria-current={currentPage===href?'page':undefined}>{label}</a>)}</nav></header>;
}
function Layout({ title, intro, children }) {
  return <main className="page"><Header/><section className="intro"><p className="eyebrow">WEB PROGRAMMING · WEEK 11</p><h1>{title}<span>.</span></h1><p className="intro-copy">{intro}</p></section>{children}<footer className="footer"><a href="./coursework.html">Week 11 exercise menu</a><span>React components · practice project</span></footer></main>;
}
function Home() {
  return <Layout title="Week 11 coursework" intro="A set of React component exercises, collected alongside the existing project gallery."><section className="card-grid">{links.map(([href,label],i)=><a className="card link-card" href={`./${href}`} key={href}><span className="eyebrow">EXERCISE 0{i+1}</span><h2>{label}</h2><span className="more">Open exercise ↗</span></a>)}</section><p className="note">These pages are additional coursework examples; the existing Week 11 project gallery remains available at <a href="./index.html">index.html</a>.</p></Layout>;
}
function Directory() {
  const students = [
    { name: 'Student One', id: 'Sample ID 01', major: 'Web Programming', year: 1 },
    { name: 'Student Two', id: 'Sample ID 02', major: 'Web Programming', year: 1 },
    { name: 'Student Three', id: 'Sample ID 03', major: 'Web Programming', year: 1 },
  ];
  return <Layout title="Student directory" intro="Three profile cards rendered with one reusable component and different props."><section className="card-grid" aria-label="Sample student profiles">{students.map((student,i)=><article className="card profile" key={student.id}><p className="eyebrow">0{i+1} / STUDENT</p><h2>{student.name}</h2><p><strong>ID:</strong> {student.id}</p><p><strong>Major:</strong> {student.major}</p><p><strong>Year:</strong> {student.year}</p></article>)}</section><p className="note">All names and IDs above are sample data.</p></Layout>;
}
const inventory = [
  { name: 'Wireless Earbuds', price: 89000, rating: 4.5, inStock: true },
  { name: 'Compact Keyboard', price: 69000, rating: 4.2, inStock: false },
  { name: 'USB-C Hub', price: 35000, rating: 4.0, inStock: true },
  { name: 'Wireless Mouse', price: 29000, rating: 4.6, inStock: true },
  { name: 'Laptop Stand', price: 39000, rating: 4.4, inStock: false },
  { name: 'Webcam', price: 49000, rating: 4.3, inStock: true },
];
function Products() {
  return <Layout title="Product cards" intro="A reusable ProductCard receives name, price, rating, and stock status through props."><section className="card-grid">{inventory.map((item)=><article className="card" key={item.name}><p className="eyebrow">SAMPLE PRODUCT</p><h2>{item.name}</h2><p className="price">{item.price.toLocaleString('ko-KR')}원</p><p>★ {item.rating} / 5</p><span className={`badge ${item.inStock?'good':'bad'}`}>{item.inStock?'In stock':'Out of stock'}</span></article>)}</section><p className="note">Sample product data for practicing props and conditional rendering.</p></Layout>;
}
const courses = [
  { title: 'Web Programming', instructor: 'Web Development Team', credits: 3, required: true },
  { title: 'Database Systems', instructor: 'Database Team', credits: 3, required: true },
  { title: 'Mobile App Development', instructor: 'Mobile Development Team', credits: 2, required: false },
  { title: 'Operating Systems', instructor: 'Sample instructor', credits: 3, required: true },
  { title: 'Artificial Intelligence', instructor: 'Sample instructor', credits: 2, required: false },
  { title: 'College English', instructor: 'Sample instructor', credits: 1, required: false },
];
function Courses() {
  return <Layout title="Course catalog" intro="Map over course data and use a reusable card with conditional course-type badges."><section className="card-grid">{courses.map(course=><article className="card" key={course.title}><span className={`badge ${course.required?'bad':'neutral'}`}>{course.required?'Required':'Elective'}</span><h2>{course.title}</h2><p>{course.instructor}</p><p className="price">{course.credits} {course.credits===1?'credit':'credits'}</p></article>)}</section><p className="note">Instructor names and course classifications are example data.</p></Layout>;
}
function Practice() {
  const [name,setName]=useState('Your name');
  const [messages,setMessages]=useState(['Welcome to the practice inbox.','Try changing a profile prop.']);
  const [checked,setChecked]=useState([]);
  const steps=['Pass values through props','Render a list with keys','Use conditional output','Compose components'];
  return <Layout title="Interactive practice" intro="Edit component props, add sample inbox items, and track React concepts you have practiced."><section className="card-grid two-col"><article className="card"><p className="eyebrow">01 / PROPS</p><h2>Profile preview</h2><label className="field">Display name<input value={name} onChange={event=>setName(event.target.value)} maxLength={60}/></label><div className="preview"><span className="avatar">{name.trim().charAt(0).toUpperCase()||'?'}</span><strong>{name||'Your name'}</strong><span>Web programming student</span></div></article><article className="card"><p className="eyebrow">02 / LISTS & STATE</p><h2>Demo inbox ({messages.length})</h2><button className="button" onClick={()=>setMessages(current=>[...current,`Sample reminder ${current.length+1}`])}>Add a demo reminder</button><ul className="list">{messages.map((message,index)=><li key={`${message}-${index}`}>{message}<button className="text-button" aria-label={`Dismiss ${message}`} onClick={()=>setMessages(current=>current.filter((_,i)=>i!==index))}>Dismiss</button></li>)}</ul>{messages.length===0&&<p>No demo messages. Add one to try again.</p>}</article><article className="card full"><p className="eyebrow">03 / COMPOSITION</p><h2>Practice checklist</h2>{steps.map(step=><label className="check" key={step}><input type="checkbox" checked={checked.includes(step)} onChange={event=>setChecked(current=>event.target.checked?[...current,step]:current.filter(item=>item!==step))}/>{step}</label>)}<p className="note">{checked.length} of {steps.length} concepts checked.</p></article></section></Layout>;
}
const projects=[
  {title:'Project Gallery',description:'An interactive gallery with searchable, filterable project cards.',tech:['React','JavaScript','CSS']},
  {title:'Student Directory',description:'Reusable student profile components rendered from data.',tech:['React','CSS']},
  {title:'Web Programming',description:'Coursework and front-end practice projects.',tech:['HTML','JavaScript']},
];
function Gallery() {
  const [technology,setTechnology]=useState('All');
  const filters=['All',...new Set(projects.flatMap(project=>project.tech))];
  const visible=technology==='All'?projects:projects.filter(project=>project.tech.includes(technology));
  return <Layout title="Project gallery" intro="Practice array rendering and technology filters with reusable project cards."><div className="filters" role="group" aria-label="Filter projects by technology">{filters.map(filter=><button className={`button ${technology===filter?'selected':''}`} aria-pressed={technology===filter} key={filter} onClick={()=>setTechnology(filter)}>{filter}</button>)}</div><p className="note" role="status">Showing {visible.length} {visible.length===1?'project':'projects'}.</p><section className="card-grid">{visible.map(project=><article className="card" key={project.title}><p className="eyebrow">SELECTED WORK</p><h2>{project.title}</h2><p>{project.description}</p><div className="tags">{project.tech.map(tech=><span className="badge neutral" key={tech}>{tech}</span>)}</div></article>)}</section></Layout>;
}
function Examples() {
  const people=['Alex','Jordan','Taylor'];
  const [showAlert,setShowAlert]=useState(true);
  const scores=[{name:'Learner A',score:88},{name:'Learner B',score:45}];
  return <Layout title="Component lab" intro="Examples of functional components, mapped lists, conditional rendering, and composition."><section className="card-grid"><article className="card"><p className="eyebrow">01 / PROPS</p><h2>Greetings</h2>{people.map(person=><p key={person}>Hello, {person}!</p>)}</article><article className="card"><p className="eyebrow">02 / CONDITIONALS</p><h2>Alert</h2><button className="button" onClick={()=>setShowAlert(value=>!value)}>{showAlert?'Hide':'Show'} message</button>{showAlert&&<p className="notice">Your practice page is ready.</p>}</article><article className="card full"><p className="eyebrow">03 / LISTS & CONDITIONAL OUTPUT</p><h2>Grade board</h2><div className="card-grid">{scores.map(student=><div className="card" key={student.name}><h3>{student.name}</h3><p>Score: {student.score}</p><span className={`badge ${student.score>=60?'good':'bad'}`}>{student.score>=60?'Pass':'Needs practice'}</span></div>)}</div></article></section></Layout>;
}
function App() {
  const page=window.location.pathname.split('/').pop();
  const pages={'coursework.html':Home,'directory.html':Directory,'products.html':Products,'courses.html':Courses,'practice.html':Practice,'gallery.html':Gallery,'examples.html':Examples};
  const Page=pages[page]||Home;
  return <Page/>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
