import { useState } from "react";

function getTextFor(something) {
  return something > 1 ? "votes" : "vote";
}

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(new Array(anecdotes.length).fill(0));

  const handleSelectAnecdote = () => {
    const index = Math.floor(Math.random() * anecdotes.length);
    setSelected(index);
  };

  const handleVote = () => {
    const copyVote = [...vote];
    copyVote[selected] += 1;
    setVote(copyVote);
  };

  const textForVote = getTextFor(vote[selected]);

  const indexOfMostVotes = vote.indexOf(Math.max(...vote));
  const textForMostVotes = getTextFor(vote[indexOfMostVotes]);

  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
        <div>
          <p>{anecdotes[selected]}</p>
          <p>
            has {vote[selected]} {textForVote}
          </p>
        </div>
        <button onClick={handleVote}>vote</button>
        <button onClick={handleSelectAnecdote}>next anecdote</button>
      </div>
      <div>
        <h2>Anecdote with most votes</h2>
        <div>
          <p>{anecdotes[indexOfMostVotes]}</p>
          <p>
            has {vote[indexOfMostVotes]} {textForMostVotes}
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
