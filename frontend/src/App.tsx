import React from 'react';
import IssueList from './components/IssueList';
import IssueForm from './components/IssueForm';
import { issuesAtom, editingIssueAtom } from './data';
import { useAtom } from 'jotai';

export default function App() {
    const [, setIssues] = useAtom(issuesAtom);
    const [editingIssue, setEditingIssue] = useAtom(editingIssueAtom);

    const refresh = React.useCallback(() => fetch('http://localhost:3000/issues')
        .then(response => response.json())
        .then(data => setIssues(data))
        .catch(error => console.error('There was an error!', error))
        , [setIssues])

    // initial loading
    React.useEffect(() => {
        refresh()
    }, [refresh]);

    const postSubmit = () => {
        setEditingIssue(undefined);
        refresh()
    };

    const postDelete = () => {
        refresh()
    }

    return (
        <div className="App">
            <h1>Issue Tracker</h1>
            <IssueForm issue={editingIssue} postSubmit={postSubmit} />
            <IssueList postDelete={postDelete} />
        </div>
    );
}
