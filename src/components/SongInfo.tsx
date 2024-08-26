import {View, Text, StyleSheet} from 'react-native';
import React, {PropsWithChildren} from 'react';
import {Track} from 'react-native-track-player';

type SongInfoProps = PropsWithChildren<{
  track: Track | null | undefined;
}>;

export default function SongInfo({track}: SongInfoProps) {
  return (
    <View style={styles.container}>
      <View style={styles.nowPlaying}>
        <Text style={styles.name}>{track?.title} </Text>
        <Text style={styles.artist}>{track?.artist}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  nowPlaying: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  artist: {
    fontSize: 14,
    color: '#FFFFFF',
  },
});
