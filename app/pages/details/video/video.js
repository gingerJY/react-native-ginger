import React, { Component } from 'react';
import { Dimensions, View, Text, ScrollView, StatusBar, Image, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import RNFetchBlob from 'rn-fetch-blob';
import { Progress, Tip } from 'beeshell';

const { height, width } = Dimensions.get('window');
const videoUrl = 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/7f49c1ccd75f76ec86b52c9ae4c4a082.mp4';

class VideoPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isPIP: false,
      orientation: 'portrait',
      downloadProgress: 0,
      isShowProgress: false
    };
  }

  // componentDidMount() {

  // }

  // componentWillUnmount() {

  // }

  onLoad = () => {

  }

  onBuffer = () => {
    console.log('onBuffer')
  }

  videoError = () => {
    console.log('videoError')
  }
  pInP = () => {
    this.setState({ isPIP: !this.state.isPIP })
  }

  fullScreen = () => {
    // this.player.presentFullscreenPlayer();
  }
  _onProgress = (data) => {
    // console.log(data)
  }

  downloadVideo = () => {
    this.setState({ isShowProgress: true })
    RNFetchBlob
      .config({
        fileCache: true,
        appendExt : 'mp4'
      })
      .fetch('GET', 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/7f49c1ccd75f76ec86b52c9ae4c4a082.mp4', {
        //some headers ..
      })
      .progress((received, total) => {
        console.log('progress', received, total)
        this.setState({ downloadProgress : received / total * 100 })
      })
      .then((res) => {
        // the temp file path
        this.setState({ isShowProgress: false })
        Tip.show('下载完成', 2000, 'center')
        console.log('The file saved to ', res.path())
      })
  }

  render() {
    return <ScrollView>
      <View>
        <Image source={{uri: 'https://hbfile.huabanimg.com/img/home/banner/9e4a2bc07c7cb706479d5eddcd15eb889b3c21f4cd5b3'}} style={{width: width, height: 100}} />
      </View>
      <TouchableOpacity onPress={this.pInP}>
      </TouchableOpacity>
      <Video
        source={{ uri: videoUrl }}
        ref={(ref) => {
          this.player = ref
        }}
        onBuffer={this.onBuffer}
        onError={this.videoError}
        onLoad={this.onLoad}
        onProgress={this._onProgress}
        style={styles.backgroundVideo}
        controls={true}
        fullscreen={false}
      // audioOnly={true}
      // fullscreenAutorotate={true}
      // fullscreenOrientation={this.state.orientation}
      // pictureInPicture={this.state.isPIP}
      // onFullscreenPlayerWillPresent={() => { this.setState({ orientation: 'landscape'})}}
      // onFullscreenPlayerDidDismiss={() => { this.setState({ orientation: 'portrait'})}}
      />
      <TouchableOpacity onPress={this.fullScreen} style={{ backgroundColor: 'orange', width: 80, height: 35 }}>
        <Text>全屏</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={this.downloadVideo} style={{ backgroundColor: 'green', width: 80, height: 35 }}>
        <Text>下载</Text>
      </TouchableOpacity>
      {this.state.isShowProgress && <Progress easing={true} percent={this.state.downloadProgress} barStyle={{ height: 16 }} style={{ borderRadius: 8, borderWidth: 1 }} />}
    </ScrollView>
  }
}

const styles = StyleSheet.create({
  backgroundVideo: {
    width: 300,
    height: 180,
  },
});



export default VideoPage
