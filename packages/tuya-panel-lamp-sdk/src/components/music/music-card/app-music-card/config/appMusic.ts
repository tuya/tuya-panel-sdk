import Res from '../../../../../res';
import Strings from '../i18n';

const AppleMusicData: AppMusicListItemType[] = [
  {
    id: 0,
    mode: 1,
    title: Strings.getLang('AppMusicCard_music'),
    icon: Res.app_music_music,
  },
  {
    id: 1,
    mode: 0,
    title: Strings.getLang('AppMusicCard_ball'),
    icon: Res.app_music_ball,
  },
  {
    id: 2,
    mode: 0,
    title: Strings.getLang('AppMusicCard_game'),
    icon: Res.app_music_game,
    colorArea: [
      {
        area: [0, 2],
        hue: 350,
        saturation: 400,
        value: 1000,
      },
      {
        area: [3, 5],
        hue: 50,
        saturation: 600,
        value: 1000,
      },
      {
        area: [6, 9],
        hue: 160,
        saturation: 600,
        value: 1000,
      },
    ],
  },
  {
    id: 3,
    mode: 1,
    title: Strings.getLang('AppMusicCard_romantic'),
    icon: Res.app_music_romantic,
    colorArea: [
      {
        area: [0, 2],
        hue: 20,
        saturation: 100,
        value: 1000,
      },
      {
        area: [3, 4],
        hue: 0,
        saturation: 1000,
        value: 1000,
      },
      {
        area: [5, 6],
        hue: 350,
        saturation: 400,
        value: 1000,
      },
      {
        area: [7, 9],
        hue: 300,
        saturation: 1000,
        value: 1000,
      },
    ],
  },
];

export default AppleMusicData;
