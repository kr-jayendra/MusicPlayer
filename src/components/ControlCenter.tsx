import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import TrackPlayer, {
  PlaybackState,
  State,
  usePlaybackState,
} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/MaterialIcons';

type playbackType =
  | PlaybackState
  | {
      state: undefined;
    };
const ControlCenter = () => {
  const playbackState = usePlaybackState();

  const skipToNext = async () => {
    await TrackPlayer.skipToNext();
  };

  const skipToPrevious = async () => {
    await TrackPlayer.skipToPrevious();
  };

  const togglePlayback = async (playback: playbackType) => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack !== null) {
      if (playback.state === State.Paused || playback.state == State.Ready) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={skipToPrevious}>
        <Icon style={styles.icon} name="skip-previous" size={40} />
      </Pressable>
      <Pressable onPress={() => togglePlayback(playbackState)}>
        <Icon
          style={styles.icon}
          name={playbackState.state === State.Playing ? 'pause' : 'play-arrow'}
          size={40}
        />
      </Pressable>
      <Pressable onPress={skipToNext}>
        <Icon style={styles.icon} name="skip-next" size={40} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display:'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center'
  },
  icon: {
    color: '#FFFFFF',
  },
});

export default ControlCenter;
