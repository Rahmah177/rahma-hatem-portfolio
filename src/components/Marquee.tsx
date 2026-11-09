const items = ['Product Designer', 'UX Research', 'Problem Solving', 'User Flows', 'Design Systems', 'Prototyping'];

export default function Marquee() {
  const row = (hidden: boolean) => (
    <ul className="marquee-row" aria-hidden={hidden || undefined}>
      {items.map((t) => <li key={t}>{t}<span className="marquee-dot" aria-hidden="true" /></li>)}
    </ul>
  );
  return <div className="marquee">{row(false)}{row(true)}</div>;
}
