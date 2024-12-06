import {Input, message, Modal, Space, Table} from "antd";
import {Content} from "../../../../_metronic/layout/components/content";
import clsx from "clsx";
import {CommonComponentProps} from "../core/_model.ts";
import {useCommonComponentHook} from "../customHooks/CommonComponentHook.tsx";
import {cacheTime, fetchData} from "../../../services/ApiCalls.ts";
import {useQuery} from "react-query";
import {Link, useNavigate, useParams} from "react-router-dom";

interface Field {
    name: string;
    label: string;
    type: string;
    options?: any[];
    validation: any;
}

const CommonComponent = ({url, title, refreshKey, columns, fields}:CommonComponentProps) => {

    const param = useParams()
    const navigate = useNavigate();
    const {data: allData, isLoading} = useQuery(refreshKey, () =>fetchData(url), {cacheTime: cacheTime})

    const monthData = allData?.data?.filter((item:any)=>item?.caseYearId?.toString() ===param?.id)
    const {
        isModalOpen,
        formik,
        showModal,
        handleOk,
        handleCancel,
        handleDelete,
        loading
    } = useCommonComponentHook({url, title, fields, refreshKey})


    console.log("param", param?.id)

    const extendedColumns = [...columns, {
        title: 'Action',
        key: 'action',
        align: 'right',
        render: (text: any, record: any) => (
            <Space size="middle">
                {
                    title==="Case Years" &&
                    <Link
                        to={`/setup/case-month/${record.id}`}
                        className="btn btn-light-primary btn-sm"
                    >
                        Months
                    </Link>
                }
                <a className="btn btn-light-danger btn-sm" onClick={() => handleDelete(record)}>Delete</a>
            </Space>
        ),
    }];

    return (
        <>
            <Content>
                <div className={`card mb-5 mb-xxl-8`}>
                    <div className='card-body pt-9 pb-9'>
                        {
                            title==="Month" &&
                            <button
                                onClick={() => navigate(-1)}
                                className="btn btn-light-info btn-sm mb-5"
                            >
                                Go Back
                            </button>
                        }
                        <div className=" d-flex justify-content-between pb-7">
                            <Space>
                                <Input
                                    placeholder='Enter Search Text'
                                    type='text'
                                    allowClear
                                />
                            </Space>
                            <Space>
                                <button
                                    className='btn btn-primary btn-sm'
                                    onClick={showModal}
                                >
                                    Create New
                                </button>
                            </Space>
                        </div>
                        <Table
                            bordered
                            columns={extendedColumns}
                            dataSource={title==="Month"? monthData : allData?.data}
                            loading={isLoading}
                        />
                    </div>
                </div>
            </Content>
            <Modal
                title={`Create ${title}`}
                open={isModalOpen}
                onOk={formik.submitForm}
                onCancel={handleCancel}
                footer={
                    <div className=" mt-10">
                        <button
                            key='submit'
                            onClick={formik.submitForm}
                            className='btn btn-primary btn-sm me-5'
                        >
                            Save
                        </button>

                        <button
                            key='back'
                            onClick={handleCancel}
                            className='btn btn-light-danger btn-sm'
                        >
                            Cancel
                        </button>
                    </div>
                }
            >
                <hr/>
                <form >
                    {fields.map((field) => {
                        let inputField;
                        switch (field.type) {
                            case 'select':
                                inputField = (
                                    <select
                                        {...formik.getFieldProps(field.name)}
                                        className={clsx(
                                            'form-select form-control-solid',
                                            {'is-invalid': formik.touched[field.name] && formik.errors[field.name]},
                                            {
                                                'is-valid': formik.touched[field.name] && !formik.errors[field.name],
                                            }
                                        )}
                                        name={field.name}
                                    >
                                        <option>Select {field?.label}</option>
                                        {field?.options?.map((option: any, index:number) => (
                                            <option key={index} value={option?.id}>
                                                {field.label==='Month'? option?.yearMonth : option?.name}
                                            </option>
                                        ))}
                                    </select>
                                );
                                break;
                            case 'date':
                                inputField = (
                                    <input
                                        {...formik.getFieldProps(field.name)}
                                        className={clsx(
                                            'form-control form-control-solid',
                                            {'is-invalid': formik.touched[field.name] && formik.errors[field.name]},
                                            {
                                                'is-valid': formik.touched[field.name] && !formik.errors[field.name],
                                            }
                                        )}
                                        type='date'
                                        name={field.name}
                                        autoComplete='off'
                                    />
                                );
                                break;
                            case 'textarea':
                                inputField = (
                                    <textarea
                                        {...formik.getFieldProps(field.name)}
                                        className={clsx(
                                            'form-control form-control-solid',
                                            {'is-invalid': formik.touched[field.name] && formik.errors[field.name]},
                                            {
                                                'is-valid': formik.touched[field.name] && !formik.errors[field.name],
                                            }
                                        )}
                                        name={field.name}
                                        autoComplete='off'
                                    />
                                );
                                break;
                            case 'number':
                                inputField = (
                                    <input
                                        {...formik.getFieldProps(field.name)}
                                        className={clsx(
                                            'form-control form-control-solid',
                                            {'is-invalid': formik.touched[field.name] && formik.errors[field.name]},
                                            {
                                                'is-valid': formik.touched[field.name] && !formik.errors[field.name],
                                            }
                                        )}
                                        type='number'
                                        name={field.name}
                                        autoComplete='off'
                                    />
                                );
                                break;
                            default:
                                inputField = (
                                    <input
                                        {...formik.getFieldProps(field.name)}
                                        className={clsx(
                                            'form-control form-control-solid',
                                            {'is-invalid': formik.touched[field.name] && formik.errors[field.name]},
                                            {
                                                'is-valid': formik.touched[field.name] && !formik.errors[field.name],
                                            }
                                        )}
                                        type='text'
                                        name={field.name}
                                        autoComplete='off'
                                    />
                                );
                                break;
                        }
                        return (
                            <div className=' mb-3' key={field.name}>
                                <label className='form-label fs-6 fw-bolder text-gray-600'>{field.label}</label>
                                {inputField}
                                {formik.touched[field.name] && formik.errors[field.name] && (
                                    <div className='fv-plugins-message-container'>
                                        <span role='alert'>{formik.errors[field.name]}</span>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </form>
            </Modal>
        </>
    )
}

export default CommonComponent;