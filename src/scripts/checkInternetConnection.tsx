import * as Network from 'expo-network';

export const checkInternetConnection = async () => {
  try {
    const networkState = await Network.getNetworkStateAsync();
    return networkState.isConnected && networkState.isInternetReachable;
  } catch (error) {
    // console.error('Error checking internet connection:', error);
    return false;
  }
};
