import { Link, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
    { to: '/', label: 'start/' },
    { to: '/posts', label: 'posts/' },
    { to: '/about-us', label: 'about-us/' },
];

export default function Header() {
    const { pathname } = useLocation();

    // Map current path to a terminal-style directory string
    const currentPath = pathname === '/' ? '~' : `~${pathname}`;

    return (
        <header>
            {/* ── Prompt line ── */}
            <div className="flex items-center flex-wrap gap-x-1 text-sm sm:text-base">
                <span className="text-green font-bold">clawdi@dev-notes</span>
                <span className="text-fg">:</span>
                <span className="text-cyan font-bold">{currentPath}</span>
                <span className="text-fg">#</span>
                <span className="cursor-blink text-green font-bold ml-1" aria-hidden="true">_</span>
            </div>

            {/* ── Navigation ── */}
            <nav className="mt-3 flex flex-wrap gap-x-4 gap-y-1" aria-label="Main navigation">
                {NAV_ITEMS.map(({ to, label }) => {
                    const isActive = pathname === to || (to !== '/' && pathname.startsWith(to));
                    return (
                        <Link
                            key={to}
                            to={to}
                            className={`
                text-sm transition-colors duration-150
                ${isActive
                                    ? 'text-green font-bold'
                                    : 'text-cyan hover:text-green glow-hover'
                                }
              `}
                        >
                            {isActive ? `> ${label}` : `  ${label}`}
                        </Link>
                    );
                })}
            </nav>
        </header>
    );
}
