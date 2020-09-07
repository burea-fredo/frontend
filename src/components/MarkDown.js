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

    updateNote = async (note) => {
        if (this.state.value) {
            note.content = this.state.value;
            await axios.put("http://localhost:4000/api/" + note._id, note);
        }
    }


    componentDidUpdate = (prevProps) => {
        if (prevProps.selectedNote !== this.props.selectedNote) {
            if (prevProps.selectedNote) {
                this.updateNote(prevProps.selectedNote);
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
