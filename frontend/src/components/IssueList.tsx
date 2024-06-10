import Issue from './Issue';
import { issuesAtom } from '../data';
import { useAtom } from 'jotai';

type IssueListProps = {
    postDelete: () => void;
};

export default function IssueList({ postDelete: onDelete }: IssueListProps) {
    const [issues,] = useAtom(issuesAtom);

    const handleDelete = async (id: number) => {
        await fetch(`http://localhost:3000/issues/${id}`, {
            method: 'DELETE',
        })
        onDelete()
    };

    return (
        <div>
            {issues.map(issue => (
                <Issue key={issue.id} issue={issue} onDelete={handleDelete} />
            ))}
        </div>
    );
}
