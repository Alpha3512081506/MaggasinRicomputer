import React from 'react';

import { Pie, Doughnut } from 'react-chartjs-2';

const Chart = ({ label, data }) => {
    return (
        <div>
            <Pie
                data={
                    {
                        labels: { label },
                        datasets: [
                            {
                                label: 'Rainfall',
                                backgroundColor: [
                                    '#B21F00',
                                    '#C9DE00',
                                    '#2FDE00',
                                    '#00A6B4',
                                    '#6800B4'
                                ],
                                hoverBackgroundColor: [
                                    '#501800',
                                    '#4B5000',
                                    '#175000',
                                    '#003350',
                                    '#35014F'
                                ],
                                data: { data }
                            }
                        ]
                    }
                }
                options={{
                    title: {
                        display: true,
                        text: 'Average Rainfall per month',
                        fontSize: 20
                    },
                    legend: {
                        display: true,
                        position: 'right'
                    }
                }}
            />
            <Doughnut
                data={
                    {
                        labels: { label },
                        datasets: [
                            {
                                label: 'Rainfall',
                                backgroundColor: [
                                    '#B21F00',
                                    '#C9DE00',
                                    '#2FDE00',
                                    '#00A6B4',
                                    '#6800B4'
                                ],
                                hoverBackgroundColor: [
                                    '#501800',
                                    '#4B5000',
                                    '#175000',
                                    '#003350',
                                    '#35014F'
                                ],
                                data: { data }
                            }
                        ]
                    }
                }
                options={{
                    title: {
                        display: true,
                        text: 'Average Rainfall per month',
                        fontSize: 20
                    },
                    legend: {
                        display: true,
                        position: 'right'
                    }
                }}
            />
        </div>
    );
}



export default Chart