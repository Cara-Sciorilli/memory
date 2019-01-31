import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import $ from 'jquery'

export default function game_init(root) {
  ReactDOM.render(<Starter />, root);
}

class Starter extends React.Component {
  constructor(props) {
    super(props);
    this.timer = null;
    const shuffle = require('fisher-yates-shuffle');
    this.listOfSquares =
      [
        {value: "A", completed: false},
        {value: "G", completed: false},
        {value: "C", completed: false},
        {value: "D", completed: false},
        {value: "C", completed: false},
        {value: "F", completed: false},
        {value: "G", completed: false},
        {value: "H", completed: false},
        {value: "E", completed: false},
        {value: "B", completed: false},
        {value: "A", completed: false},
        {value: "D", completed: false},
        {value: "E", completed: false},
        {value: "F", completed: false},
        {value: "B", completed: false},
        {value: "H", completed: false}
      ];
    const shuffleDeck = shuffle(this.listOfSquares);
    this.state = {
      squares: shuffleDeck,
      clicks: 0,
      lastIndex: -1,
    };
  }

  reset_game() {
    this.timer = null;
    const shuffle = require('fisher-yates-shuffle');
    const shuffleDeck = shuffle(this.listOfSquares);

    this.setState({
      squares: shuffleDeck,
      clicks: 0,
      lastIndex: -1,
    });
  }

  check_match(ii) {
    let xs = this.state.squares;
    let last = this.state.lastIndex;
    if(xs[ii].value != xs[last].value) {
      let ys = _.map(this.state.squares, (square, jj) => {
        if (ii == jj || last == jj) {
          return _.assign({}, square, {completed: false});
        }
        else {
          return square;
        }
      });
      this.setState(_.assign({}, this.state, {squares: ys}, {lastIndex: -1}));
    }
    else {
      this.setState(_.assign({}, this.state, {squares: xs}, {lastIndex: -1}));
    }
    this.timer = null;
  }

  handle_click(ii) {
    if(this.timer == null) {
      let xs = _.map(this.state.squares, (square, jj) => {
        if (ii == jj) {
          return _.assign({}, square, {completed: true});
        }
        else {
          return square;
        }
      });

      if (this.state.lastIndex == -1) {
        this.setState(_.assign({}, this.state, {squares: xs}, {clicks: this.state.clicks + 1}, {lastIndex: ii}));
      }
      else {
        this.setState(_.assign({}, this.state, {squares: xs}, {clicks: this.state.clicks + 1}));

        this.timer = setTimeout((function() { this.check_match(ii) }).bind(this), 1000);
      }
    }
  }

  render () {
    let row1 = _.map(this.state.squares, (square, ii) => {
      if(ii < 4) {
        return <MemSquare square={square} root={this} key={ii} ii={ii} />
      }
    });
    let row2 = _.map(this.state.squares, (square, ii) => {
      if(ii >= 4 && ii < 8) {
        return <MemSquare square={square} root={this} key={ii} ii={ii}  />
      }
    });
    let row3 = _.map(this.state.squares, (square, ii) => {
      if(ii >= 8 && ii < 12) {
        return <MemSquare square={square} root={this} key={ii} ii={ii} />
      }
    });
    let row4 = _.map(this.state.squares, (square, ii) => {
      if(ii >= 12) {
        return <MemSquare square={square} root={this} key={ii} ii={ii} />
      }
    });
    let resetButton = <ResetButton root={this}/>

    return (
      <div className="container">
        <div className="row">
          {row1}
        </div>
        <div className="row">
          {row2}
        </div>
        <div className="row">
          {row3}
        </div>
        <div className="row">
          {row4}
        </div>
        <div className="row">
          {resetButton}
        </div>
        <div className="row">
          <p> Clicks: {this.state.clicks}</p>
        </div>
      </div>
    );

  }
}

function MemSquare(props) {
  let {square, root, ii} = props


  if (square.completed) {
    return   <div className="column">
                <p><button>{square.value}</button></p>
              </div>
  }
  else {
    return   <div className="column">
                <p><button onClick={() => root.handle_click(ii)}></button></p>
              </div>
  }
}
function ResetButton(props) {
  let root = props.root

    return <p><button onClick={() => root.reset_game()}>Reset Game</button></p>
}
