import React, { Component } from 'react'
import axios from 'axios'

import NoteList from "./NoteList";
import MarkDown from "./MarkDown";


export default class Home extends Component {

    state = {
        notes: [],
        selectedNote: null
    }

    async componentDidMount() {
        this.getNotes()
    }

    getNotes = async () => {
        const res = await axios.get("http://localhost:4000/api");
        this.setState({ notes: res.data });
    }

    selectNote = (note) => {
        this.setState({ selectedNote: note })
    }

    newNote = (note) => {
        this.getNotes()
        this.setState({ selectedNote: note })
    }

    deleteNote = async (note) => {
        await axios.delete("http://localhost:4000/api/" + note._id)
        this.setState({ selectedNote: null })
        this.getNotes()
    }

    render() {
        return (
            <div className="Home">
                <NoteList notes={this.state.notes}
                    selectNote={this.selectNote}
                    getNotes={this.getNotes}
                    deleteNote={this.deleteNote} />
                <MarkDown selectedNote={this.state.selectedNote}
                    getNotes={this.getNotes} />
            </div>
        )
    }
}
