import React from "react";
import { PageMode } from "./page_mode";
import write_icon from "./icons/write_icon.png"
import writer_part_css from "./stylesheets/writer_part.css";

export class WriterPart extends React.Component {
    constructor(props) {
        super(props);
    }

    toWriteHandler(e) {
        this.props.reseter(PageMode.Writing);
    }

    render() {
        return (
            <div id="writer-part">
                <button type="button" onClick={(e) => this.toWriteHandler(e)}>
                    <img src={write_icon}></img>
                </button>
            </div>
        );
    }
}