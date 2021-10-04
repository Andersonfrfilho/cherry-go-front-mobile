import React from 'react';
import LottieView from 'lottie-react-native';
import { Container } from './styles';
import loadingCherryGo from '../../assets/animations/loading-cherries.json';
import theme from '../../styles/theme';

export function LoadAnimation() {
  return (
    <Container>
      <LottieView
        source={loadingCherryGo}
        autoPlay
        style={{ height: theme.measures.height }}
        resizeMode="contain"
        loop
      />
    </Container>
  );
}
