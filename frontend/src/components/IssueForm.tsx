import React, { useState } from 'react';

interface IssueFormProps {
    issue?: { id: number; title: string; description: string };
    postSubmit: () => void;
}

// For both edit and the creation of new issues
export default function IssueForm({ issue, postSubmit }: IssueFormProps) {
    const [title, setTitle] = useState(issue ? issue.title : '');
    const [description, setDescription] = useState(issue ? issue.description : '');

    React.useEffect(() => {
        setTitle(issue ? issue.title : '');
        setDescription(issue ? issue.description : '');
    }, [issue]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let response = null;
        if (issue) {
            response = await fetch(`http://localhost:3000/issues/${issue.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, description }),
            });
        } else {
            response = await fetch('http://localhost:3000/issues', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, description }),
            });
        }
        if (response.ok) {
            console.log("Issue created/updated successfully");
        } else {
            console.error("There was an error!");
        }
        // tell the parent component to refresh the list of issues
        postSubmit()
    };

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
            <div className='flex gap-3'>
                <label>Title</label>
                <input type="text" className='input input-bordered input-sm' value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div className='flex gap-3'>
                <label>Description</label>
                <textarea className='textarea textarea-bordered' value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <button type="submit" className='btn'>{issue ? 'Update' : 'Create'} Issue</button>
        </form>
    );
}
