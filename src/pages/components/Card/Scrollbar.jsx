/* eslint-disable react/jsx-no-undef */
import React, { Component } from 'react';

class Scrollbar extends Component {
  constructor(props, context) {
    super(props, context);
    const me = this;
    me.state = {
      scrollLeft: 0,
      scrollTop: 0,
    };
  }
  onScroll = e => {
    const me = this;
    me.setState({
      scrollLeft: e.target.scrollLeft,
      scrollTop: e.target.scrollTop,
    });
  };
  render() {
    const me = this;
    const { scrollLeft, scrollTop } = me.state;
    return (
      <>
        <Scroll
          scrollLeft={scrollLeft}
          scrollTop={scrollTop}
          className="container"
          style={{ width: 500, height: 400 }}
          onScroll={me.onScroll}
        >
          <div className="content" ref="content" style={{ width: 1000, height: 800 }}></div>
        </Scroll>
        <Scroll
          scrollLeft={scrollLeft}
          scrollTop={scrollTop}
          className="container"
          style={{ width: 500, height: 400 }}
          onScroll={me.onScroll}
        >
          <div className="content" ref="content" style={{ width: 1000, height: 800 }}></div>
        </Scroll>
      </>
    );
  }
}

export default Scrollbar;
