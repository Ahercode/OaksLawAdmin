
import * as Yup from "yup"
import CommonComponent from "../components/CommonComponent.tsx";
import {useQuery} from "react-query";
import {cacheTime, fetchData} from "../../../services/ApiCalls.ts";
import {JudgementModel} from "../core/_model.ts";
export const Judgement = () => {
    const {data: allCourts} = useQuery('courts', () =>fetchData('Courts'), {cacheTime: cacheTime})
    const {data: allCaseMonths} = useQuery('caseMonths', () =>fetchData('CaseMonths'), {cacheTime: cacheTime})

    const columns = [
        {
            title: 'Title',
            dataIndex: 'caseTitle',
            key: 'caseTitle',
        },
        {
            title: 'Court',
            dataIndex: 'courtName',
            key: 'courtName',
        },
        {
            title: 'Year Of Judgement',
            dataIndex: 'yearOfJudgement',
            key: 'yearOfJudgement',

        },
        {
            title: 'Month',
            dataIndex: 'monthName',
            key: 'monthName',
        },
    ];

    const fields = [
        {
            name: 'caseTitle',
            label: 'Title',
            type: 'text',
            validation: Yup.string().required('Title is required')
        },
        {
            name: 'catchPhrase',
            label: 'Catch Phrase',
            type: 'text',
            validation: Yup.string().required('Catch Phrase is required')
        },
        {
            name: 'suitNumber',
            label: 'Suit No.',
            type: 'text',
            validation: Yup.string().required('Suit No. is required')
        },
        {
            name: 'headNote',
            label: 'Head Note',
            type: 'text',
            validation: Yup.string().required('Head Note is required')
        },
        {
            name: 'caseContent',
            label: 'Judgement',
            type: 'textarea',
            validation: Yup.string().required('Judgement is required')
        },
        {
            name: 'courtId',
            label: 'Count',
            type: 'select',
            options: allCourts?.data,
            validation: Yup.string().required('Month is required')
        },
        {
            name: 'caseMonthId',
            label: 'Month',
            type: 'select',
            options: allCaseMonths?.data,
            validation: Yup.string().required('Month is required')
        },
    ];

    return (
        <>
            <CommonComponent
                url='CourtCases'
                title='Judgement'
                refreshKey='courtCases'
                columns={columns}
                fields={fields}
            />
        </>
    );
};