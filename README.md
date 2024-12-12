# Patient Management Mobile App

A React Native mobile application built with Expo for managing patient records. The app provides functionality to view, create, edit, and search patient information with a clean and intuitive user interface.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Design Decisions](#design-decisions)
- [Technologies & Libraries](#technologies--libraries)
- [Troubleshooting](#troubleshooting)


## Prerequisites

Before running the application, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Expo CLI**:
  ```bash
  npm install -g expo-cli
  ```
- **Expo Go** app on your mobile device (for testing)

## Installation

1. Clone the repository:
   ```bash
   git clone [disclaimer]
   cd [disclaimer]
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Set up environment variables:
   - Create a `.env` file in the root directory and add:
     ```
     EXPO_PUBLIC_API_URL=your_api_url_here
     ```

## Running the Application

1. Start the development server:
   ```bash
   npm start
   ```
2. Run on different platforms:
   - **iOS:** Press `i` in the terminal or click "Run on iOS simulator"
   - **Android:** Press `a` in the terminal or click "Run on Android device/emulator"
3. Testing on a physical device:
   - Scan the QR code using the Expo Go app
   - Ensure your device is on the same network as your development machine

## Project Structure

```plaintext
├── app/               # Main application screens and navigation
│   ├── (patients)/    # Patient-related screens
│   ├── layout.tsx     # Root layout configuration
│   └── +not-found.tsx # 404 error page
├── components/        # Reusable UI components
│   ├── Card.tsx       # Patient card component
│   ├── CustomText.tsx # Custom text component
│   ├── FAB.tsx        # Floating action button
│   ├── Header.tsx     # App header component
│   ├── Input.tsx      # Custom input component
│   └── PatientModal.tsx # Patient creation/editing modal
├── constants/         # App-wide constants
│   └── Colors.ts      # Color definitions
├── services/          # API and external service integrations
│   ├── PatientsApi.ts # Patient API service
│   └── types.ts       # TypeScript interfaces
├── store/             # State management
│   └── usePatientsStore.ts # Zustand store for patients
└── utils/             # Utility functions
    └── utils.ts       # Helper functions
```

## Design Decisions

### Architecture
- **Expo Framework:** Chosen for rapid development and easy deployment
- **File-based Routing:** Using Expo Router for intuitive navigation structure
- **Component-Based Architecture:** Modular components for better maintainability

### State Management
- **Zustand:** Selected for its simplicity and minimal boilerplate compared to Redux
- **Local State:** Using React's `useState` for component-level state management

### UI/UX
- **Custom Components:** Reusable components like `Card`, `Header`, and `Modal`
- **Error Handling:** Toast notifications for user feedback

## Technologies & Libraries

### Core
- **Expo**  Framework for universal React applications
- **React**  UI library
- **React Native**  Mobile application framework
- **TypeScript**  Static typing for better development experience

### Navigation & Routing
- **Expo Router**  File-based routing system

### State Management
- **Zustand**  Lightweight state management solution

### UI Components
- **@expo/vector-icons**  Icon library
- **react-native-element-dropdown**  Dropdown component
- **react-native-toast-message**  Toast notifications

### API Integration
- **Axios**  HTTP client for API requests

### Form Handling & Validation
- **Zod**  Schema validation

### Image Handling
- **expo-image-picker**  Image selection functionality

### Development Tools
- **ESLint**  Code linting
- **Prettier**  Code formatting

## API Data Enhancement

The application receives basic patient data from the API and enhances it with additional information for a better user experience.

### Base API Response
```typescript
interface Patient {
  name: string;
  id: string;
  website: string;
  createdAt: string;
  description: string;
  avatar: string;
}
```

### Enhanced Patient Data
The application enriches the API data with additional fields:

```typescript
interface EnrichedPatient extends Patient {
  age: number;        // Randomly generated between 18-90
  gender: string;     // Selected from: "Male", "Female", "Other"
  email: string;      // Generated based on patient name
  phone: string;      // Generated phone number
  address: string;    // Generated street address
  
}
```

### Data Enhancement Strategy
- **Age Generation**: Realistic age range for patients (18-90 years)
- **Gender Assignment**: Randomly assigned from predefined options
- **Contact Information**: 
  - Generated email following a consistent pattern
  - Formatted phone numbers
  - Realistic street addresses
- **Media Handling**: 
  - User-uploaded photos with fallback mechanisms

This enhancement strategy allows for:
- More comprehensive patient profiles
- Better UI/UX with complete information
- Realistic data representation

## Troubleshooting

### Common Issues
- **Metro Bundler Issues:** Restart the bundler with `expo start -c`
- **Dependencies Issues:** Ensure all dependencies are installed correctly
- **Environment Variables Not Loading:**
  - Ensure `.env` file is in the root directory
  - Restart the development server
  - Check if variables are prefixed with `EXPO_PUBLIC_`

### Development Tips
- Use the Expo Go app for quick testing on physical devices
- Enable developer tools on your device for better debugging
- Refer to the [Expo documentation](https://docs.expo.dev/) for platform-specific issues
