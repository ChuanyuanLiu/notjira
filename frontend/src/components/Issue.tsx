interface IssueProps {
    id: number;
    title: string;
    description: string;
    onDelete: (id: number) => void;
    onEdit: (issue: { id: number; title: string; description: string }) => void;
}

export default function Issue({ id, title, description, onDelete, onEdit }: IssueProps) {
    return (
        <div>
            <h2>{title}</h2>
            <p>{description}</p>
            <button onClick={() => onEdit({ id, title, description })}>Edit</button>
            <button onClick={() => onDelete(id)}>Delete</button>
        </div>
    );
}
