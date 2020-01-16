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
  }

  // 승리조건
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

  // 클릭할 때마다 이벤트
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.step + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

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

  // 과거로 이동
  goBack(square, i) {
    this.setState({
      step: i,
      xisNext: i % 2 === 0
    });
  }

  render() {
    // 승리한 사람 및 턴 표시
    const winner = this.checkWinner(
      this.state.history[this.state.history.length - 1].squares
    );

    let status = winner
      ? `Winner: ${winner}`
      : `Next Player: ${this.state.xisNext ? "X" : "O"}`;

    // 과거로 이동하는 버튼 생성
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
