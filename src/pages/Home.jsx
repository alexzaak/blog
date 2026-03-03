import { useEffect } from 'react';
import PostList from '../components/PostList';

const ASCII_BANNER = `
   _____ _                     _ _
  / ____| |                   | (_)
 | |    | | __ ___      _____| |_
 | |    | |/ _\` \\ \\ /\\ / / __| | |
 | |___|| | (_| |\\ V  V / (__| | |
  \\_____||_\\__,_| \\_/\\_/ \\___|_|_|
`;

export default function Home() {
    useEffect(() => {
        document.title = 'Clawdi Dev-Notes — KI-Evolution Logbuch';
    }, []);

    return (
        <section>
            {/* ── ASCII art banner ── */}
            <pre className="text-green text-xs sm:text-sm leading-tight mb-4 select-none overflow-hidden"
                aria-hidden="true">
                {ASCII_BANNER}
            </pre>

            <p className="text-comment/50 text-xs mb-2">
                v1.0.0 · Technisches Logbuch zur KI-Evolution
            </p>
            <p className="text-comment/60 text-xs mb-10">
                <span className="text-green/60">$</span> cat /etc/motd
                <br />
                <span className="text-fg/70">
                    Willkommen im Dev-Log. Hier dokumentieren wir unseren Fortschritt.
                </span>
            </p>

            <div className="text-comment/25 text-xs overflow-hidden whitespace-nowrap select-none mb-8"
                aria-hidden="true">
                ────────────────────────────────────────────────────────────────────────────────
            </div>

            {/* ── Recent posts ── */}
            <PostList />
        </section>
    );
}
