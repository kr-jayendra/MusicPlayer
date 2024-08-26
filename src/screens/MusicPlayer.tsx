import React, {useState} from 'react';
import {View, StyleSheet, Dimensions, FlatList, Image} from 'react-native';
import TrackPlayer, {
  Event,
  Track,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import {playlist} from '../../data/musicPlayList';
import SongInfo from '../components/SongInfo';
import SongSlider from '../components/SongSlider';
import ControlCenter from '../components/ControlCenter';

const {width} = Dimensions.get('window');

const events = [
  Event.PlaybackState,
  Event.PlaybackTrackChanged,
  Event.PlaybackError,
];

const MusicPlayer = () => {
  const [track, setTrack] = useState<Track | null>();

  useTrackPlayerEvents(events, async event => {
    if (event.type === Event.PlaybackTrackChanged) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      setTrack(track);
    }
  });

  const renderArtWork = () => {
    return (
      <View style={styles.artWorkContainer}>
        <View style={styles.albumContainer}>
          {track?.artwork && (
            <Image
              source={{uri: track?.artwork?.toString()}}
              style={styles.albumArtImg}
            />
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.musicContainer}>
      <FlatList
        horizontal
        data={playlist}
        renderItem={renderArtWork}
        keyExtractor={song => song.id.toString()}
      />
      <SongInfo track={track} />
      <View style={styles.songInfoContainer}>
        <SongSlider />
        <ControlCenter />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  musicContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#181818',
    height: '100%',
  },
  songInfoContainer: {
    flex: 1,
    gap: 15,
    width: '100%',
  },
  albumContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
  },

  albumArtImg: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
  artWorkContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MusicPlayer;
