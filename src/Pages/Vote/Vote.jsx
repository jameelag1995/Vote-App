import "./Vote.css";
import { CANDIDATES } from "../../data/Data.js";
import CandidateCard from "../../Components/CandidateCard/CandidateCard.jsx";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../Context/LoginContext.jsx";
import { ThemeContext } from "../../Context/ThemeContext.jsx";
export default function Vote() {
    const { loggedUser, usersData } = useContext(LoginContext);
    const [userVoted, setUserVoted] = useState(loggedUser.vote.voted);
    const [candidates, setCandidates] = useState(CANDIDATES);
    const { darkTheme } = useContext(ThemeContext);
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
        setCandidates([...resetedCandidates]);
    }, []);

    return (
        <div className={`Vote page ${darkTheme ? "dark" : ""}`}>
            <div className={`title-container ${darkTheme ? 'dark' : ''}`}>
                <h1 className={darkTheme ? 'dark' : ''}>Who Deserves Your Vote?</h1>
            </div>
            <div className="candidates-container">
                {candidates.map((candidate, index) => {
                    return (
                        <CandidateCard
                            candidates={candidates}
                            setCandidates={setCandidates}
                            setUserVoted={setUserVoted}
                            userVoted={userVoted}
                            key={index}
                            candidateName={candidate.name}
                            candidateImg={candidate.img}
                            candidateVotes={candidate.votes}
                        />
                    );
                })}
            </div>
        </div>
    );
}
