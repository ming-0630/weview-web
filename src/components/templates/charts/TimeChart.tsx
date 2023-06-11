import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ActionIcon, Tabs } from '@mantine/core';
import { Line } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, Legend, LineElement, LinearScale, PointElement, TimeScale, Title, Tooltip, TimeSeriesScale, Filler } from 'chart.js';
import dayjs from 'dayjs';

export interface TimeChartProps {
    data?: { x: any, y: any }[],
    activeTab?: string | null,
    setActiveTab?: Dispatch<SetStateAction<string | null>>,
}

const TimeChart = (props: TimeChartProps) => {
    const [activeTab, setActiveTab] = useState<string | null>('1M');
    const [activeTitle, setActiveTitle] = useState<string>('');

    Chart.register(CategoryScale,
        LinearScale,
        BarElement,
        LineElement,
        PointElement,
        TimeScale,
        Filler,
        TimeSeriesScale,
        Title,
        Tooltip,
        Legend);

    useEffect(() => {
        switch (props.activeTab) {
            case '1M': {
                setActiveTitle('Rating change for the past 30 days')
                break;
            }
            case '1Y': {
                setActiveTitle('Rating change for the past 365 days')
                break;
            }
            case 'MAX': {
                setActiveTitle('Overall Rating Change')
                break;
            }
        }
    }, [props.activeTab])

    return (
        <Tabs value={props.activeTab ?? activeTab} onTabChange={props.setActiveTab ?? setActiveTab} variant="pills" radius="xl">
            <div className='flex items-center justify-between'>
                <div className='font-semibold text-gray-600 text-lg'>{activeTitle}</div>
                <Tabs.List position='center'>
                    <Tabs.Tab value="1M">1M</Tabs.Tab>
                    <Tabs.Tab value="1Y">1Y</Tabs.Tab>
                    <Tabs.Tab value="MAX">MAX</Tabs.Tab>
                </Tabs.List>
            </div>


            <Tabs.Panel value="1M" className='p-3'>
                <Line
                    options={{
                        responsive: true,
                        scales: {
                            y: {
                                min: 0,
                                max: 5,
                            },
                            x: {
                                type: 'time',
                                time: {
                                    unit: 'day',
                                    round: 'day'

                                },
                                ticks: {
                                    autoSkip: false,
                                    maxTicksLimit: 10
                                }
                            },
                        }
                    }
                    }
                    datasetIdKey='id-1M'
                    data={{
                        labels: props?.data?.map(row => row.x),
                        datasets: [{
                            label: 'Average Rating',
                            data: props.data,
                            fill: true,
                            backgroundColor: 'RGBA(255, 195, 190, 0.4)',
                            borderColor: '#F88379',
                            tension: 0.1
                        }]
                    }}
                ></Line>
            </Tabs.Panel>

            <Tabs.Panel value="1Y" className='p-3'>
                <Line
                    options={{
                        responsive: true,
                        scales: {
                            y: {
                                min: 0,
                                max: 5,
                            },
                            x: {
                                type: 'time',
                                time: {
                                    unit: 'day',
                                    round: 'day'

                                },
                                ticks: {
                                    autoSkip: false,
                                    maxTicksLimit: 10
                                }
                            },
                        }
                    }
                    }
                    datasetIdKey='id-1Y'
                    data={{
                        labels: props?.data?.map(row => row.x),
                        datasets: [{
                            label: 'Average Rating',
                            data: props.data,
                            fill: true,
                            backgroundColor: 'RGBA(255, 195, 190, 0.4)',
                            borderColor: '#F88379',
                            tension: 0.1,
                            pointRadius: 0
                        }]
                    }}
                ></Line>
            </Tabs.Panel>
            <Tabs.Panel value="MAX" className='p-3'><Line
                options={{
                    responsive: true,
                    scales: {
                        y: {
                            min: 0,
                            max: 5,
                        },
                        x: {
                            type: 'time',
                            time: {
                                unit: 'day',
                                round: 'day'

                            },
                            ticks: {
                                autoSkip: false,
                                maxTicksLimit: 10
                            }
                        },
                    }
                }
                }
                datasetIdKey='id-Max'
                data={{
                    labels: props?.data?.map(row => row.x),
                    datasets: [{
                        label: 'Average Rating',
                        data: props.data,
                        fill: true,
                        backgroundColor: 'RGBA(255, 195, 190, 0.4)',
                        borderColor: '#F88379',
                        tension: 0.1,
                        pointRadius: 0
                    }]
                }}
            ></Line></Tabs.Panel>
        </Tabs >
    );
}

export default TimeChart;