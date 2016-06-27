import React from 'react';

import './nav_header.css';

var NavHeader = React.createClass({
  render: function() {
    return(
      <div className="nav-header">
        <div className="nav-btn" onClick={this.props.transform}></div>
      </div>
    );
  }
});


export default NavHeader;