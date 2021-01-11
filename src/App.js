import React, { Component } from 'react'
//import axios from 'axios';
import PaceConverter from './PaceConverter'

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      converted: "--",
      pace: ""
    };

    this.convertKmToMi = this.convertKmToMi.bind(this);
    this.convertMiToKm = this.convertMiToKm.bind(this);
  }

  convertKmToMi() {
    var _this = this;
    /*axios.get(
      'https://us-central1-pace-calculator-301320.cloudfunctions.net/toMi',
      {
        params: {
          pace: this.state.km
        }
      }
    )
    .then(function (response) {
        _this.setState({ pace: response.data + ' min/mile' })
    })
    .catch(function (error) {
        console.log(error);
    });*/
    let paceConverter = new PaceConverter();
    var seconds = paceConverter.convertStringToSeconds(this.state.pace);
    const paceInMi = paceConverter.convertPaceToMi(seconds);

    _this.setState({ converted: paceInMi + ' min/miles' })
  }

  convertMiToKm() {
    var _this = this;
    /*axios.get(
      'https://us-central1-pace-calculator-301320.cloudfunctions.net/toKm',
      {
        params: {
          pace: this.state.mi
        }
      }
    )
    .then(function (response) {
        _this.setState({ pace: response.data + ' min/km' })
    })
    .catch(function (error) {
        console.log(error);
    });*/
    let paceConverter = new PaceConverter();
    var seconds = paceConverter.convertStringToSeconds(this.state.pace);
    const paceInKm = paceConverter.convertPaceToKm(seconds);

    _this.setState({ converted: paceInKm + ' min/km' })
  }

  render() {
    return (
      <div className="App">
        <header className="p-5 bg-white shadow App-header">
          <h1 className="text-center text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-20 mx-auto mb-2 hidden md:block">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg> My Pace Converter
          </h1>
          <h2 className="text-center mt-2 mx-auto text-md text-gray-500">
            Convert your minutes per kilometer to miles and vice versa.
          </h2>
        </header>
        <section className="max-w-lg mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="text-6xl text-gray-800 mb-6">
            { this.state.converted }
          </div>

          <div className="mt-1 flex rounded-md shadow-sm">
            <div className="relative flex items-stretch flex-grow focus-within:z-10">
              <input type="text" name="pace" id="pace" className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-10 sm:text-sm border-gray-300" placeholder="10:25" onChange={e => this.setState({pace: e.target.value})} />
              <div className="text-gray-600 absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                pace
              </div>
            </div>
            <button className="-ml-px relative px-3 py-2 border border-gray-300 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 w-36 md:w-20" onClick={ this.convertKmToMi } >
              <span>to miles</span>
            </button>
            <button className="-ml-px relative px-3 py-2 border border-gray-300 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 w-36 md:w-20" onClick={ this.convertMiToKm } >
              <span>to km</span>
            </button>
          </div>
        </section>
        <section className="max-w-md mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <h3 className="text-lg font-bold text-center mb-4 text-gray-500">API Documentation</h3>
          <p className="bg-white p-4 rounded">
          GET: <br />https://mypaceconverter/to-km?pace=8:51<br /><br />

          Returns: <span className="bg-gray-200 px-2 py-1 rounded">&#x007B; "5:30" &#125;</span><br /><br />

          GET: <br />https://mypaceconverter/to-miles?pace=5:30<br /><br />

          Returns: <span className="bg-gray-200 px-2 py-1 rounded">&#x007B; "8:51" &#125;</span>
          </p>
        </section>
      </div>
    );
  }
}

export default App;
