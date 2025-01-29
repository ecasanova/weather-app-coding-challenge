# Weather App Coding Challenge

This project is a weather application that allows users to get updated weather information for different locations.

[Demo](https://weather-app-coding-challenge.vercel.app)

![Screenshot 2025-01-29 at 10 35 55 AM](https://github.com/user-attachments/assets/22e6c8a8-25df-4a77-8288-c6d1613f5ba2)

## Features

- Current weather lookup by location.
- Display of temperature, humidity, and weather conditions. (Using: [Open Weather API](https://openweathermap.org) )
- Intuitive and easy-to-use user interface.

## Installation

Follow these steps to install and run the project locally:

1. Clone the repository:

    ```bash
    git clone https://github.com/ecasanova/weather-app-coding-challenge.git
    ```

2. Navigate to the project directory:

    ```bash
    cd weather-app-coding-challenge
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Setup .env vars
    Get Open Weather API Key on: [Open Weather API](https://openweathermap.org/api)
    Get Google Maps API Key on: [Google Developers Console](https://console.cloud.google.com/)

    ```bash
    VITE_OPEN_WEATHER_API_KEY=
    VITE_GOOGLE_MAPS_API_KEY=
    ```

5. Start the application:

    ```bash
    npm run dev
    ```

## Usage

1. Open your browser and navigate to `http://localhost:5173`.
2. Enter a location in the search bar to get the current weather.
3. Or click to get the weather for your current location (requires browser location permissions).
