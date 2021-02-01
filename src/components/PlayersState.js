import React from "react";

export default function PlayersState({ players, turnIndex }) {
    return (
        <div>
          <table>
            <thead>
              <tr><th>Name</th>{players.map(player => <th>{player.name}</th>)}</tr>
            </thead>
            <tbody>
              <tr><td>Hand Size</td>{players.map(player => <td>{player.handSize}</td>)}</tr>
              <tr><td>On Last Card</td>{players.map(player => <td>{player.isLastCard ? 'Y': 'N'}</td>)}</tr>
              <tr><td>Turn</td>{players.map((d, i) => <td>{i === turnIndex && 'Y'}</td>)}</tr>
            </tbody>
          </table>
        </div>
      )
}