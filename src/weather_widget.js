import React from "react";
import { PageMode } from "./page_mode";
import weather_icon from "./icons/weather_icon.png";
import weather_widget_css from "./stylesheets/weather_widget.css";

export class WeatherWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {loading: false, weather: null};
        this.api_key = "9c6ce24b34e3a041055ba74a2cda91e8";
        this.lat = 45.504365; 
        this.lon = -73.666446;
        this.url = `http://api.openweathermap.org/data/2.5/forecast?lat=${this.lat}&lon=${this.lon}&cnt=10&units=metric&appid=${this.api_key}`;
    }

    getWeather() {
        this.setState({loading: true});
        fetch(this.url, {
            method: "GET",
            headers: {}
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            else {
                throw Error(`Error status ${res.status}`);
            }
        })
        .then(data => {
            this.setState({weather: data});
        })
        .catch(err => console.log(err))
        .finally(() => this.setState({loading: false}));
    }

    weather_markup() {
        if (this.state.weather === null) {
            return <></>;
        }
        else {
            var w = this.state.weather;

            const weather_day_markup = (wd) => {
                const icon_url = `https://openweathermap.org/img/wn/${wd.weather[0].icon}@2x.png`
                return (
                    <li key={wd.dt}>
                        <img src={icon_url}></img>
                        <label>{`Min temp: ${wd.main.temp_min}°C`}</label>
                        <label>{`Max temp: ${wd.main.temp_max}°C`}</label>
                        <label>{`Time: ${wd.dt_txt}`}</label>
                    </li>
                );
            }

            return (
                <>
                    <h1>Weather</h1>
                    <h2>{`City: ${w.city.name},${w.city.country}`}</h2>
                    <ul>
                        {w.list.map(weather_day_markup)}
                    </ul>
                </>
            );
        }
    }

    getCurrentContent() {
        if (this.state.loading) {
            return <progress max={100} value={50}></progress>
        }
        else {
            return this.weather_markup();
        }
    }

    handleBack(e) {
        this.props.reseter(PageMode.Searching);
    }

    render() {
        return (
            <div id="weather-widget">
                <button type="button" onClick={(e) => this.getWeather()} disabled={this.state.loading}>
                    <img src={weather_icon}></img>
                </button>
                {this.getCurrentContent()}
            </div>
        );
    }
}