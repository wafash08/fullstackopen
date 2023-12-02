import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + neutral + bad;
  const averageFeedback = (good - bad) / total;
  const positiveFeedback = (good / total) * 100;
  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <div>
          <button onClick={() => setGood(good + 1)}>good</button>
          <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
          <button onClick={() => setBad(bad + 1)}>bad</button>
        </div>
      </div>
      <div>
        <h2>statistics</h2>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {total}</p>
        <p>average {isNaN(averageFeedback) ? 0 : averageFeedback}</p>
        <p>positive {isNaN(positiveFeedback) ? 0 : positiveFeedback}%</p>
      </div>
    </div>
  );
};

export default App;
