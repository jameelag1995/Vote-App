import React, { useEffect } from "react";
import Chart from "chart.js/auto";
let myChart;
const BarChart = ({ data, candidates, title }) => {
    let ctx;
    const chartProps = {
        type: "bar",
        data: {
            labels: data.labels,
            datasets: [
                {
                    label: "# of Votes",
                    data: data.values,
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                    ],
                    borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                    ],
                    borderWidth: 1,
                },
            ],
        },
        options: {
            plugins: {
                legend: {
                    labels: {
                        color: "rgba(54, 162, 235, 1)",
                    },
                },
            },
            scales: {
                y: {
                    ticks: {
                        color: "rgba(75, 192, 192, 1)",
                        stepSize: 1,
                        beginAtZero: true,
                    },
                },
                x: {
                    ticks: {
                        color: "rgba(54, 162, 235, 1)",
                        stepSize: 1,
                    },
                },
            },
        },
    };

    useEffect(() => {
        ctx = document.getElementById("myChart");
        if (myChart) {
            myChart.destroy();
            myChart = new Chart(ctx, chartProps);
        } else {
            myChart = new Chart(ctx, chartProps);
        }
    }, [candidates]);

    return (
        <div className="votes-chart">
            <h2>{title}</h2>
            <canvas id="myChart" width="500" height="500"></canvas>
        </div>
    );
};

export default BarChart;
