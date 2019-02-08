import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
//add selected count to state and if it is two call check match
export default function memory_init(root, channel) {
  ReactDOM.render(<Memory channel={channel} />, root);
}

/*Client-Side state for Memory:
{
  displayed: List of displayed squares
  clicks: number of clicks
  selected: number of tiles that are currently guessed
}*/

class Memory extends React.Component {
  constructor(props) {
    super(props);

    this.channel = props.channel;
    this.timer = null;
    this.state = {
      displayed:   [],
      clicks: 0,
      selected: 0,
    };

    this.channel
      .join()
      .receive("ok", this.got_view.bind(this))
      .receive("error", resp => {console.log("Unable to join", resp); })
  }

  got_view(view) {
    console.log("new view", view);
    this.setState(view.game);
    if (this.state.selected == 2) {
      console.log("selected is 2")
      this.timer = window.setTimeout(this.check_match.bind(this), 1000);
    }
  }

  on_click(ii) {
    if (this.timer == null) {
    this.channel.push("guess", {index: ii})
        .receive("ok", this.got_view.bind(this));
    }
  }

  on_reset() {
    this.timer = null;
    this.channel.push("reset", {})
        .receive("ok", this.got_view.bind(this));
  }

  check_match() {
    this.channel.push("check_match", {})
        .receive("ok", this.got_view.bind(this));
    this.timer = null;
  }

  render () {
    let row1 = _.map(this.state.displayed, (value, ii) => {
      if(ii < 4) {
        return <MemSquare value={value} ii={ii}   on_click={this.on_click.bind(this)} key={ii}/>
      }
    });
    let row2 = _.map(this.state.displayed, (value, ii) => {
      if(ii >= 4 && ii < 8) {
        return <MemSquare value={value} ii={ii}   on_click={this.on_click.bind(this)} key={ii}/>
      }
    });
    let row3 = _.map(this.state.displayed, (value, ii) => {
      if(ii >= 8 && ii < 12) {
        return <MemSquare value={value} ii={ii}   on_click={this.on_click.bind(this)} key={ii}/>
      }
    });
    let row4 = _.map(this.state.displayed, (value, ii) => {
      if(ii >= 12) {
        return <MemSquare value={value} ii={ii}   on_click={this.on_click.bind(this)} key={ii}/>
      }
    });
    let resetButton = <ResetButton on_reset={this.on_reset.bind(this)}/>

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
  let {value, ii, on_click} = props
  if (value != "") {
    return   <div className="column">
                <p><button>{value}</button></p>
              </div>
  }
  else {
    return   <div className="column">
                <p><button onClick={() => on_click(ii)}></button></p>
              </div>
  }
}
function ResetButton(props) {
    let {on_reset} = props
    return <p><button onClick={() => on_reset()}>Reset Button</button></p>
}
