import CommonComponent from "../components/CommonComponent.tsx";
import * as Yup from "yup"
export const CaseYear = () => {
    const columns = [
        {
            title: "No. #",
            dataIndex: "id",
        },
        {
            title: "Name",
            dataIndex: "name",
        }

    ]

    const fields = [
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            validation: Yup.string().required('Name is required'),
        },
    ]

    return (
        <>
           <CommonComponent
               url="CaseYears"
               title="Case Years"
               refreshKey="caseYears"
               columns={columns}
               fields={fields} />

        </>
    );
}