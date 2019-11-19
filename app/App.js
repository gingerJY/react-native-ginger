/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import Home from './pages/main/home';
import Video from './pages/details/video/video';
import { Scene, Router, Stack, Lightbox, Overlay, Drawer, Modal, Actions } from 'react-native-router-flux';
import Orientation from 'react-native-orientation';

Orientation.lockToPortrait();

const App = () => {
  return (
    // <Router>
    //   <Stack key="root">
    //     <Scene key="home" component={Home} />
    //     <Scene key="video" component={Video} title="Video" />
    //   </Stack>
    // </Router>
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Video />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
});

export default App;
