import React from "react";
import { PageMode } from "./page_mode";
import back_icon from "./icons/back_icon.png";
import user_icon from "./icons/user_icon.png";
import reader_css from "./stylesheets/reader.css";

export class Reader extends React.Component {
    constructor(props) {
        super(props);
    }

    handleBack(e) {
        this.props.reseter(PageMode.Searching);
    }

    render() {
        const markup_of = (l) => {
            return (
                <div id={l.author + "+" + l.title} key={l.author + "+" + l.title}>
                    <h1>{l.title}</h1>
                    <label>{l.text}</label>
                    <img src={l.icon === undefined ? user_icon : l.icon}></img>
                    <label>{l.author}</label>
                </div>
            );
        };

        return (
            <div id="reader">
                <button type="button" onClick={(e) => this.handleBack(e)}>
                    <img src={back_icon}></img>
                </button>
                {markup_of(this.props.longread)}
                <button type="button" onClick={(e) => this.handleBack(e)}>
                    <img src={back_icon}></img>
                </button>
            </div>
        );
    }
}