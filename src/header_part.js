import React from "react";
import favicon from "./icons/favicon.png";
import header_part_css from "./stylesheets/header_part.css";

export class HeaderPart extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="header-part">
                <div id="title-bar">
                    <h1 id="main-header">Longwreater</h1>
                    <img src={favicon}></img>
                </div>
            </div>
        );
    }
}