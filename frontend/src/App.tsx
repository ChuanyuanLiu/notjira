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
        document.getElementById('my_modal_1').close()
        refresh()
    };

    const postDelete = () => {
        refresh()
    }

    return (
        <div className="background-gradient w-[100vw] h-[100vh] flex flex-col items-center p-4">
            <div className='text-lg font-mono flex gap-3'>
                <div className='text-green-700'>Not</div>
                <div className='text-orange-800'> Jira</div>
            </div>
            <div className='h-[10px]' />
            <button className="btn text-2xl font-normal"
                onClick={
                    () => {
                        document.getElementById('my_modal_1').showModal()
                        setEditingIssue(undefined)
                    }
                } >
                +
            </button>
            {/* TODO: Make it a component */}
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box flex flex-col gap-4">
                    <div className="modal-action flex justify-between w-full m-0">
                        <h3 className="font-bold text-lg self-center flex">
                            {editingIssue ? "Edit Issue" : "Create Issue"}
                            {/* if there is a button in form, it will close the modal */}
                        </h3>
                        <form method="dialog">
                            <button className="btn btn-xs">x</button>
                        </form>
                    </div>
                    <IssueForm issue={editingIssue} postSubmit={postSubmit} />
                </div>
            </dialog>
            <div className='h-[80px]' />
            <IssueList postDelete={postDelete} />
        </div >
    );
}
