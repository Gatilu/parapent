import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  weatherData: any;
  searchCity: string = '';

  constructor(private http: HttpClient) {}

  searchWeather() {
    if (!this.searchCity) {
      return;
    }

    const apiKey = 'b44d570a8769007984fe5a5c92c3e9c6';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${this.searchCity}&appid=${apiKey}&units=metric`;

    this.http.get(apiUrl).subscribe(
      data => {
        this.weatherData = data;
        console.log('Dados do clima (pesquisa):', this.weatherData);
        this.searchCity = '';
      },
      error => {
        console.error('Erro ao buscar dados do clima:', error);
      }
    );
  }

  getWeatherIcon(iconCode: string) {
    return `https://openweathermap.org/img/wn/${iconCode}.png`;
  }

  isGoodWeatherForFlying() {
    if (!this.weatherData) return false;
    const windSpeed = this.weatherData.wind.speed;
    const weatherCondition = this.weatherData.weather[0].main.toLowerCase();
    return windSpeed <= 10 && weatherCondition !== 'rain';
  }
}
