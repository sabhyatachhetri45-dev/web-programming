export function StoreFooter({ isInert }) {
  return (
    <footer className="store-footer" inert={isInert}>
      <div className="store-footer__inner">
        <a className="back-link" href="../">
          ← Back to portfolio
        </a>
        <p>
          Week 12 · Web Programming · Sabhyata Chhetri. Product photos from{' '}
          <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer">
            Unsplash
          </a>
          .
        </p>
        <a className="back-link" href="weather/">
          Class 2: weather dashboard →
        </a>
      </div>
    </footer>
  );
}
