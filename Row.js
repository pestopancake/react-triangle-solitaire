import React from "react";
import Square from "./Square";

export default class Row extends React.Component {
  constructor(data) {
    super(data);
    this.state = data.data;
  }
  render() {
    return (
      <div className={"row"}>
        {this.state.squares.map((value, index) => {
          return (
            <Square
              key={index}
              data={value}
              key={index}
              onClick={square => this.props.onClick(index)}
            />
          );
        })}
      </div>
    );
  }
}
