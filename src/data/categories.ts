import { CategoryItem, WeatherData } from '../types/news'

export const CATEGORIES: CategoryItem[] = [
  { id: '1', name: 'জাতীয়', slug: 'national', iconName: 'Landmark', count: 482 },
  { id: '2', name: 'রাজনীতি', slug: 'politics', iconName: 'Megaphone', count: 261 },
  { id: '3', name: 'অর্থনীতি', slug: 'economy', iconName: 'TrendingUp', count: 185 },
  { id: '4', name: 'আন্তর্জাতিক', slug: 'international', iconName: 'Globe', count: 210 },
  { id: '5', name: 'খেলা', slug: 'sports', iconName: 'Trophy', count: 164 },
  { id: '6', name: 'বিনোদন', slug: 'entertainment', iconName: 'Film', count: 142 },
  { id: '7', name: 'প্রযুক্তি', slug: 'technology', iconName: 'Cpu', count: 198 },
  { id: '8', name: 'জীবনধারা', slug: 'lifestyle', iconName: 'HeartHandshake', count: 115 },
]

export const DEFAULT_WEATHER: WeatherData = {
  city: 'ঢাকা',
  temp: 32,
  condition: 'আংশিক মেঘলা',
  humidity: 68,
  windSpeed: 'বাতাস ১২ কিমি/ঘ.',
  forecast: [
    { day: 'আজ', temp: 32, icon: 'CloudSun' },
    { day: 'কাল', temp: 33, icon: 'Sun' },
    { day: 'পরশু', temp: 31, icon: 'CloudRain' },
  ]
}
