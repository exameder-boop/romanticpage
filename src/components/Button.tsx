import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  variant?: 'white' | 'blue' | 'ghost';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit';
}

export default function Button({
  children,
  variant = 'blue',
  onClick,
  className = '',
  disabled,
  type = 'button',
}: Props) {
  const base =
    'relative inline-flex items-center justify-center gap-2 rounded-2xl px-8 py-4 text-sm font-medium tracking-wide transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-40';

  const styles =
    variant === 'blue'
      ? 'text-white shadow-[0_8px_30px_rgba(37,99,235,0.45)] hover:shadow-[0_12px_40px_rgba(37,99,235,0.65)]'
      : variant === 'white'
        ? 'text-blue-accent bg-white hover:bg-blue-50 shadow-[0_8px_30px_rgba(255,255,255,0.15)] hover:shadow-[0_12px_40px_rgba(255,255,255,0.25)]'
        : 'text-white/70 border border-white/15 hover:border-white/30 hover:text-white';

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      className={`${base} ${styles} ${className}`}
      style={
        variant === 'blue'
          ? {
              background:
                'linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #3b82f6 100%)',
            }
          : undefined
      }
    >
      {children}
    </motion.button>
  );
}
