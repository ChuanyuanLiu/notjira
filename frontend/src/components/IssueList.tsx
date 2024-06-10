import React from 'react';
import Issue from './Issue';
import { IssueType } from '../type';

export default function IssueList({ onEdit }: { onEdit: (issue: IssueType) => void }) {
    const [issues, setIssues] = React.useState<IssueType[]>([]);

    React.useEffect(() => {
        fetch('http://localhost:3000/issues')
            .then(response => response.json())
            .then(data => setIssues(data))
            .catch(error => console.error('There was an error!', error));
    }, []);

    const handleDelete = (id: number) => {
        fetch(`http://localhost:3000/issues/${id}`)
            .then(() => setIssues(issues.filter(issue => issue.id !== id)))
            .catch(error => console.error('There was an error!', error));
    };

    return (
        <div>
            {issues.map(issue => (
                <Issue key={issue.id} {...issue} onDelete={handleDelete} onEdit={onEdit} />
            ))}
        </div>
    );
}
