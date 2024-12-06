import CommonComponent from "../components/CommonComponent.tsx";
import * as Yup from "yup"
export const Court = () => {
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
            name: 'location',
            label: 'Location',
            type: 'text',
        }
    ]

    return (
        <CommonComponent
            url='Courts'
            title='Court'
            refreshKey='courts'
            columns={columns}
            fields={fields}
        />

    );
};