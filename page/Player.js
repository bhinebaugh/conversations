import React, { Component } from 'react';
import { StyleSheet, View, BackHandler } from 'react-native'
import { StackNavigator } from 'react-navigation'
import YouTube from 'react-native-youtube'
import styles from './styles';

const youtubeApiKey = "AIzaSyDWgERNRbubs4t4Em7fOyQX2d-S6POo_aY"; 

export default class Player extends Component {

    constructor(props) {
        super(props)
        this.state = {
            renderChild: true,
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.focusListener = props.navigation.addListener('willFocus', payload =>{
            console.log('Player focus', payload)
            this.setState({ renderChild: true })
          })
    
        this.blurListener = props.navigation.addListener('didBlur', payload => {
            console.log('Player blur', payload)
            this.setState({ renderChild: false })
          })
    
    
      }

    componentDidMount() {
        console.log('componentDidMount: ');
        console.log('componentDidMount: ', this.state.renderChild);
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
        
    componentWillUnmount() {
        console.log('componentWillUnmount: ');
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
        focusListener.remove();
        blurListener.remove();
    }
    
    handleBackButtonClick() {
        console.log('handleBackButtonClick: ');
        // this.setState({ renderChild: false }); // this should now be redundant with the blur listener
        console.log('handleBackButtonClick: ', this.state.renderChild);
        this.props.navigation.navigate('Chooser');
        return true;
    }
    
    restartYouTubePlayer(navigate) {
        return(
            this.state.renderChild ?
            <YouTube
                apiKey={youtubeApiKey}
                videoId={navigate.getParam('videoId','')}
                play={true}
                fullscreen={true}
                showFullscreenButton={false}
                onChangeFullscreen={e => e.isFullscreen || navigate.goBack()}
                onReady={e => this.setState({ isReady: true })}
                onChangeState={e => this.setState({ status: e.state })}
                onChangeQuality={e => this.setState({ quality: e.quality })}
                onError={e => this.setState({ error: e.error })}
                style={{ alignSelf: 'stretch', height: 300 }}
            /> 
            : null
        );
    }

    render() {
      const navigate = this.props.navigation;
      return (
        <View style={stylePlayer.container}>
        {
            this.restartYouTubePlayer(navigate) 
        }
        </View>
      );
    }
  }

  const stylePlayer = StyleSheet.create({
      container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff'
      }
  })