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
      androidClientId: '1066792929235-fm57ku5qv4ncifl4fkvtdsb1j6jvmmsq.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
  },
};

export default config;
