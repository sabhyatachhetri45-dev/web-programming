import { Icon } from './Icon.jsx';

const PERKS = [
  { icon: 'box', title: 'Dispatched in 2 days', copy: 'From our studio in Seongnam' },
  { icon: 'leaf', title: 'Wrapped in paper', copy: 'No plastic, ever' },
  { icon: 'returnArrow', title: '14-day returns', copy: 'Changed your mind? That’s fine' },
];

export function StoreIntro({ isInert }) {
  return (
    <section className="intro" id="top" aria-labelledby="intro-title" inert={isInert}>
      <div className="intro__text">
        <p className="eyebrow">Week 12 · Class 1 · Interactive shopping cart</p>
        <h1 className="intro__title" id="intro-title">
          Small things for a <em>slower</em> desk.
        </h1>
        <p className="intro__copy">
          Pastel stationery, soft lighting and a few quiet gadgets — picked for long study nights.
          Everything you add is tracked with React state, right in your bag.
        </p>
      </div>

      <ul className="perks" aria-label="Why shop with us">
        {PERKS.map((perk) => (
          <li key={perk.title} className="perk">
            <span className="perk__icon">
              <Icon name={perk.icon} />
            </span>
            <span>
              <strong className="perk__title">{perk.title}</strong>
              <span className="perk__copy">{perk.copy}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
