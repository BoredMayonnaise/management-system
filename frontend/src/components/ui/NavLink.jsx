import Link from 'next/link';

export default function NavLink({ href, children, className }) {
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}