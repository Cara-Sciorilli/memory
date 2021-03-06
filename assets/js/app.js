// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import css from "../css/app.css";

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import dependencies
//
import "phoenix_html";
import $ from "jquery";

// Import local files
//
// Local files can be imported directly using relative paths, for example:
import socket from "./socket"
import memory_init from "./memory";

//Now that you are connected, you can join channels with a topic:
let channel = socket.channel("games:"+window.gameName,{});

$(() => {
  let root = document.getElementById('root');
  if(root) {
    memory_init(root, channel);
  }
});
