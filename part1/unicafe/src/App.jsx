/* eslint-disable react/prop-types */
import { useState } from "react";

function Button({ label, onGivingFeedback }) {
  return <button onClick={onGivingFeedback}>{label}</button>;
}

function StatisticLine({ text, value }) {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
}

function Statistics({
  good,
  neutral,
  bad,
  total,
  averageFeedback,
  positiveFeedback,
}) {
  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={total} />
        <StatisticLine text='average' value={averageFeedback} />
        <StatisticLine text='positive' value={positiveFeedback} />
      </tbody>
    </table>
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
          <Button label='good' onGivingFeedback={() => setGood(good + 1)} />
          <Button
            label='neutral'
            onGivingFeedback={() => setNeutral(neutral + 1)}
          />
          <Button label='bad' onGivingFeedback={() => setBad(bad + 1)} />
        </div>
      </div>
      <h2>statistics</h2>
      {total <= 0 ? (
        <p>No feedback given</p>
      ) : (
        <Statistics
          averageFeedback={averageFeedback}
          bad={bad}
          good={good}
          neutral={neutral}
          positiveFeedback={positiveFeedback}
          total={total}
        />
      )}
    </div>
  );
};

export default App;
