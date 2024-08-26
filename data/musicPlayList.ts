import {Track} from 'react-native-track-player';
import musicData from './musicData.json';

export const playlist: Track[] = musicData.map((track, index) => {
  return {
    id: index,
    url: track.url,
    title: track.title,
    artist: track.artist,
    artwork: track.artwork,
  };
});
