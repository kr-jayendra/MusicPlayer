import TrackPlayer, {Event, RepeatMode} from 'react-native-track-player';
import {playlist} from '../data/musicPlayList';

export async function setupPlayer() {
  let isSetUp = false;
  try {
    const trackIndex = await TrackPlayer.getActiveTrackIndex();
    if (!trackIndex) {
      await TrackPlayer.setupPlayer();
    }
    isSetUp = true;
  } catch (error) {
    await TrackPlayer.setupPlayer();
    isSetUp = true;
  } finally {
    return isSetUp;
  }
}

export async function addTracks() {
  try {
    await TrackPlayer.add(playlist);
    await TrackPlayer.setRepeatMode(RepeatMode.Queue);
  } catch (error) {
    console.log('error in adding tracks', error);
  }
}

export async function playbackService() {
  TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
  TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());
  TrackPlayer.addEventListener(Event.RemoteNext, () =>
    TrackPlayer.skipToNext(),
  );
  TrackPlayer.addEventListener(Event.RemotePrevious, () =>
    TrackPlayer.skipToPrevious(),
  );
}
