import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'colladodev.ionic.sanvipop',
  appName: 'Ionic Sanvipop',
  webDir: 'www',
  server: {
    androidScheme: 'https',
  },
  android: {
    allowMixedContent: true,
  },
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      androidClientId: 'colladodev.ionic.sanvipop',
      forceCodeForRefreshToken: true,
    },
  },
};

export default config;
