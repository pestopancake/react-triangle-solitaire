import React, { Component } from 'react';
import { render } from 'react-dom';
import Square from './Square';
import Row from './Row';
import Board from './Board';
import './style.css';
import NoSleep from 'nosleep.js';

var noSleep = new NoSleep();

function enableNoSleep() {
  noSleep.enable();
  document.removeEventListener('touchstart', enableNoSleep, false);
}
document.addEventListener('touchstart', enableNoSleep, false);

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React triangle solitaire',
    };
  }

  render() {
    return (
      <div className="board-wrapper">
        <Board />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
