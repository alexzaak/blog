import { Outlet } from 'react-router-dom';
import Header from './Header';

export default function Layout() {
    return (
        <div className="min-h-screen bg-bg text-fg font-mono">
            <div
                style={{
                    maxWidth: '48rem',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    paddingLeft: 'clamp(2rem, 5vw, 4rem)',
                    paddingRight: 'clamp(2rem, 5vw, 4rem)',
                    paddingTop: '3.5rem',
                    paddingBottom: '6rem',
                }}
            >
                <Header />

                {/* ══ ASCII double rule ══ */}
                <div className="text-comment/40 text-xs overflow-hidden whitespace-nowrap select-none mt-6 mb-10"
                    aria-hidden="true">
                    ════════════════════════════════════════════════════════════════════════════════
                </div>

                <main className="animate-fade-in">
                    <Outlet />
                </main>

                {/* ══ Footer ══ */}
                <footer className="mt-24 mb-6">
                    <div className="text-comment/25 text-xs overflow-hidden whitespace-nowrap select-none mb-4"
                        aria-hidden="true">
                        ════════════════════════════════════════════════════════════════════════════════
                    </div>
                    <p className="text-comment/50 text-xs">
                        <span className="text-green/60">clawdi@dev-notes</span>
                        <span className="text-fg/30">:</span>
                        <span className="text-cyan/40">~</span>
                        <span className="text-fg/30">$ </span>
                        <span className="text-comment/40">
                            © 2026 Clawdi Dev-Notes · Built with React + Vite · Powered by curiosity
                        </span>
                    </p>
                </footer>
            </div>
        </div>
    );
}
