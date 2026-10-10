import React, { useState, useEffect } from 'react';
import IssueForm from './components/IssueForm';
import IssueCard from './components/IssueCard';
import FilterBar from './components/FilterBar';

const API_URL = 'http://localhost:5000/api/issues';

export default function App() {
  const [issues, setIssues] = useState([]);
  const [filter, setFilter] = useState('All');

  // Fetch issues whenever filter changes
  useEffect(() => {
    fetchIssues();
  }, [filter]);

  const fetchIssues = async () => {
    try {
      const url = filter === 'All' ? API_URL : `${API_URL}?status=${filter}`;
      const res = await fetch(url);
      const data = await res.json();
      setIssues(data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const handleAddIssue = async (newIssueData) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newIssueData),
      });
      if (res.ok) {
        fetchIssues();
      }
    } catch (err) {
      console.error('Error adding issue:', err);
    }
  };

  const handleUpdateStatus = async (id, nextStatus) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (res.ok) {
        fetchIssues();
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchIssues();
      }
    } catch (err) {
      console.error('Error deleting issue:', err);
    }
  };

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto' }}>
      <header style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>DevPulse Micro</h1>
        <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
          Developer daily bug logger & task queue
        </p>
      </header>

      <IssueForm onAddIssue={handleAddIssue} />

      <FilterBar currentFilter={filter} onFilterChange={setFilter} />

      <div>
        {issues.length === 0 ? (
          <p style={{ color: '#64748b', textAlign: 'center', marginTop: '2rem' }}>
            No issues found under {filter}.
          </p>
        ) : (
          issues.map((issue) => (
            <IssueCard
              key={issue._id}
              issue={issue}
              onUpdateStatus={handleUpdateStatus}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}