/* eslint-disable react/prop-types */
import { useState } from "react";

function Statistics({
  good,
  neutral,
  bad,
  total,
  averageFeedback,
  positiveFeedback,
}) {
  return (
    <div>
      <h2>statistics</h2>
      {total <= 0 ? (
        <p>No feedback given</p>
      ) : (
        <ul>
          <li>
            <p>good {good}</p>
          </li>
          <li>
            <p>neutral {neutral}</p>
          </li>
          <li>
            <p>bad {bad}</p>
          </li>
          <li>
            <p>all {total}</p>
          </li>
          <li>
            <p>average {averageFeedback}</p>
          </li>
          <li>
            <p>positive {positiveFeedback}%</p>
          </li>
        </ul>
      )}
    </div>
  );
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive = (good / total) * 100;

  const averageFeedback = isNaN(average) ? 0 : average;
  const positiveFeedback = isNaN(positive) ? 0 : positive;

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
      <Statistics
        averageFeedback={averageFeedback}
        bad={bad}
        good={good}
        neutral={neutral}
        positiveFeedback={positiveFeedback}
        total={total}
      />
    </div>
  );
};

export default App;
