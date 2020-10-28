import React from "react";

export default class Square extends React.Component {
  constructor(data) {
    super(data);
    this.state = data.data;
  }
  render() {
    return (
      <button
        className={
          "square" +
          (this.state.isActive ? " active" : "") +
          (this.state.hasPeg ? " hasPeg" : "")
        }
        onClick={() => this.onClick()}
      />
    );
  }

  onClick() {
    // this.setState({isActive: true})
    this.props.onClick(this);
  }
}
