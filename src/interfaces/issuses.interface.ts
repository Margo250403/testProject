
export interface IIssues {
    id: number;
    title: string;
    number: number; 
    created_at:Date;
    user: IUser;
    comments: number;
    status: string;
}

export interface IUser {
    id: number;
    type: string;
}
