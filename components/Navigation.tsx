import Link from 'next/link';
import Logo from './Logo';

export default function Navigation() {
  return (
    <nav className="border-b border-gray-800 bg-[#0a0e27]/95 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-white hover:text-cyan-400 transition-colors">
            <Logo />
          </Link>
          <div className="flex gap-10 items-center">
            <Link href="/product" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
              Strategy
            </Link>
            <Link
              href="/dashboard"
              className="bg-cyan-500 text-[#0a0e27] px-8 py-2.5 rounded-lg text-sm font-bold hover:bg-cyan-400 transition-colors"
            >
              Access Vault
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
