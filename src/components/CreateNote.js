import React, { Component } from 'react'
import axios from 'axios'

export default class CreateNote extends Component {

    state = { title: '' }

    onChangeTitle = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    onSubmit = async e => {
        e.preventDefault();
        await  axios.post("http://localhost:4000/api", {
            title: this.state.title
        })
        .then(() => {
            this.props.getNotes();
            this.state.title = '';

        }).catch(() => {
            alert("Duplicated key")
        })
    }


    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.title}
                            onChange={this.onChangeTitle}
                        />
                    </div>
                    <button type="submit">
                        Save
                    </button>
                </form>
            </div>
        )
    }
}
