import { atom } from 'jotai'

export type IssueType = {
    id: number
    title: string
    description: string
}

export const issuesAtom = atom<IssueType[]>([])
export const editingIssueAtom = atom<IssueType | undefined>(undefined)
