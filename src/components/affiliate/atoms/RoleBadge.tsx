"use client";

interface RoleBadgeProps {
  role: "primary" | "synergist" | "support" | string;
  className?: string;
}

const ROLE_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  primary: { bg: "rgba(201,169,97,0.12)", text: "#c9a961", border: "rgba(201,169,97,0.3)" },
  synergist: { bg: "rgba(59,130,246,0.12)", text: "#60a5fa", border: "rgba(59,130,246,0.3)" },
  support: { bg: "rgba(168,85,247,0.12)", text: "#c084fc", border: "rgba(168,85,247,0.3)" },
};

export function RoleBadge({ role, className = "" }: RoleBadgeProps) {
  const style = ROLE_STYLES[role] ?? ROLE_STYLES.support;
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border ${className}`}
      style={{ background: style.bg, color: style.text, borderColor: style.border }}
    >
      {role}
    </span>
  );
}
