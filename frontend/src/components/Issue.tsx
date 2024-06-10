import { useAtom } from "jotai";
import { IssueType, editingIssueAtom } from "../data";

interface IssueProps {
    issue: IssueType;
    onDelete: (id: number) => void;
}

export default function Issue({ issue: { id, title, description }, onDelete }: IssueProps) {
    const [, setEditingIssue] = useAtom(editingIssueAtom);

    const onEdit = (issue: IssueType) => {
        setEditingIssue(issue);
    }

    return (
        <div>
            <h2>{title}</h2>
            <p>{description}</p>
            <button onClick={() => onEdit({ id, title, description })}>Edit</button>
            <button onClick={() => onDelete(id)}>Delete</button>
        </div>
    );
}
