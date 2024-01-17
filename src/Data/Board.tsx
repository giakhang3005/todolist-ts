import { IBoard } from "../Services/CustomHooks/useBoards"
import { ITag } from "../Services/CustomHooks/useTags"

export const testBoard: IBoard[] = [
    {
        id: 1,
        name: 'Todo',
        tasks: [
            {
                id: 4161,
                boardId: 1,
                name: 'Task 1',
                task: 'Do Task 1',
                tagId: [
                    2
                ],
            },
            {
                id: 1242,
                boardId: 1,
                name: 'Task 2',
                task: 'Do Task 2',
                tagId: [
                    2
                ],
            }
        ]
    },
    {
        id: 3,
        name: 'Done',
        tasks: [
            {
                id: 123,
                boardId: 3,
                name: 'Task 4',
                task: 'Do Task 4',
                tagId: [
                    2
                ],
            },
        ]
    },
    {
        id: 2,
        name: 'In Progress',
        tasks: [
            {
                id: 141,
                boardId: 2,
                name: 'Task 3',
                task: 'Do Task 3',
                tagId: [
                    3
                ],
            },
            {
                id: 11231,
                boardId: 2,
                name: 'Task 5',
                task: 'Do Task 5',
                tagId: [
                    3
                ],
            },
            {
                id: 141231,
                boardId: 2,
                name: 'Task 6',
                task: 'Do Task 6',
                tagId: [
                    4
                ],
            },
            {
                id: 16441,
                boardId: 2,
                name: 'Task 7',
                task: 'Do Task 7',
                tagId: [
                    2,
                    4
                ],
            },
            {
                id: 16441,
                boardId: 2,
                name: 'Task 8',
                task: 'Do Task 8',
                tagId: [
                    1,
                    3
                ],
            },
        ]
    },
]

export const testTags: ITag[] = [
    {
        id: 1,
        content: 'Bug',
        color: '#f87171',
    },
    {
        id: 2,
        content: 'Enhancement',
        color: '#a78bfa',
    },
    {
        id: 3,
        content: 'Need review',
        color: '#facc15',
    },
    {
        id: 4,
        content: 'Design',
        color: '#4ade80',
    },
]