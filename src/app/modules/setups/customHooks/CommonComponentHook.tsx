import {useState} from "react";
import {useMutation, useQueryClient} from "react-query";
import {deleteItem, postItem} from "../../../services/ApiCalls.ts";
import {message} from "antd";
import {CommonComponentModel, FormValues} from "../core/_model.ts";
import {useFormik} from "formik";
import * as Yup from "yup";


type CommonComponentHookProps = {
    url: string;
    title: string;
    fields: any[];
    refreshKey: string;
}
export const useCommonComponentHook = ({ url, refreshKey, fields, title}:CommonComponentHookProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const queryClient = useQueryClient()
    const [loading, setLoading] = useState(false);

    const {mutate: deleteDa} = useMutation(deleteItem, {
        onSuccess: () => {
            queryClient.invalidateQueries(refreshKey)
            message.success('Item deleted successfully')
        },
        onError: (error) => {
            message.error('Error deleting item: ')
        }
    })

    const handleDelete = (element: CommonComponentModel) => {
        const item = {
            url: url,
            data: element
        }
        deleteDa(item)
    }

    const showModal = () => {
        setIsModalOpen(true);
    }

    const handleOk = () => {
        setIsModalOpen(false);
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        formik.resetForm();
    }



    const {mutate: postDa} = useMutation(postItem, {
        onSuccess: () => {
            queryClient.invalidateQueries(refreshKey)
            message.success(`${title} created successfully`)
            setLoading(false)
            handleCancel()
        },
        onError: (error) => {
            message.error('Error creating item: ')
            setLoading(false)
        }
    })

    const formik = useFormik<FormValues>({
        initialValues: fields.reduce((acc, field) => ({...acc, [field.name]: ''}), {}),
        validationSchema: Yup.object().shape(fields.reduce((acc, field) =>
            ({...acc, [field.name]: field.validation}), {}
        )),
        onSubmit: async (values, { setSubmitting}) => {
            const data = {
                url: url,
                data: values
            }

            console.log('data to post', data)
            postDa(data)
        },
    })

    return {
        isModalOpen,
        setIsModalOpen,
        loading,
        setLoading,
        handleDelete,
        showModal,
        handleOk,
        handleCancel,
        formik
    };
};