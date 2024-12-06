import {useState} from "react";
import {message, Modal, Table} from "antd";
import {useFormik} from 'formik';
import * as Yup from 'yup';
import clsx from "clsx";
import {Content} from "../../../../_metronic/layout/components/content";
import {deleteItem, postItem, updateItem} from "../../../services/ApiCalls.ts";
import {useMutation, useQueryClient} from "react-query";

interface AppUserModel {
    id: number;
    firstName: string;
    surname: string;
    otherName: string;
    email: string;
    phone: string;
    companyId: string;
    username: string;
    isAdmin: string;
    status: string;
}

const validationSchema = Yup.object().shape({

    firstName: Yup.string().required('First Name is required'),
    surname: Yup.string().required('Surname is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    username: Yup.string().required('Username is required'),

});


const initialValues = {
    firstName: '',
    id: null,
    surname: '',
    otherName: '',
    email: '',
    phone: '',
    companyId: 'Tarkwa',
    username: '',
    password: '',
    isAdmin: 'no',
    status: 'active',
}

const AppUser = () => {

    const [sageUser, setSageUser] = useState<AppUserModel[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const queryClient = useQueryClient()


    const { mutate: deleteDa } = useMutation(deleteItem, {
        onSuccess: () => {
            queryClient.invalidateQueries('sageUsers')
            message.success('User deleted successfully')
        },
        onError: (error) => {
            message.error('Failed to delete user')
            console.log('delete error: ', error)
        }
    })

    const { mutate: updateDa } = useMutation(updateItem, {
        onSuccess: () => {
            queryClient.invalidateQueries('sageUsers')
            formik.resetForm()
            message.success('User updated successfully')
            setIsModalOpen(false)
        },
        onError: (error) => {
            setIsModalOpen(false)
            message.error('Failed to update user')
        }
    })

    const handleDelete = (element: any) => {
        const item = {
            url: 'SageUsers',
            data: element
        }
        deleteDa(item)
    }

    const handleEdit = (record: any) => {
        formik.setValues(record);
        setIsModalOpen(true);
    }

    const { mutate: postDa } = useMutation(postItem, {
        onSuccess: () => {
            queryClient.invalidateQueries('sageUsers')
            formik.resetForm()
            setIsModalOpen(false)
        },
        onError: (error: any ) => {
            // setIsModalOpen(false)
            if (error.response) {
                console.log('post error: ', error.response.data);
                message.error(error.response.data)
            }else{
                message.error('Failed to create user')
            }
        }
    })

    const columns = [
        {
            title: "First Name",
            dataIndex: "firstName",
            key: "firstName",
        },
        {
            title: "Surname",
            dataIndex: "surname",
            key: "surname",
        },
        {
            title: "DOB",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Gender",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Phone",
            dataIndex: "username",
            key: "username",
        },
        {
            title: "Email",
            dataIndex: "companyId",
            key: "companyId",
        },
        {
            title: "Address",
            dataIndex: "isAdmin",
            key: "isAdmin",
        },
        {
            title: "Action",
            key: "action",
            render: (record: AppUserModel) => (
                <>
                    <button
                        style={{marginLeft: '10px'}}
                        className='btn btn-light-danger btn-sm'
                        onClick={() => {
                            handleDelete(record)
                        }}
                    >
                        Delete
                    </button>
                    <button
                        style={{marginLeft: '10px'}}
                        className='btn btn-light-info btn-sm'
                        onClick={() => {
                            handleEdit(record)
                        }}
                    >
                        Edit
                    </button>
                </>
            )
        }
    ];

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            setLoading(true)

            const item = {
                url: 'AppUsers',
                data: {
                    firstName: values.firstName,
                    surname: values.surname,
                    otherName: values.otherName,
                    email: values.email,
                    phone: values.phone,
                    companyId: values.companyId,
                    username: values.username,
                    password: values.password,
                    isAdmin: values.isAdmin,
                    status: values.status,
                }
            }

            const updateItem = {
                url: 'AppUsers',
                data: formik?.values
            }

            if (values.id) {
                updateDa(updateItem);
            } else {
                // If the user is being created, validate the input
                if (await validationSchema.isValid(values)) {
                    postDa(item);
                } else {
                    console.log('Validation failed');
                }
            }
        },
    })

    const showModal = () => {
        setIsModalOpen(true);
    }

    const handleCancel = () => {
        formik.resetForm()
        setIsModalOpen(false);
    }

    console.log("formik", formik.errors)


    return (
        <>
            <Content>
                <div className={`card mb-5 mb-xxl-8`}>
                    <div className='card-body pt-9 pb-9'>
                        <div className="d-flex justify-content-end align-content-end pb-7">

                        </div>
                        <Table
                            bordered
                            columns={columns}
                            // dataSource={allSageUsers?.data}
                            // loading={loadingSU}
                        />
                    </div>
                </div>
            </Content>

            <Modal
                title="Add Sage User"
                open={isModalOpen}
                onCancel={handleCancel}
                width={650}
                footer={
                    [
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="btn btn-light-danger btn-sm font-weight-bold"
                            style={{marginRight: '10px'}}
                        >
                            Cancel
                        </button>,
                        <button
                            type="submit"
                            form="userForm"
                            onClick={formik.submitForm}
                            className="btn btn-primary btn-sm font-weight-bold"
                        >
                            Submit
                        </button>

                    ]
                }
            >
                <hr/>
                <form
                    onSubmit={formik.submitForm}
                    noValidate
                >
                    <div className="col-12 row mt-10">
                        <div className='col-6  mb-3'>
                            <label className='form-label fs-6 fw-bolder text-gray-600'>First Name</label>
                            <input
                                {...formik.getFieldProps('firstName')}
                                className={clsx(
                                    'form-control form-control-solid',
                                    {'is-invalid': formik.touched.firstName && formik.errors.firstName},
                                    {
                                        'is-valid': formik.touched.firstName && !formik.errors.firstName,
                                    }
                                )}
                                type='text'
                                name='firstName'
                                autoComplete='off'
                            />
                            {formik.touched.firstName && formik.errors.firstName && (
                                <div className='fv-plugins-message-container'>
                                    <span role='alert'>{formik.errors.firstName}</span>
                                </div>
                            )}
                        </div>
                        <div className='col-6  mb-3'>
                            <label className='form-label fs-6 fw-bolder text-gray-600'>Surname</label>
                            <input
                                // placeholder='Surname'
                                {...formik.getFieldProps('surname')}
                                className={clsx(
                                    'form-control form-control-solid',
                                    {'is-invalid': formik.touched.surname && formik.errors.surname},
                                    {
                                        'is-valid': formik.touched.surname && !formik.errors.surname,
                                    }
                                )}
                                type='text'
                                name='surname'
                                autoComplete='off'
                            />
                            {formik.touched.surname && formik.errors.surname && (
                                <div className='fv-plugins-message-container'>
                                    <span role='alert'>{formik.errors.surname}</span>
                                </div>
                            )}
                        </div>
                        <div className='col-6  mb-3'>
                            <label className='form-label fs-6 fw-bolder text-gray-600'>Other Name</label>
                            <input
                                {...formik.getFieldProps('otherName')}
                                className={clsx(
                                    'form-control form-control-solid',
                                    {'is-invalid': formik.touched.otherName && formik.errors.otherName},
                                    {
                                        'is-valid': formik.touched.otherName && !formik.errors.otherName,
                                    }
                                )}
                                type='text'
                                name='otherName'
                                autoComplete='off'
                            />
                            {formik.touched.otherName && formik.errors.otherName && (
                                <div className='fv-plugins-message-container'>
                                    <span role='alert'>{formik.errors.otherName}</span>
                                </div>
                            )}
                        </div>
                        <div className='col-6  mb-3'>
                            <label className='form-label fs-6 fw-bolder text-gray-600'>Email</label>
                            <input
                                // placeholder='Email'
                                {...formik.getFieldProps('email')}
                                className={clsx(
                                    'form-control form-control-solid',
                                    {'is-invalid': formik.touched.email && formik.errors.email},
                                    {
                                        'is-valid': formik.touched.email && !formik.errors.email,
                                    }
                                )}
                                type='email'
                                name='email'
                                autoComplete='off'
                            />
                            {formik.touched.email && formik.errors.email && (
                                <div className='fv-plugins-message-container'>
                                    <span role='alert'>{formik.errors.email}</span>
                                </div>
                            )}
                        </div>
                        <div className='col-6  mb-3'>
                            <label className='form-label fs-6 fw-bolder text-gray-600'>Phone</label>
                            <input
                                // placeholder='Phone'
                                {...formik.getFieldProps('phone')}
                                className={clsx(
                                    'form-control form-control-solid',
                                    {'is-invalid': formik.touched.phone && formik.errors.phone},
                                    {
                                        'is-valid': formik.touched.phone && !formik.errors.phone,
                                    }
                                )}
                                type='tel'
                                name='phone'
                                autoComplete='off'
                            />
                            {formik.touched.phone && formik.errors.phone && (
                                <div className='fv-plugins-message-container'>
                                    <span role='alert'>{formik.errors.phone}</span>
                                </div>
                            )}
                        </div>
                        <div className='col-6  mb-3'>
                            <label className='form-label fs-6 fw-bolder text-gray-600'>Username</label>
                            <input
                                // placeholder='Username'
                                {...formik.getFieldProps('username')}
                                className={clsx(
                                    'form-control form-control-solid',
                                    {'is-invalid': formik.touched.username && formik.errors.username},
                                    {
                                        'is-valid': formik.touched.username && !formik.errors.username,
                                    }
                                )}
                                type='text'
                                name='username'
                                autoComplete='off'
                            />
                            {formik.touched.username && formik.errors.username && (
                                <div className='fv-plugins-message-container'>
                                    <span role='alert'>{formik.errors.username}</span>
                                </div>
                            )}
                        </div>
                        <div className='col-6  mb-3'>
                            <label className='form-label fs-6 fw-bolder text-gray-600'>Password</label>
                            <input
                                // placeholder='Password'
                                {...formik.getFieldProps('password')}
                                className={clsx(
                                    'form-control form-control-solid',
                                    {'is-invalid': formik.touched.password && formik.errors.password},
                                    {
                                        'is-valid': formik.touched.password && !formik.errors.password,
                                    }
                                )}
                                type='password'
                                name='password'
                                autoComplete='off'
                            />
                            {formik.touched.password && formik.errors.password && (
                                <div className='fv-plugins-message-container'>
                                    <span role='alert'>{formik.errors.password}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    )
}
export default AppUser;