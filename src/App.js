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
          <h1 class="text-center text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            My Pace Converter
          </h1>
          <h2 className="text-center mt-2 mx-auto text-md text-gray-500">
            Convert your minutes per kilometer to miles and vice versa.
          </h2>
        </header>
        <section class="max-w-lg mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="text-6xl text-gray-800 mb-6">
            { this.state.converted }
          </div>

          <div class="mt-1 flex rounded-md shadow-sm">
            <div class="relative flex items-stretch flex-grow focus-within:z-10">
              <input type="text" name="km-pace" id="km-pace" class="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-10 sm:text-sm border-gray-300" placeholder="10:25" onChange={e => this.setState({pace: e.target.value})} />
              <div class="text-gray-600 absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                pace
              </div>
            </div>
            <button class="-ml-px relative px-3 py-2 border border-gray-300 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 w-36 md:w-20" onClick={ this.convertKmToMi } >
              <span>to miles</span>
            </button>
            <button class="-ml-px relative px-3 py-2 border border-gray-300 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 w-36 md:w-20" onClick={ this.convertMiToKm } >
              <span>to km</span>
            </button>
          </div>
        </section>
        <section class="max-w-md mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <h3 className="text-lg font-bold">API Documentation</h3>
          <p>

          </p>
        </section>
      </div>
    );
  }
}

export default App;
