
import * as Yup from "yup"
import CommonComponent from "../components/CommonComponent.tsx";
export const CaseMonth = () => {

    const columns = [
        {
            title: "No. #",
            dataIndex: "id",
        },
        {
            title: "Name",
            dataIndex: "name",
        },
    ]

    const fields = [
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            validation: Yup.string().required('Name is required'),
        },
        {
            name: 'caseYearId',
            label: 'Year',
            type: 'text',
            validation: Yup.string().required('Year is required'),
        }

    ]

    return (
        <>
            <CommonComponent
                url="CaseMonths"
                title="Month"
                refreshKey="caseMonths"
                columns={columns}
                fields={fields}
            />
        </>
    );
};