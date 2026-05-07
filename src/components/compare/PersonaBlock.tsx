import { User, Check } from 'lucide-react';

interface PersonaBlockProps {
  name: string;
  description: string;
  colorClass: 'emerald' | 'blue';
}

export function PersonaBlock({ name, description, colorClass }: PersonaBlockProps) {
  const colors = {
    emerald: { border: 'border-emerald-500/30', bg: 'bg-emerald-500/5', heading: 'text-emerald-400', icon: 'text-emerald-400' },
    blue: { border: 'border-blue-500/30', bg: 'bg-blue-500/5', heading: 'text-blue-400', icon: 'text-blue-400' },
  }[colorClass];

  // Parse bullet lines starting with • or -
  const bullets = description
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.startsWith('•') || l.startsWith('-'))
    .map(l => l.replace(/^[•\-]\s*/, ''));

  const prose = description
    .split('\n')
    .map(l => l.trim())
    .filter(l => l && !l.startsWith('•') && !l.startsWith('-'))
    .join(' ');

  return (
    <div className={`rounded-2xl border ${colors.border} ${colors.bg} p-6`}>
      <div className="flex items-center gap-2 mb-3">
        <User className={`w-5 h-5 ${colors.icon}`} />
        <h3 className={`font-bold text-lg ${colors.heading}`}>{name}</h3>
      </div>
      {prose && <p className="text-sm text-zinc-300 leading-relaxed mb-4">{prose}</p>}
      {bullets.length > 0 && (
        <ul className="space-y-2">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-zinc-400">
              <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${colors.icon}`} />
              {b}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
