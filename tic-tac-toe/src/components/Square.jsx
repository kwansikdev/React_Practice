import React, { Component } from "react";

export default class Square extends Component {
  render() {
    return (
      <button
        className="square"
        onClick={this.props.handleClick}
        disabled={this.props.squares[this.props.value]}
      >
        {this.props.squares[this.props.value]}
      </button>
    );
  }
}
