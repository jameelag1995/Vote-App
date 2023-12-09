import { useContext, useState, useEffect } from "react";
import "./AdminDashboard.css";
import { CANDIDATES } from "../../data/Data.js";
import { LoginContext } from "../../Context/LoginContext";
import BarChart from "../../Components/BarChart/BarChart.jsx";
import { ThemeContext } from "../../Context/ThemeContext.jsx";

export default function AdminDashboard() {
    const { usersData } = useContext(LoginContext);
    const { darkTheme } = useContext(ThemeContext);
    const [candidates, setCandidates] = useState(CANDIDATES);
    const [chartData, setChartData] = useState({});
    useEffect(() => {
        const resetedCandidates = candidates.map((cand) => {
            return { ...cand, votes: 0 };
        });
        usersData.forEach((usr) => {
            let { voted, votedTo } = usr.vote;
            if (voted) {
                resetedCandidates.find(
                    (cand) => cand.name === votedTo && cand.votes++
                );
            }
        });
        setChartData({
            ...chartData,
            labels: resetedCandidates.map((cand) => cand.name),
            values: resetedCandidates.map((cand) => cand.votes),
        });

        setCandidates([...resetedCandidates]);
    }, []);

    return (
        <div className={`AdminDashboard page ${darkTheme ? "dark" : ""}`}>
            <div className={`users-votes-container ${darkTheme ? "dark" : ""}`}>
                <ul>
                    {usersData.map((usr, index) => {
                        return (
                            <li key={index}>
                                <span id="user-name">{usr.name} </span>
                                <span
                                    id="user-voted"
                                    className={
                                        usr.vote.voted ? "voted" : "notvoted"
                                    }
                                >
                                    {usr.vote.voted ? "Voted" : "Didn't Vote"}
                                </span>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <>
                <BarChart
                    data={chartData}
                    candidates={candidates}
                    title="Votes Chart"
                />
            </>
        </div>
    );
}
