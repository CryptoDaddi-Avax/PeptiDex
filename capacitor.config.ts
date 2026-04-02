import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.PeptiDex.app',
    appName: 'PeptiDex',
    webDir: 'out',
    server: {
        // In production, the app loads from the local static files
        // For development, uncomment the url below to use the dev server:
        // url: 'http://192.168.x.x:3000',
        // cleartext: true,
    },
    plugins: {
        SplashScreen: {
            launchShowDuration: 2000,
            backgroundColor: '#09090b', // zinc-950
            showSpinner: false,
        },
        StatusBar: {
            style: 'DARK',
            backgroundColor: '#09090b',
        },
    },
    ios: {
        contentInset: 'automatic',
        preferredContentMode: 'mobile',
        scheme: 'PeptiDex',
    },
    android: {
        backgroundColor: '#09090b',
    },
};

export default config;
