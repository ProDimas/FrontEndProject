import React from "react";
import { PageMode } from "./page_mode";
import { HeaderPart } from "./header_part";
import { WriterPart } from "./writer_part";
import { Searcher } from "./searcher";
import { Writer } from "./writer";
import { Reader } from "./reader";
import { WeatherWidget } from "./weather_widget";

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {pmode: PageMode.Searching};
    }

    resetPageMode(mode) {
        this.setState({pmode: mode});
    }

    switchToReading(longread) {
        this.resetPageMode(PageMode.Reading);
        this.setState({longread: longread});
    }

    getCurrentContent() {
        if (this.state.pmode === PageMode.Searching) {
            return <Searcher reseter={this.switchToReading.bind(this)}/>
        }
        else if (this.state.pmode === PageMode.Writing) {
            return <Writer reseter={this.resetPageMode.bind(this)}/>;
        }
        else if (this.state.pmode === PageMode.Reading) {
            return <Reader reseter={this.resetPageMode.bind(this)} longread={this.state.longread}/>;
        }
        else {
            console.error("Incorrect page mode in App state");
            return <></>;
        }
    }

    render() {
        return (
            <>
                <HeaderPart />
                <WeatherWidget />
                <WriterPart reseter={this.resetPageMode.bind(this)}/>
                {this.getCurrentContent()}
            </>
        );
    }
}