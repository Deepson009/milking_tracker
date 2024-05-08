import React from 'react';

const MilkingHistory = () => {
  const milkingSessions = JSON.parse(localStorage.getItem('milkingSessions')) || [];

  return (
    <div className='milkingHistory'>
      <h2>Milking History</h2>
      <table border={2}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Total Time</th>
            <th>Total Milk (liters)</th>
          </tr>
        </thead>
        <tbody>
          {milkingSessions.map((session, index) => (
            <tr key={index}>
              <td>{session.date}</td>
              <td>{session.startTime}</td>
              <td>{session.endTime}</td>
              <td>{session.totalTime}</td>
              <td>{session.totalMilk}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MilkingHistory;
