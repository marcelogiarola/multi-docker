import React from 'react';
import axios from 'axios';

class Fib extends React.Component {
    state = {
        seenIndex: [],
        values: {},
        index: ''
    };

    componentDidMount() {
        this.fetchValues();
        this.fetchIndexes();
    }

    async fetchValues() {
        const values = await axios.get('/api/values/current');
        this.setState({ values: values.data });
    }

    async fetchIndexes() {
        const seenIndex = await axios.get('/api/values/all');
        this.setState({ seenIndex: seenIndex.data });
    }

    renderSeenIndexes() {
        return this.state.seenIndex.map(({ number }) => number).join(', ');
    }

    renderValues() {
        return Object.entries(this.state.values).map(([key, value], index) => (
            <div key={key}>
                {index} - For index {key} I calculated {value}
            </div>
        ))
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        await axios.post('/api/values', {
            index: this.state.index
        });
        this.setState({ index: '' });
        this.fetchValues();
        this.fetchIndexes();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Enter your index:</label>
                    <input value={this.state.index} onChange={e => this.setState({ index: e.target.value })} />
                    <button>Submit</button>
                </form>
                <h3>Indexes I have seen:</h3>
                {this.renderSeenIndexes()}
                <h3>Calculated Values:</h3>
                {this.renderValues()}
            </div>
        )
    }
}

export default Fib;