
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.2deb220e7569423d816f138d3ddb058f',
  appName: 'sleek-sumador',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: 'https://2deb220e-7569-423d-816f-138d3ddb058f.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    buildOptions: {
      keystorePath: null,
      keystorePassword: null,
      keystoreAlias: null,
      keystoreAliasPassword: null,
      signingType: null,
    }
  }
};

export default config;
