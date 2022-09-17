import { IIssues } from "./issuses.interface";

export interface IKanban {
    id: number;
    title: string;
    issues: IIssues[];
    status: string;
}