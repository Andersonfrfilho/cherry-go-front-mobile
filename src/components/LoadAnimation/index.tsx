import React, { useEffect } from 'react';
import LottieView from 'lottie-react-native';
import { Container } from './styles';
import loadingCherryGo from '../../assets/animations/loading-cherries.json';

export function LoadAnimation() {
  return (
    <Container>
      <LottieView
        source={loadingCherryGo}
        autoPlay
        style={{ height: 200 }}
        resizeMode="contain"
        loop
      />
    </Container>
  );
}
