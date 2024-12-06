import {useThemeMode} from "../../../_metronic/partials";

/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useRef} from 'react'
import ApexCharts, {ApexOptions} from 'apexcharts'


type Props = {
    className: string
    chartColor: string
    chartHeight: string
    series: number[]
    legends: string[]
    title: string
    filename: string
    colors: string[]
    chartType: "line" | "area" | "bar"
        | "histogram" | "pie" | "donut" | "radialBar"
        | "scatter" | "bubble" | "heatmap" | "candlestick"
        | "boxPlot" | "radar" | "polarArea" | "rangeBar" | "treemap" | undefined
}

const DashBoardChart: React.FC<Props> = ({
       className,
       chartColor,
       chartHeight,
       series,
       legends,
       title,
       filename,
       colors,
       chartType

   }) => {

    const chartRef = useRef<HTMLDivElement | null>(null)
    const {mode} = useThemeMode()

    const refreshChart = () => {
        if (!chartRef.current) {
            return
        }

        const chart = new ApexCharts(chartRef.current,
            chartOptions(chartColor, chartHeight, series, legends, title, filename, colors, chartType
            ))
        if (chart) {
            chart.render()
        }

        return chart
    }

    useEffect(() => {
        const chart = refreshChart()

        return () => {
            if (chart) {
                chart.destroy()
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chartRef, mode, series, legends, title])

    return (

        <div className={`card ${className}`}>
            <div className='card-body p-0 d-flex justify-content-between flex-column overflow-hidden'>
                <div ref={chartRef} className='mixed-widget-10-chart'></div>
            </div>
        </div>
    )
}

const chartOptions = (
    chartColor: string,
    chartHeight: string,
    series: number[],
    legends: string[],
    title: string,
    filename: string,
    colors: string[],
    chartType: "line" | "area" | "bar"
        | "histogram" | "pie" | "donut" | "radialBar"
        | "scatter" | "bubble" | "heatmap" | "candlestick"
        | "boxPlot" | "radar" | "polarArea" | "rangeBar" | "treemap" | undefined
): ApexOptions => {

    return {
        series: series
        ,
        labels: legends,

        chart: {
            fontFamily: 'inherit',
            type: chartType,
            height: chartHeight,
            width: '390',
            sparkline: {
                enabled: true,
            },

            toolbar: {
                show:true,
                export: {
                    csv: {
                        filename: filename,
                        columnDelimiter: ',',
                        headerCategory: 'category',
                        headerValue: 'value',
                        dateFormatter(timestamp: number) {
                            return new Date(timestamp).toDateString()
                        },
                    },
                    svg: {
                        filename: filename,
                    },
                    png: {
                        filename: filename,
                    },
                },

            },
        },
        fill: {
            opacity: 1,
            colors: colors,
        },

        title: {
            text: title,
            align: 'left',
            offsetX: 40,
            style: {
                fontSize: '19px',
                fontFamily: 'inherit',
                fontWeight: '700',

            },
        },
        colors: colors,
        dataLabels: {
            enabled: true,
            style: {
                fontSize: '6px',
            },
        },
        legend: {
            show: true,
            position: 'right',
            fontSize: '12px',
            offsetY: 40,
            markers: {
                width: 10,
                height: 10,
            },
            itemMargin: {
                horizontal: 10,
                vertical: 5,
            },
        },
        stroke: {
            show: true,
            width: 2,
            curve: 'smooth',
        },
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                        total: {
                            showAlways: true,
                            show: true
                        }
                    }
                }
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }],
        tooltip: {
            style: {
                fontSize: '12px',
            },
            y: {
                formatter: function (val) {
                    return  val + ''
                },
            },
        },
    }
}

export default DashBoardChart