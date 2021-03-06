import React, { useState, useEffect } from 'react';
import './App.css';

import { FormControl, Select, MenuItem, CardContent, Card } from '@material-ui/core'
import Infobox from './components/Infobox';
import Map from './components/Map';
import Table from './components/Table';

import { sortData, prettyPrintStat } from './services/utils';
import LineGraph from './components/LineGraph';

import 'leaflet/dist/leaflet.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');

  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(2.5);

  const [mapCountries, setMapCountries] = useState([]);

  const [casesType, setCasesType] = useState('cases');

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountries = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((countryData) => (
            {
              name: countryData.country,
              value: countryData.countryInfo.iso2
            }
          ));

          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
          setCountries(countries);
        })
    }
    getCountries();
  }, []);

  const onCountryChange = async (e) => {

    const countryCode = e.target.value;

    const url =
      countryCode === 'worldwide'
        ? 'https://disease.sh/v3/covid-19/all'
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountry(countryCode);
        setCountryInfo(data);
        console.log(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      })
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 Tracker</h1>
          <FormControl className='app__dropdown'>
            <Select variant='outlined' onChange={onCountryChange} value={country}>
              <MenuItem value='worldwide'>Worldwide</MenuItem>
              {countries.map(country => (
                <MenuItem key={country.value} value={country.value}>{country.name}</MenuItem>
              ))}

            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <Infobox
            isRed
            active={casesType === 'cases'}
            onClick={e => setCasesType('cases')}
            title='Coronavirus Cases'
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={prettyPrintStat(countryInfo.cases)}
          />

          <Infobox
            active={casesType === 'recovered'}
            onClick={e => setCasesType('recovered')}
            title='Recovered'
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={prettyPrintStat(countryInfo.recovered)}
          />

          <Infobox
            isRed
            active={casesType === 'deaths'}
            onClick={e => setCasesType('deaths')}
            title='Deaths'
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={prettyPrintStat(countryInfo.deaths)}
          />
        </div>

        <div className="map">
          <Map
            casesType={casesType}
            countries={mapCountries}
            center={mapCenter}
            zoom={mapZoom}
          />
        </div>
      </div>

      <Card className="app__right">
        <CardContent>
          <h3>Live cases by country</h3>
          <Table countries={tableData} />
          <h3>Worldwide new {casesType}</h3>
          <LineGraph
          casesType={casesType}
           />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
