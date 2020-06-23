
/**
 * todo
 * - Reset
 * - win state
 * - lose state
 */

import React, { Component } from "react";
import Row from "./Row";

export default class Board extends Component {
  constructor() {
    super();
    this.state = {
      activePeg: {row: null, square: null},
      rows: this.defaultRowsState()
    };
  }

  defaultRowsState() {
    let rows = [];
    let perRow = 1;
    for (let i = 0; i < 5; ++i) {
      let row = {squares: []}
      for (let r = 0; r < perRow; ++r) {
        row.squares.push({
          isActive: false,
          hasPeg: Boolean(i + r)
        });
      }
      rows.push(row)
      ++perRow;
    }
    return rows;
  }

  reset() {
    
    this.setState({
      rows: this.defaultRowsState(),
      activePeg: {row: null, square: null}
    })
    console.log('reset')
  }

  onClick (clickedRowIndex, clickedSquareIndex) {

    let moved = this.performMove(clickedRowIndex, clickedSquareIndex)

    if(!moved) this.activateSelectedPeg(clickedRowIndex, clickedSquareIndex)
    
    this.setState({ state: this.state });
  }

  performMove(clickedRowIndex, clickedSquareIndex){
    let square = this.state.rows[clickedRowIndex].squares[clickedSquareIndex]
    if(
      !square.hasPeg &&
      (
        (
          (
            clickedRowIndex - 2 === this.state.activePeg.row || 
            clickedRowIndex + 2 === this.state.activePeg.row
          ) &&
          clickedSquareIndex === this.state.activePeg.square
        ) || 
        (
          clickedRowIndex === this.state.activePeg.row &&
          (
            clickedSquareIndex - 2 === this.state.activePeg.square ||
            clickedSquareIndex + 2 === this.state.activePeg.square
          )
        ) ||
        (
          (
            clickedRowIndex - 2 === this.state.activePeg.row || 
            clickedRowIndex + 2 === this.state.activePeg.row
          ) &&
          (
            clickedSquareIndex - 2 === this.state.activePeg.square ||
            clickedSquareIndex + 2 === this.state.activePeg.square
          )
        )
      )
    ){

      let rowBetween = this.findRowBetween(this.state.activePeg.row, this.state.activePeg.square, clickedRowIndex, clickedSquareIndex)

      if(rowBetween.hasPeg){
        this.state.rows[this.state.activePeg.row].squares[this.state.activePeg.square].hasPeg = false
        this.state.rows[clickedRowIndex].squares[clickedSquareIndex].hasPeg = true
        rowBetween.hasPeg = false
        return true
      }

    }
    return false
  }

  activateSelectedPeg(clickedRowIndex, clickedSquareIndex){
    let rows = this.state.rows
    for(let r in rows){
      let row = rows[r]
      for(let s in row.squares){
        let square = row.squares[s]
          square.isActive = false
      }
    }
    rows[clickedRowIndex].squares[clickedSquareIndex].isActive = true
    this.setState({ activePeg: {row: clickedRowIndex, square: clickedSquareIndex} });
  }

  findRowBetween(r1, s1, r2, s2) {
    let row = Math.min(r1, r2)
    if(r1 !== r2) row += 1
    let square = Math.min(s1, s2)
    if(s1 !== s2) square += 1

    return this.state.rows[row].squares[square]
  }

  render() {
    return (
      <div className={"board"}>
        <button onClick={() => this.reset()}>Reset</button>
        {this.state.rows.map((value, index) => {
          return <Row key={index} data={value} onClick={(squareIndex) => this.onClick(index, squareIndex)} />;
        })}
      </div>
    );
  }
}
