import { useContext, useState } from "react";
import { LoginContext } from "../../Context/LoginContext";
import "./CandidateCard.css";
import { ThemeContext } from "../../Context/ThemeContext";
export default function CandidateCard({
    candidateImg,
    candidateName,
    candidateVotes,
    userVoted,
    setUserVoted,
    setCandidates,
    candidates,
}) {
    const { darkTheme } = useContext(ThemeContext);
    const [voteClicked, setVoteClicked] = useState(false);
    const { loggedUser, setLoggedUser } = useContext(LoginContext);

    function handleVote() {
        // updated candidate votes
        const updatedCandidates = candidates.map((cand) => {
            if (cand.name === candidateName) {
                cand.votes += 1;
                return cand;
            }
            return cand;
        });

        setCandidates([...updatedCandidates]);
        // update logged user votes
        setLoggedUser({
            ...loggedUser,
            vote: { voted: true, votedTo: candidateName },
        });
        setUserVoted(true);
    }

    function handleChangeVote() {
        const updatedCandidates = candidates.map((cand) => {
            if (cand.name === candidateName) {
                cand.votes -= 1;
                return cand;
            }
            return cand;
        });

        setCandidates([...updatedCandidates]);
        setLoggedUser({
            ...loggedUser,
            vote: { voted: false, votedTo: "" },
        });
        setUserVoted(false);
        setVoteClicked(false);
    }

    function displayVoteOption() {
        if (!userVoted) {
            return (
                <div className={`voting-container `}>
                    {!voteClicked ? <p></p> : <p>Are You Sure?</p>}
                    {!voteClicked ? (
                        <div className={`voting-btn-container`}>
                            <button
                                className="vote-btn"
                                onClick={() => setVoteClicked(true)}
                            >
                                Vote
                            </button>
                        </div>
                    ) : (
                        <div className={`voting-btn-container`}>
                            <button className="vote-btn" onClick={handleVote}>
                                Yes
                            </button>{" "}
                            <button
                                className="vote-btn-no"
                                onClick={() => setVoteClicked(false)}
                            >
                                No
                            </button>
                        </div>
                    )}
                </div>
            );
        } else {
            if (loggedUser.vote.votedTo === candidateName) {
                return (
                    <div className={`voting-container`}>
                        <button
                            className={darkTheme ? "dark" : ""}
                            onClick={handleChangeVote}
                        >
                            Change My Vote
                        </button>
                    </div>
                );
            } else return;
        }
    }

    return (
        <div className={`CandidateCard ${darkTheme ? "dark" : ""}`}>
            <p id="candidate-votes" className={darkTheme ? "dark" : ""}>
                {candidateVotes}
            </p>
            <img src={candidateImg} alt="candidate image" />
            <h3>{candidateName}</h3>
            {displayVoteOption()}
        </div>
    );
}
