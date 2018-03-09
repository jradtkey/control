import React, { PureComponent } from 'react';
import '../style/Number.css';


class Number extends PureComponent {

  render() {

    return (
      <div className="number">
        {this.props.number}
      </div>
    )
  }
}

export default Number;
