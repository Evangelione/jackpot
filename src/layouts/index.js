import React, { Component } from 'react';

class Index extends Component {
  state={
    mask: false
  }
  componentDidMount(){
    if (!this.props.location.query.activityId) {
      this.setState({
        mask: true
      })
      return false;
    }
  }
  render() {
    return (
      <div>
        <div style={this.state.mask ? {position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.6)', zIndex:99999}: {}}/>
        {this.props.children}
      </div>
    );
  }
}

export default Index;
