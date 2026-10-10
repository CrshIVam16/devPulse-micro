import { useState } from 'react';

// Input form to log new bugs or snippets
export default function IssueForm({ onAddIssue }) {
    const [title, setTitle] = useState('');
    const [snippet, setSnippet] = useState('');
    const [language, setLanguage] = useState('javascript');
    const [priority, setPriority] = useState('Medium');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        onAddIssue({ title, snippet, language, priority });
        setTitle('');
        setSnippet('');
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                background: '#1e293b',
                padding: '1.25rem',
                borderRadius: '8px',
                marginBottom: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                border: '1px solid #334155',
            }}
        >
            <input
                type="text"
                placeholder="Bug title or task summary..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                style={{
                    padding: '0.6rem 0.8rem',
                    background: '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: '6px',
                    color: '#fff',
                }}
            />

            <textarea
                placeholder="Code snippet or error context (optional)..."
                value={snippet}
                rows={3}
                onChange={(e) => setSnippet(e.target.value)}
                style={{
                    padding: '0.6rem 0.8rem',
                    background: '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: '6px',
                    color: '#38bdf8',
                    fontFamily: 'monospace',
                    fontSize: '0.85rem',
                }}
            />

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    style={{
                        padding: '0.5rem',
                        background: '#0f172a',
                        color: '#cbd5e1',
                        borderRadius: '6px',
                        border: '1px solid #334155',
                    }}
                >
                    <option value="javascript">JavaScript</option>
                    <option value="react">React</option>
                    <option value="python">Python</option>
                    <option value="general">General</option>
                </select>

                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    style={{
                        padding: '0.5rem',
                        background: '#0f172a',
                        color: '#cbd5e1',
                        borderRadius: '6px',
                        border: '1px solid #334155',
                    }}
                >
                    <option value="Low">Low Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="High">High Priority</option>
                </select>

                <button
                    type="submit"
                    style={{
                        marginLeft: 'auto',
                        padding: '0.5rem 1.25rem',
                        background: '#2563eb',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        fontWeight: 600,
                        cursor: 'pointer',
                    }}
                >
                    Log Ticket
                </button>
            </div>
        </form>
    );
}