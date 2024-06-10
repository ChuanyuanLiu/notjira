import React, { useState } from 'react';
import IssueList from './components/IssueList';
import IssueForm from './components/IssueForm';

interface Issue {
    id: number;
    title: string;
    description: string;
}

const App: React.FC = () => {
    const [editingIssue, setEditingIssue] = useState<Issue | undefined>(undefined);

    const handleEdit = (issue: Issue) => {
        setEditingIssue(issue);
    };

    const handleFormSubmit = () => {
        setEditingIssue(undefined);
    };

    return (
        <div className="App">
            <h1>Issue Tracker</h1>
            <IssueForm issue={editingIssue} onFormSubmit={handleFormSubmit} />
            <IssueList onEdit={handleEdit} />
        </div>
    );
};

export default App;
