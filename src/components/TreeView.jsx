import React, { Component } from 'react';
import { Treebeard } from 'react-treebeard';

class TreeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
    };
  }

  onToggle = (node, toggled) => {
    if (this.state.cursor) {
      this.state.cursor.active = false;
    }
    node.active = true;
    if (node.children) {
      node.toggled = toggled;
    }
    this.setState({ cursor: node });
  };

  render() {
    return (
      <div>
        <h1 className='my-3'>Refferal Team</h1>
        <Treebeard data={this.state.data} onToggle={this.onToggle} />
      </div>
    );
  }
}

export default TreeView;
