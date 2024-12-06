import DashBoardChart from "../../../pages/dashboard/DashBoardChart.tsx";
import {useFetchData} from "../../../services/DataSource.ts";


const DashBoardComponent = () => {
    const {
        allStaffs,
        allAttendance
    } = useFetchData()

    const totalAttendance = allAttendance?.data

    const attendanceByMonth = new Array(12).fill(0);

    totalAttendance?.forEach((item: any) => {
        if (item.date) {
            const month = new Date(item.date).getMonth();
            attendanceByMonth[month]++;
        }
    });

    console.log('attendanceByMonth: ', attendanceByMonth);
    const staffs = allStaffs?.data?.length

    return (
        <>
            <div className="col-4">
                <DashBoardChart
                    className='h-md-50 mb-5 mb-xl-10'
                    chartColor='success'
                    chartHeight='400px'
                    series={[
                        staffs
                    ]}
                    chartType='donut'
                    legends={[
                        "All Staffs",
                    ]}
                    title='Staff Count'
                    filename='Total Staffs'
                    colors={[

                        "#3F4FB5",
                        "#FFA800",
                        "#FF5C7C",
                        "#A255FF",
                        "#00CF92",
                        "#FF4081",
                        "#FFC260",
                        "#3F4FB5",
                    ]}
                />
            </div>
            <div className="col-4">
                <DashBoardChart
                    className='h-md-50 mb-5 mb-xl-10'
                    chartColor='success'
                    chartHeight='420px'
                    chartType='donut'
                    series={attendanceByMonth}
                    legends={[
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December"
                    ]}
                    title='Attendance By Month'
                    filename='Total Staffs'
                    colors={[

                        "#F64E60",
                        "#FFA800",
                        "#FF5C7C",
                        "#A255FF",
                        "#00CF92",
                        "#FF4081",
                        "#FFC260",
                        "#3F4FB5",
                    ]}
                />
            </div>
        </>
    );
}

export default DashBoardComponent;