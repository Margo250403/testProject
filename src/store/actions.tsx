import { http } from '../api/axios';
import { TO_DO } from '../api/constants';
import { issueURL } from '../api/url';
import { IIssues } from '../interfaces/issuses.interface';
import { GET_PATH_NAME, LOAD_ISSUE } from './types';

export const getPathName = (pathName: string) => {
    return function (dispatch: any) {
        dispatch({type: GET_PATH_NAME, payload: pathName});
    };
};

export const loadIssue = (pathName: string) => {
    return function (dispatch: any) {
        if(localStorage.getItem(pathName) !== null){
            dispatch({type: LOAD_ISSUE, payload: JSON.parse(localStorage.getItem(pathName) || '[]')});
        }else{
            http.get(pathName + issueURL)
            .then(({data}) => {
                const updatedIssues = data.map((item: IIssues)=>{
                    return {
                        id: item.id,
                        title: item.title,
                        number: item.number,
                        created_at: item.created_at,
                        user: item.user.type,
                        comments: item.comments,
                        status: TO_DO
                    };
                })
                localStorage.setItem(pathName, JSON.stringify(updatedIssues));
                dispatch({type: LOAD_ISSUE, payload: updatedIssues});
            })
            .catch(()=>{
                localStorage.setItem(pathName, JSON.stringify([]));
                dispatch({type: LOAD_ISSUE, payload: []});
            })
            
        }
    };
};