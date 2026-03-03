import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

// ── Frontmatter parser (lightweight, no gray-matter dep) ──
function parseFrontmatter(raw) {
    const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!match) return { meta: {}, content: raw };

    const meta = {};
    match[1].split('\n').forEach((line) => {
        const idx = line.indexOf(':');
        if (idx > 0) {
            const key = line.slice(0, idx).trim();
            let val = line.slice(idx + 1).trim();
            // strip surrounding quotes
            if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
                val = val.slice(1, -1);
            }
            // parse arrays like [tag1, tag2]
            if (val.startsWith('[') && val.endsWith(']')) {
                val = val.slice(1, -1).split(',').map((s) => s.trim().replace(/^["']|["']$/g, ''));
            }
            meta[key] = val;
        }
    });

    return { meta, content: match[2] };
}

// ── Roman numeral converter ──
function toRoman(num) {
    const map = [
        [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
    ];
    let result = '';
    for (const [value, symbol] of map) {
        while (num >= value) {
            result += symbol;
            num -= value;
        }
    }
    return result;
}

export default function PostDetail() {
    const { slug } = useParams();
    const [meta, setMeta] = useState({});
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        setLoading(true);
        setError(null);

        fetch(`${import.meta.env.BASE_URL}posts/${slug}.md`)
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.text();
            })
            .then((raw) => {
                const { meta, content } = parseFrontmatter(raw);
                setMeta(meta);
                setContent(content);
                setLoading(false);

                // Update page title
                document.title = meta.title
                    ? `${meta.title} — Clawdi Dev-Notes`
                    : 'Clawdi Dev-Notes';
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [slug]);

    // Pre-process markdown: inject roman numerals into h2 headings
    const processedContent = useMemo(() => {
        let count = 0;
        return content.replace(/^## (.+)$/gm, (_, title) => {
            count++;
            return `## ${toRoman(count)}. ${title}`;
        });
    }, [content]);

    if (loading) {
        return (
            <div className="text-comment/60">
                <span className="text-green/70">$</span> cat posts/{slug}.md
                <span className="cursor-blink">_</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red">
                <span className="text-fg">$ cat posts/{slug}.md</span>
                <br />
                <span>error: {error}</span>
                <br /><br />
                <Link to="/posts" className="text-cyan hover:text-green">
                    ← cd ../posts/
                </Link>
            </div>
        );
    }

    return (
        <article className="animate-fade-in">
            {/* ── Back link ── */}
            <Link to="/posts" className="text-comment/50 text-xs hover:text-cyan transition-colors">
                ← cd ../posts/
            </Link>

            {/* ── Post header ── */}
            <header className="mt-6 mb-3">
                <h1 className="text-purple font-bold text-xl">
                    {meta.title || slug}
                </h1>
                <div className="flex items-center gap-3 mt-2 text-xs">
                    {meta.date && (
                        <span className="text-pink/60">[{meta.date}]</span>
                    )}
                    {Array.isArray(meta.tags) && meta.tags.map((tag) => (
                        <span key={tag} className="text-comment/50">#{tag}</span>
                    ))}
                </div>
            </header>

            <div className="text-comment/30 text-xs overflow-hidden whitespace-nowrap select-none mb-8"
                aria-hidden="true">
                ════════════════════════════════════════════════════════════════════════════════
            </div>

            {/* ── Structured data (JSON-LD) ── */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Article',
                        headline: meta.title || slug,
                        datePublished: meta.date || undefined,
                        author: { '@type': 'Person', name: 'Clawdi' },
                    }),
                }}
            />

            {/* ── Markdown content ── */}
            <div className="markdown-body">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                        // Syntax highlighting for code blocks
                        code({ node, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '');
                            const inline = !match && !className;
                            return !inline ? (
                                <SyntaxHighlighter
                                    style={dracula}
                                    language={match ? match[1] : 'text'}
                                    PreTag="div"
                                    customStyle={{
                                        background: '#1a1a2e',
                                        fontSize: '0.85rem',
                                        borderRadius: '4px',
                                        border: '1px solid #6272a4',
                                    }}
                                    {...props}
                                >
                                    {String(children).replace(/\n$/, '')}
                                </SyntaxHighlighter>
                            ) : (
                                <code className={className} {...props}>
                                    {children}
                                </code>
                            );
                        },
                        // ASCII horizontal rules
                        hr() {
                            return (
                                <div className="text-comment/25 text-xs overflow-hidden whitespace-nowrap select-none my-8"
                                    aria-hidden="true">
                                    ════════════════════════════════════════════════════════════════
                                </div>
                            );
                        },
                    }}
                >
                    {processedContent}
                </ReactMarkdown>
            </div>

            {/* ── EOF marker ── */}
            <div className="mt-12 text-comment/40 text-xs">
                <div className="overflow-hidden whitespace-nowrap select-none text-comment/20" aria-hidden="true">
                    ────────────────────────────────────────────────────────────────────────────────
                </div>
                <p className="mt-3">
                    <span className="text-green/40">$</span> # EOF — {slug}.md
                </p>
            </div>
        </article>
    );
}
