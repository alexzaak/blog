import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function PostList() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${import.meta.env.BASE_URL}posts/index.json`)
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((data) => {
                // Sort newest first
                const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setPosts(sorted);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="text-comment/60">
                <span className="text-green/70">$</span> loading posts
                <span className="cursor-blink">_</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red">
                <span className="text-fg/50">$ cat posts/index.json</span>
                <br />
                <span>error: {error}</span>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="text-comment/60">
                <span className="text-green/70">$</span> ls posts/<br />
                <span>total 0 — no entries found.</span>
            </div>
        );
    }

    return (
        <section>
            <h1 className="text-purple font-bold text-lg mb-2">
                ~/posts/
            </h1>
            <div className="text-comment/30 text-xs overflow-hidden whitespace-nowrap select-none mb-6"
                aria-hidden="true">
                ────────────────────────────────────────────────────────────────────────────────
            </div>

            <div className="text-comment/50 text-xs mb-8">
                <span className="text-green/60">$</span> ls -lt --reverse | head -n {posts.length}
            </div>

            <ul className="space-y-6">
                {posts.map((post, idx) => (
                    <li key={post.slug}>
                        <Link
                            to={`/posts/${post.slug}`}
                            className="group block py-5 px-4 -mx-4 transition-colors duration-150 hover:bg-surface/40 rounded"
                        >
                            <div className="flex items-start gap-4">
                                {/* Pixel-art cover thumbnail */}
                                {post.cover && (
                                    <img
                                        src={`${import.meta.env.BASE_URL}${post.cover.replace(/^\//, '')}`}
                                        alt=""
                                        className="pixel-cover w-12 h-12 sm:w-14 sm:h-14 mt-0.5 rounded-sm opacity-60 group-hover:opacity-100 transition-opacity flex-shrink-0"
                                    />
                                )}

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-baseline gap-3 flex-wrap">
                                        <span className="text-comment/70 text-xs tabular-nums">
                                            [{post.date}]
                                        </span>
                                        <span className="text-cyan group-hover:text-green transition-colors font-bold text-sm sm:text-base">
                                            {post.title}
                                        </span>
                                    </div>
                                    {post.excerpt && (
                                        <p className="text-comment/75 text-xs mt-2 leading-relaxed line-clamp-2">
                                            {post.excerpt}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </Link>

                        {/* ASCII separator between posts */}
                        {idx < posts.length - 1 && (
                            <div className="text-comment/15 text-xs overflow-hidden whitespace-nowrap select-none mt-4"
                                aria-hidden="true">
                                ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    );
}
