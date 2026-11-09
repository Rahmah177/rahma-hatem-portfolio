import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

type Props = { src: string; alt: string; onClose: () => void };

export default function Lightbox({ src, alt, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div role="dialog" aria-modal="true" aria-label={alt} className="on-dark fixed inset-0 z-50 overflow-auto bg-black/95 p-4" onClick={onClose}>
      <button ref={closeRef} type="button" aria-label="Close" onClick={onClose} className="fixed right-4 top-4 z-10 bg-pist p-2 text-aub"><X /></button>
      <img src={src} alt={alt} className="mx-auto block h-auto max-w-full" onClick={(e) => e.stopPropagation()} />
    </div>
  );
}
