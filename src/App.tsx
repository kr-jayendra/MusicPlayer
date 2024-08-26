import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {addTracks, setupPlayer} from '../service/musicService';
import MusicPlayer from './screens/MusicPlayer';

function App(): React.JSX.Element {
  const [isPlaybackReady, setIsPlaybackReady] = useState(false);

  async function setup() {
    const isSetup = await setupPlayer();
    if (isSetup) {
      await addTracks();
    }
    setIsPlaybackReady(isSetup);
  }
  useEffect(() => {
    setup();
  }, []);

  if (!isPlaybackReady) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <SafeAreaView>
      <StatusBar barStyle={'dark-content'} />
      <MusicPlayer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});

export default App;
