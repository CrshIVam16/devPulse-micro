// Single issue representation
export default function IssueCard({ issue, onUpdateStatus, onDelete }) {
    const priorityColors = {
        Low: '#10b981',
        Medium: '#f59e0b',
        High: '#ef4444',
    };

    const nextStatusMap = {
        Todo: 'In Progress',
        'In Progress': 'Resolved',
        Resolved: 'Todo',
    };

    return (
        <div
            style={{
                background: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '0.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3
                    style={{
                        fontSize: '1rem',
                        textDecoration: issue.status === 'Resolved' ? 'line-through' : 'none',
                        color: issue.status === 'Resolved' ? '#64748b' : '#f8fafc',
                    }}
                >
                    {issue.title}
                </h3>

                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <span
                        style={{
                            fontSize: '0.75rem',
                            color: priorityColors[issue.priority] || '#cbd5e1',
                            fontWeight: 'bold',
                        }}
                    >
                        {issue.priority}
                    </span>
                    <span
                        style={{
                            fontSize: '0.75rem',
                            background: '#0f172a',
                            padding: '0.2rem 0.5rem',
                            borderRadius: '4px',
                            color: '#38bdf8',
                        }}
                    >
                        {issue.language}
                    </span>
                </div>
            </div>

            {issue.snippet && (
                <pre
                    style={{
                        background: '#0f172a',
                        padding: '0.6rem',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        color: '#cbd5e1',
                        overflowX: 'auto',
                    }}
                >
                    <code>{issue.snippet}</code>
                </pre>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                <button
                    onClick={() => onUpdateStatus(issue._id, nextStatusMap[issue.status])}
                    style={{
                        background: 'transparent',
                        border: '1px solid #475569',
                        color: '#cbd5e1',
                        padding: '0.3rem 0.7rem',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                    }}
                >
                    Move to: <strong>{nextStatusMap[issue.status]}</strong>
                </button>

                <button
                    onClick={() => onDelete(issue._id)}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#ef4444',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                    }}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}