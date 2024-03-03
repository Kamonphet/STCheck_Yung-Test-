import React, { Component, useEffect, useState } from "react";

// import WheelComponent from "../component/wheel";
import WheelComponent from 'react-wheel-of-prizes'
import "../stylewheel.css";

import TrPortal from "../component/portal";
import Confetti from "react-confetti";

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      portal: false,
      show: false,
    };
  }
 
  render() {
    let objIndex = {
      "001": 1, 
      "023": 2, 
      "033": 3, 
      "052": 4, 
      "053": 5,
      "054": 6,
      "056": 7,
      "075": 8,
      "093": 9,
      "217":10,
      "219":11,
      "220":12,
      "221":13,
      "222":14,
      "223":15,
    }
    const segments = [
      "001", 
      "023", 
      "033", 
      "052", 
      "053",
      "054",
      "056",
      "075",
      "093",
      "217",
      "219",
      "220",
      "221",
      "222",
      "223",
    ];

    const weelColors = () => {
      let arr = [];
      let colors = ["#EE4040", "#F0CF50", "#815CD1", "#3DA5E0", "#34A24F"];
      segments.forEach((el) => {
        let color = colors.shift();
        arr.push(color);
        colors.push(color);
      });

      return arr;
    };
    const segColors = weelColors();

    const rand = () => {
      return setTimeout(() => {
        return segments[Math.floor(Math.random() * 1000)];
      }, 5000);
    };

    const onFinished = (winner) => {
      this.setState({ portal: false, show: winner });
    };

    return (
      <div
        // id="pankaj"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {this.state.show && <Confetti width={1600} height={1019} />}
        <WheelComponent
          segments={segments}
          segColors={segColors}
          winningSegment={'8'}
          onFinished={(winner) => onFinished(winner)}
          primaryColor="gray"
          contrastColor="white"
          buttonText="Spin"
          isOnlyOnce={false}
          upDuration={rand()}
          downDuration={200}
        />
        {this.state.portal ? <TrPortal /> : null}
        {this.state.show && (
          // modal
          <div className="box">
            <h2 className="titleWin">
              ยินดีด้วย!!! คนต่อไปคือ {this.state.show} !!!
            </h2>
            <div className="closeContainer">
              <button
                className="closepankaj"
                onClick={() => this.setState({ show: false })}
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
