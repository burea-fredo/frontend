import React, { Component } from 'react'
import moment from 'moment'
import CreateNote from './CreateNote';



export default class NoteList extends Component {
    
    selectNote = (note) => {
        this.props.selectNote(note);   
    }

    deleteNote = (note) => {
        this.props.deleteNote(note);
    }

    render() {
        return (
            <div className="NoteList">
                <h2 className="NoteList_Title">MarkdownEditor</h2>
                <ul className="NoteList_List">
                    {
                        this.props.notes.map((note, index) => 
                            
                            <li key={note._id}
                                className="NoteList_List_Item"
                                onDoubleClick={() => this.deleteNote(note)}
                                onClick={() => this.selectNote(note)}
                            > 
                            <h4>{note.title}</h4>
                            <p>{moment(note.createdAt).fromNow()}</p>     
                            </li>)
                    }
                    <li className="NoteList_List_Item">
                        <CreateNote getNotes={this.props.getNotes}/>
                    </li>
                </ul>
            </div>
        )
    }
}
