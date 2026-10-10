// Status filter tabs
export default function FilterBar({ currentFilter, onFilterChange }) {
    const filters = ['All', 'Todo', 'In Progress', 'Resolved'];

    return (
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
            {filters.map((filter) => (
                <button
                    key={filter}
                    onClick={() => onFilterChange(filter)}
                    style={{
                        padding: '0.45rem 1rem',
                        borderRadius: '6px',
                        border: 'none',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        background: currentFilter === filter ? '#38bdf8' : '#1e293b',
                        color: currentFilter === filter ? '#0f172a' : '#94a3b8',
                        transition: 'all 0.2s',
                    }}
                >
                    {filter}
                </button>
            ))}
        </div>
    );
}