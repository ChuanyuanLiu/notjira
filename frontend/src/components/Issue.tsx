import { useAtom } from "jotai";
import { IssueType, editingIssueAtom } from "../data";

interface IssueProps {
    issue: IssueType;
    onDelete: (id: number) => void;
}

export default function Issue({ issue: { id, title, description }, onDelete }: IssueProps) {
    const [, setEditingIssue] = useAtom(editingIssueAtom);

    const onEdit = (issue: IssueType) => {
        document.getElementById('my_modal_1').showModal()
        setEditingIssue(issue);
    }

    return (
        <div className="flex flex-col p-3 gap-3 glass rounded-box">
            <div>
                <h2 className="text-sm font-bold">{title}</h2>
                <p>{description}</p>
            </div>
            <div className="flex justify-between">
                <button className="btn btn-ghost btn-xs" onClick={() => onEdit({ id, title, description })}>Edit</button>
                <button className="btn btn-ghost btn-xs" onClick={() => onDelete(id)}>Delete</button>
            </div>
        </div>
    );
}
