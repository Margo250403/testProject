import { DONE, IN_PROGRESS, TO_DO } from '../api/constants';
import { IAction } from '../interfaces/action.interface';
import { IIssues } from '../interfaces/issuses.interface';
import { IKanban } from '../interfaces/kanban.interface';
import { GET_PATH_NAME, LOAD_ISSUE } from './types';

interface IinitialState {
    pathName: string;
    kanban: IKanban[];
}

const initialState: IinitialState = {
    pathName: '',
    kanban: [
        {
            id: 1,
            title: 'To Do',
            issues: [],
            status: TO_DO
        },
        {
            id: 2,
            title: 'In progress',
            issues: [],
            status: IN_PROGRESS
        },
        {
            id: 3,
            title: 'Done',
            issues: [],
            status: DONE
        },

    ]
};

export const mainReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case GET_PATH_NAME:
            return {...state, pathName: action.payload};
        case LOAD_ISSUE:
            return {...state, kanban: state.kanban.map(column=>{
                return {
                    ...column, 
                    issues: action.payload?.filter((item: IIssues) => {
                        if(item.status === column.status){
                            return item;
                        }
                    })
                }
            })};
        default:
            return state;
    }
};