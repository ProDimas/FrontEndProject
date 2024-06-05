import React from "react";
import { longreads } from "./longreads";
import user_icon from "./icons/user_icon.png";
import searcher_css from "./stylesheets/searcher.css"

export class Searcher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {search_text: null, search_option: "title"};
    }

    handleSearch(e) {
        this.setState({search_text: e.target.value});
    }

    handleSearchOption(e) {
        this.setState({search_option: e.target.value});
    }

    getCurrentContent() {
        if (this.state.search_text === null) {
            return <></>;
        }
        else if (this.state.search_text === "") {
            return <></>;
        }
        else {
            const regexp = new RegExp(this.state.search_text, "i");

            let matching_longreads;

            if (this.state.search_option == "title") {
                matching_longreads = longreads.filter((l) => regexp.test(l.title));
            }
            else if (this.state.search_option == "author") {
                matching_longreads = longreads.filter((l) => regexp.test(l.author));
            }

            const markup_of = (l) => {
                return (
                    <div id={l.author + "+" + l.title} key={l.author + "+" + l.title}>
                        <h1>
                            <button type="button" onClick={(e) => this.props.reseter(l)}>{l.title}</button>
                        </h1>
                        <label>{l.text.slice(0, 20) + "..."}</label>
                        <label>{l.author}</label>
                        <img src={l.icon === undefined ? user_icon : l.icon}></img>
                    </div>
                );
            };

            return (matching_longreads.map(markup_of));
        }
    }

    render() {
        return (
            <div id="searcher">
                <input type="text" placeholder="Search by title..." onChange={(e) => this.handleSearch(e)}></input>
                <select id="search-options" onChange={(e) => this.handleSearchOption(e)} defaultValue="title">
                    <option value="title">By title</option>
                    <option value="author">By author</option>
                </select>
                <div id="content">
                    {this.getCurrentContent()}
                </div>
            </div>
        );
    }
}