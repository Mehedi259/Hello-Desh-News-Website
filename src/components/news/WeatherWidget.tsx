import React from 'react'
import { MapPin, CloudSun, Droplets, Wind } from 'lucide-react'
import { DEFAULT_WEATHER } from '../../data/categories'

export const WeatherWidget: React.FC = () => {
  return (
    <div className="weather-card">
      <div className="weather-header">
        <div className="weather-city">
          <MapPin size={15} color="var(--color-primary)" />
          <span>{DEFAULT_WEATHER.city}</span>
        </div>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>আবহাওয়া বার্তা</span>
      </div>

      <div className="weather-main">
        <div style={{ color: '#f59e0b' }}>
          <CloudSun size={42} />
        </div>
        <div>
          <div className="weather-temp">{DEFAULT_WEATHER.temp}°C</div>
          <div className="weather-condition">{DEFAULT_WEATHER.condition}</div>
        </div>
      </div>

      <div className="weather-details">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Droplets size={12} color="#0284c7" />
            আর্দ্রতা {DEFAULT_WEATHER.humidity}%
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Wind size={12} color="#64748b" />
            {DEFAULT_WEATHER.windSpeed}
          </span>
        </div>
      </div>
    </div>
  )
}
