import React, { useState } from 'react'
import { MapPin, CloudSun, Droplets, Wind, Sun, CloudRain } from 'lucide-react'

const CITIES = [
  { city: 'ঢাকা', temp: 32, condition: 'আংশিক মেঘলা', humidity: 68, wind: 'বাতাস ১২ কিমি/ঘ.', icon: 'sun-cloud' },
  { city: 'চট্টগ্রাম', temp: 30, condition: 'রৌদ্রোজ্জ্বল', humidity: 72, wind: 'বাতাস ১৪ কিমি/ঘ.', icon: 'sun' },
  { city: 'সিলেট', temp: 28, condition: 'হালকা বৃষ্টি', humidity: 82, wind: 'বাতাস ৯ কিমি/ঘ.', icon: 'rain' },
  { city: 'রাজশাহী', temp: 34, condition: 'পরিষ্কার আকাশ', humidity: 58, wind: 'বাতাস ১০ কিমি/ঘ.', icon: 'sun' },
]

export const WeatherWidget: React.FC = () => {
  const [cityIndex, setCityIndex] = useState(0)
  const current = CITIES[cityIndex]

  const nextCity = () => {
    setCityIndex((prev) => (prev + 1) % CITIES.length)
  }

  return (
    <div className="weather-card">
      <div className="weather-header">
        <div
          className="weather-city"
          onClick={nextCity}
          style={{ cursor: 'pointer', userSelect: 'none' }}
          title="অন্য শহর দেখতে ক্লিক করুন"
        >
          <MapPin size={15} color="var(--color-primary)" />
          <span>{current.city}</span>
          <span style={{ fontSize: '11px', color: 'var(--color-primary)', marginLeft: '4px' }}>▼</span>
        </div>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>আবহাওয়া বার্তা</span>
      </div>

      <div className="weather-main">
        <div style={{ color: current.icon === 'rain' ? '#0284c7' : '#f59e0b' }}>
          {current.icon === 'rain' ? <CloudRain size={40} /> : current.icon === 'sun' ? <Sun size={40} /> : <CloudSun size={40} />}
        </div>
        <div>
          <div className="weather-temp">{current.temp}°C</div>
          <div className="weather-condition">{current.condition}</div>
        </div>
      </div>

      <div className="weather-details">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Droplets size={12} color="#0284c7" />
            আর্দ্রতা {current.humidity}%
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Wind size={12} color="#64748b" />
            {current.wind}
          </span>
        </div>
      </div>
    </div>
  )
}
