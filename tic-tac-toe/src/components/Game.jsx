import React, { Component } from "react";
import Board from "./Board";

export default class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      xisNext: true,
      step: 0
    };

    // Object.getOwnPropertyNames(Game.prototype).forEach(
    //   key => (this[key] = this[key].bind(this)),
    // );
  }

  checkWinner(squares) {
    const check = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < check.length; i++) {
      const [a, b, c] = check[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  handleClick(i) {
    // 클릭하기 전 histroy 상태
    const history = this.state.history.slice(0, this.state.step + 1);

    // 현재 상태
    const current = history[history.length - 1];

    const squares = current.squares.slice();

    console.log("asd", current);

    if (this.checkWinner(squares)) {
      return;
    }

    squares[i] = this.state.xisNext ? "X" : "O";

    this.setState({
      history: history.concat([{ squares }]),
      xisNext: !this.state.xisNext,
      step: this.state.step + 1
    });
  }

  goBack(square, i) {
    this.setState({
      step: i,
      xisNext: i % 2 === 0
    });
  }

  render() {
    const winner = this.checkWinner(
      this.state.history[this.state.history.length - 1].squares
    );

    let status = winner
      ? `Winner: ${winner}`
      : `Next Player: ${this.state.xisNext ? "X" : "O"}`;

    const moveHistory = this.state.history.map((state, i) => {
      const square = state.squares;

      return (
        <li key={i}>
          <button
            onClick={() => this.goBack(square, i)}
          >{`Go back #${i}`}</button>
        </li>
      );
    });
    console.log(this.state);
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={this.state.history[this.state.step].squares}
            handleClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moveHistory}</ol>
        </div>
      </div>
    );
  }
}
