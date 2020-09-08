import React, { Component } from 'react'
import axios from 'axios';

import { Remarkable } from 'remarkable';

export default class Markdown extends Component {
    constructor(props) {
        super(props);
        this.md = new Remarkable();
        this.handleChange = this.handleChange.bind(this);
        this.state = { value: '' };
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    getRawMarkup() {
        return { __html: this.md.render(this.state.value) };
    }

    updateNote = async (prevNote) => {
        if (this.state.value !== prevNote.content) {
            prevNote.content = this.state.value;
            await axios.put("http://localhost:4000/api/" + prevNote._id,
                { title: prevNote.title, content: this.state.value });
        }
    }


    componentDidUpdate = (prevProps) => {
        var prevNote = prevProps.selectedNote
        if (prevNote !== this.props.selectedNote) {
            if (prevNote) {
                this.updateNote(prevNote);
            }

            if (this.props.selectedNote !== null) {
                this.setState({ value: this.props.selectedNote.content || "" });
            }
        }
    }

    render() {
        return (
            <div className="Markdown">
                <div className="Markdown_Content">
                    <textarea
                        onChange={this.handleChange}
                        value={this.state.value}
                    />
                </div>
                <div
                    className="Markdown_Content"
                    dangerouslySetInnerHTML={this.getRawMarkup()}
                />
            </div>
        );
    }
}
