# Sphynx Task Organizer Native

A React Native mobile application for managing tasks with AWS backend integration (Cognito, API Gateway, Lambda, DynamoDB).

## Features

- **Task Management**: Create, read, update, and delete tasks
- **Task Statistics**: Track total tasks, completed tasks, upcoming tasks, and overall progress
- **User Authentication**: AWS Cognito integration for secure login and session management
- **Responsive UI**: Material Design-inspired interface optimized for mobile devices
- **Bottom Tab Navigation**: Easy navigation between Home, Tasks, and Settings screens
- **Local Persistence**: AsyncStorage for offline support

## Prerequisites

- Node.js >= 20
- npm or yarn
- React Native development environment setup ([follow guide](https://reactnative.dev/docs/set-up-your-environment))
- Android Studio (for Android) or Xcode (for iOS)
- AWS account with:
  - Cognito User Pool configured
  - API Gateway + Lambda functions for task CRUD operations
  - DynamoDB table for task storage

## Installation

1. **Clone and install dependencies**:
```sh
npm install
```

2. **Configure AWS credentials**:
   - Copy `.env.example` to `.env`
   - Fill in your AWS configuration values:
     - `REACT_APP_REGION`: Your AWS region
     - `REACT_APP_USER_POOL_ID`: Your Cognito User Pool ID
     - `REACT_APP_USER_POOL_CLIENT_ID`: Your Cognito Client ID
     - `REACT_APP_API_ENDPOINT`: Your API Gateway endpoint

3. **Install native dependencies** (iOS only):
```sh
cd ios
bundle install
bundle exec pod install
cd ..
```

## Development

### Start Metro bundler:
```sh
npm start
```

### Run on Android:
```sh
npm run android
```

### Run on iOS:
```sh
npm run ios
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx
│   ├── StatCard.tsx
│   └── index.ts
├── screens/            # App screens
│   ├── HomeScreen.tsx
│   ├── TasksScreen.tsx
│   └── SettingsScreen.tsx
├── context/            # React Context for state management
│   └── AppContext.tsx
├── services/           # API services
│   └── TaskAPIService.ts
├── navigation/         # Navigation configuration
│   └── NavigationStack.tsx
└── config/             # Configuration files
    └── awsConfig.ts
```

## API Integration

The app connects to your AWS Lambda functions via API Gateway:

- `GET /tasks` - Fetch all user tasks
- `POST /tasks` - Create a new task
- `PUT /tasks/{taskId}` - Update a task
- `DELETE /tasks/{taskId}` - Delete a task
- `GET /tasks/stats` - Fetch task statistics

Ensure your Lambda functions return data in the expected format and that API Gateway is properly configured with CORS headers.

## Testing

```sh
npm test
```

## Troubleshooting

- **Metro cache issues**: Run `npm start -- --reset-cache`
- **Build failures**: Try `npm install` again and `bundle exec pod install` (iOS)
- **AWS configuration**: Verify `.env` file has correct credentials
- **Network errors**: Ensure API Gateway endpoint is accessible and properly configured

## Learn More

- [React Native Documentation](https://reactnative.dev)
- [AWS Amplify Documentation](https://docs.amplify.aws)
- [AWS Cognito Documentation](https://docs.aws.amazon.com/cognito/)
