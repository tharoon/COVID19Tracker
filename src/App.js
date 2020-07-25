import React, {Component} from 'react';
import { Cards, Chart, CountryPicker } from './components'; 
import styles from './App.module.css';
import { fetchData } from './api';
import logo from './images/image.png';
import ParticlesBg from 'particles-bg'

class App extends Component{
    state = {
        data: {},
        country: ''
    }

    async componentDidMount(){
        try {
            const fetchedData = await fetchData();
            this.setState({
                data: fetchedData
            });
        }catch (error) {

        }
    }
    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);
        this.setState({
            data: fetchedData,
            country: country
        });
    }
    render(){
        const { data, country } = this.state;
        let config = {
            num: [8],
            rps: 0.4,
            radius: [10, 40],
            life: [1.5, 3],
            v: [2, 3],
            tha: [-40, 40],
            alpha: [0.7, 0],
            scale: [.1, 0.4],
            position: "all",
            color: ["#ed5362"],
            cross: "dead",
            random: 25
          };
        return(
            <div className = {styles.container}>
                <ParticlesBg type="custom" config={config} bg={true} />
                <img src={logo} className={styles.image} alt="COVID-19"></img>
                <Cards data = {data}/>
                <CountryPicker handleCountryChange = {this.handleCountryChange}/>
                <Chart data = {data} country={country}/>
            </div>
            
        )
    }
}



export default App;