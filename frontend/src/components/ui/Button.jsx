import Link from 'next/link';

const Button = ({ href, children, className = '', variant = 'primary', ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold rounded-full transition-all shadow-lg hover:shadow-blue-200';
  const primaryStyles = 'bg-red-700 text-white hover:bg-red-600';
  const secondaryStyles = 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50';

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return primaryStyles;
      case 'secondary':
        return secondaryStyles;
      default:
        return primaryStyles;
    }
  };

  const combinedClassName = `${baseStyles} ${getVariantStyles()} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClassName} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
};

export default Button;
