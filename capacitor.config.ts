import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Fit_Logger',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
