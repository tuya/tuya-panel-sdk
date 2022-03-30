const fullDeg = Math.PI * 2;

export const circleGradientBg = [
  {
    angle: 0,
    color: '#FF0000',
  },
  {
    angle: fullDeg * 0.083,
    color: '#FF007F',
  },
  {
    angle: fullDeg * 0.167,
    color: '#FF00FF',
  },
  {
    angle: fullDeg * 0.25,
    color: '#7F00FF',
  },
  {
    angle: fullDeg * 0.333,
    color: '#0000FF',
  },
  {
    angle: fullDeg * 0.417,
    color: '#007FFF',
  },
  {
    angle: fullDeg * 0.5,
    color: '#00FFFF',
  },
  {
    angle: fullDeg * 0.583,
    color: '#00FF7F',
  },
  {
    angle: fullDeg * 0.667,
    color: '#00FF00',
  },
  {
    angle: fullDeg * 0.75,
    color: '#7FFF00',
  },
  {
    angle: fullDeg * 0.833,
    color: '#FFFF00',
  },
  {
    angle: fullDeg * 0.917,
    color: '#FF7F00',
  },
];

export const rectGradientBg = [
  {
    colors: [
      { offset: '0%', stopColor: '#FF0000', stopOpacity: 1 },
      { offset: '8%', stopColor: '#FF7F00', stopOpacity: 1 },
      { offset: '20%', stopColor: '#FFFF00', stopOpacity: 1 },
      { offset: '25%', stopColor: '#7FFF00', stopOpacity: 1 },
      { offset: '33%', stopColor: '#00FF00', stopOpacity: 1 },
      { offset: '42%', stopColor: '#00FF7F', stopOpacity: 1 },
      { offset: '50%', stopColor: '#00FFFF', stopOpacity: 1 },
      { offset: '58%', stopColor: '#007FFF', stopOpacity: 1 },
      { offset: '66%', stopColor: '#0000FF', stopOpacity: 1 },
      { offset: '75%', stopColor: '#7F00FF', stopOpacity: 1 },
      { offset: '83%', stopColor: '#FF00FF', stopOpacity: 1 },
      { offset: '92%', stopColor: '#FF007F', stopOpacity: 1 },
      { offset: '100%', stopColor: '#FF0000', stopOpacity: 1 },
    ],
  },
  {
    x2: '0%',
    y2: '100%',
    colors: [
      { offset: '0%', stopColor: '#fff', stopOpacity: 1 },
      { offset: '16%', stopColor: '#fff', stopOpacity: 0.9 },
      { offset: '100%', stopColor: '#fff', stopOpacity: 0 },
    ],
  },
];
