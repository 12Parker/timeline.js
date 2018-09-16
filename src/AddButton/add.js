import React from 'react';
import Moment from "../Moment/moment.js";

export default class Form extends React.Component {
	constructor(props) {
        super(props);
        this.state = {momentList: []};
        this.onAddBtnClick = this.onAddBtnClick.bind(this);
    }

    onAddBtnClick(event) {
        const momentList = this.state.momentList;
        this.setState({
            momentList: momentList.concat(<Moment key={momentList.length} />)
        });
    }

    render() {
        return (
            <div>
                <button onClick={this.onAddBtnClick}>Add input</button>
                {this.state.momentList}
            </div>
        );
    }
}