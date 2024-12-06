import CommonComponent from "../components/CommonComponent.tsx";
import * as Yup from "yup"
export const Quorom = () => {
    const columns = [
        {
            title: "No. #",
            dataIndex: "id",
        },
        {
            title: "Full Name",
            dataIndex: "name",
        }

    ]

    const fields = [
        {
            name: 'name',
            label: 'Full Name',
            type: 'text',
            validation: Yup.string().required('Enter fullName is required'),
        },
    ]

    return (
        <CommonComponent
            url='Quoroms'
            title='Quorom'
            refreshKey='quoroms'
            columns={columns}
            fields={fields}
        />

    );
};