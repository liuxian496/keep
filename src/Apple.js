import React, { Component } from 'react';

class Apple extends Component {
    render() {
        return (
            <div {...this.props}>
                {this.props.children}
            </div>
        );
    }
}

export default Apple;
