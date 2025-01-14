# Vendor Discovery App

A React Native mobile application built with Expo that helps users discover and interact with nearby vendors. The app features modern UI, real-time location-based search, and vendor information management.

## Features

- **Authentication**
  - Secure login system
  - Password management
  - Session handling

- **Vendor Discovery**
  - Location-based search using [`useLocation`](hooks/useLocation.ts)
  - Category filtering
  - Advanced search filters (rating, distance, open status)
  - Custom sorting options

- **User Interface**
  - Modern design with [NativeWind](tailwind.config.js)
  - Interactive vendor cards via [`VendorCard`](src/components/home/VendorCard.tsx)
  - Map integration using React Native Maps
  - Loading states and error handling

## Tech Stack

- Framework: [Expo](package.json) v52.0.25
- Language: TypeScript
- Styling: TailwindCSS/NativeWind
- Navigation: Expo Router
- Maps: React Native Maps
- Location Services: Expo Location

## Project Structure

```
├── app/                  # Application routes
│   ├── (auth)/          # Authentication screens
│   ├── _layout.tsx      # Root layout
│   └── home.tsx         # Main screen
├── src/
│   ├── api/             # API endpoints
│   ├── components/      # UI components
│   ├── context/         # Context providers
│   ├── data/           # Static data
│   ├── types/          # TypeScript types
│   └── utils/          # Helper functions
└── hooks/               # Custom React hooks
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npx expo start
```

## Development Commands

```bash
# Start the development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web
npm run web

# Run tests
npm test

# Run linting
npm run lint
```

## Environment Setup

1. Install Expo CLI:
```bash
npm install -g expo-cli
```

2. Install development dependencies:
```bash
npm install
```

3. Configure environment:
   - Follow [Expo's environment setup guide](https://docs.expo.dev/get-started/installation/)
   - Set up emulators/simulators as needed

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [NativeWind Documentation](https://www.nativewind.dev/)

## Contact
ANURAG SINGH
Project Link: [https://github.com/anurag121124/Vendor-app](https://github.com/anurag121124/Vendor-app)
