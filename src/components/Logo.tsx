type Props = { className?: string; accent?: string };

// Logo Version A: "The Turn".
export default function Logo({ className, accent = 'var(--color-pist)' }: Props) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path fill="currentColor" d="M12 8H32V42H88V92H68V60H32V92H12Z" />
      <path fill={accent} d="M39 8H60A28 28 0 0 1 88 36H68A8 8 0 0 0 60 28H39Z" />
    </svg>
  );
}
