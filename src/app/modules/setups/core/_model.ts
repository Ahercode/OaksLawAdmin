import * as Yup from "yup";

export interface CommonComponentModel {
    code: string;
    name: string;
    location?: string
}

export type Field = {
    name: string;
    label: string;
    type: string;
    options?: any[];
    validation?:  Yup.StringSchema<string, Yup.AnyObject, undefined, "">;
};


export type CommonComponentProps = {
    url: string;
    title: string;
    refreshKey: string;
    columns: any[];
    fields: Field[];
};

export type FormValues = {
    [key: string]: string;
};

export type MonthModel = {
    id: number;
    name: string;
    caseYearId: number;
    yearName: string;
    yearMonth: string;
    status: string;
};

export type JudgementModel = {
    id: number;
    caseTitle: string;
    catchPhrase: string;
    suitNumber: string;
    headNote: string;
    yearOfJudgement: string;
    caseContent: string;
    courtId: number;
    courtName: string;
    caseMonthId: number;
    monthName: string;
    status: null | string;
};

export type CourtModel = {
    id: number;
    name: string;
    location: string;
    status: string;
};

export type YearModel = {
    id: number;
    name: string;
    status: null | string;
};