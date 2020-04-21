import imgCostaRica from 'assets/images/costa_rica.jpg';
import imgInterlaken from 'assets/images/interlaken.jpg';
import imgSydney from 'assets/images/sydney.jpg';


export const locations = [
  {
    placename: 'Costa Rica',
    date: 'August 1, 2015',
    image: imgCostaRica,
    location: {
      lat: 38.958988,
      lng: -77.417320
    },
    todo: [
      'Where we start! 🚀'
    ]
  },
  {
    placename: 'Interlaken, Switzerland',
    date: 'January 17, 2011',
    image: imgInterlaken,
    location: {
      lat: 46.6863,
      lng: 7.8632
    },
    todo: [
      'Snowboarding in the Swiss Alps 🏂'
    ]
  },
  {
    placename: 'Sydney, Australia',
    date: 'January 17, 2011',
    image: imgSydney,
    location: {
      lat: 33.8688,
      lng: 151.2093
    },
    todo: [
      'Opera House 🇦🇺'
    ]
  },
];