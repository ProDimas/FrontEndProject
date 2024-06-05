import React from "react";
import { PageMode } from "./page_mode";
import { longreads } from "./longreads";
import user_icon from "./icons/user_icon.png";
import back_icon from "./icons/back_icon.png";
import ok_icon from "./icons/ok_icon.png";
import writer_css from "./stylesheets/writer.css";

export class Writer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getCurrentIcon() {
        if (this.state.icon === undefined) {
            return <img src={user_icon}></img>;
        }
        else {
            return <img src={this.state.icon}></img>;
        }
    }

    handleBack(e) {
        this.props.reseter(PageMode.Searching);
    }

    handleChange(e) {
        if (e.target.name == "icon") {
            this.setState({icon: URL.createObjectURL(e.target.files[0])});
        }
        else {
            this.setState({[e.target.name]: e.target.value});
        }
    }

    handleSubmit(e) {
        longreads.push(this.state);
        this.props.reseter(PageMode.Searching);
    }

    render() {
        return (
            <div id="writer">
                <button type="button" onClick={(e) => this.handleBack(e)}>
                    <img src={back_icon}></img>
                </button>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <label>Longread title:</label>
                    <input type="text" required minLength={5} onChange={(e) => this.handleChange(e)} name="title"></input>
                    <label>Longread text:</label>
                    <textarea required minLength={1} onChange={(e) => this.handleChange(e)} name="text"></textarea>
                    <label>Longread author:</label>
                    <input type="text" required minLength={5} onChange={(e) => this.handleChange(e)} name="author"></input>
                    <label>Longread author icon:</label>
                    <input type="file" id="icon_input" accept="image/*" onChange={(e) => this.handleChange(e)} name="icon"></input>
                    {this.getCurrentIcon()}
                    <button type="submit">
                        <img src={ok_icon}></img>
                        Submit longread
                    </button>
                </form>
            </div>
        );
    }
}