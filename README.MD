start project
- expo init cherry-go
- expo install @react-native-community/netinfo @expo-google-fonts/archivo @expo-google-fonts/inter expo-font expo-app-loading expo-image-picker react-native-svg
- yarn add @hookform/resolvers @nozbe/watermelondb @react-navigation/bottom-tabs @react-navigation/native @react-navigation/stack axios date-fns lottie-react-native react-hook-form react-native-calendars react-native-fast-image react-native-iphone-x-helper react-native-responsive-fontsize react-native-safe-area-context react-native-screens styled-components yup
- copy devDependency:
  ```json
    "@babel/core": "^7.9.0",
    "@babel/plugin-proposal-decorators": "^7.15.4",
    "@types/jest": "^27.0.1",
    "@types/react": "~16.9.35",
    "@types/react-native": "~0.63.2",
    "@types/react-native-calendars": "^1.1264.2",
    "@types/styled-components-react-native": "^5.1.1",
    "@typescript-eslint/eslint-plugin": "^2.27.0",
    "@typescript-eslint/parser": "^2.27.0",
    "eslint": "^7.31.0",
    "eslint-config-airbnb": "^18.2.1",
    "eslint-config-next": "11.0.1",
    "eslint-config-prettier": "^8.3.0",
    "eslint-import-resolver-typescript": "^2.4.0",
    "eslint-plugin-import": "^2.23.4",
    "eslint-plugin-jest-dom": "^3.9.0",
    "eslint-plugin-json": "^3.1.0",
    "eslint-plugin-jsx-a11y": "^6.4.1",
    "eslint-plugin-prettier": "^3.4.0",
    "eslint-plugin-react": "^7.24.0",
    "eslint-plugin-react-hooks": "^4.2.0",
    "eslint-plugin-testing-library": "^4.10.1",
    "jest-expo": "^42.1.0",
    "jest-styled-components": "^7.0.5",
    "prettier": "^2.3.2",
    "react-native-svg-transformer": "^0.14.3",
    "react-test-renderer": "^17.0.2",
    "ts-jest": "^27.0.5",
    "ts-node": "^10.2.1"
  ```
- copy:
  - .editorconfig
  - .eslintrc.json
  - .gitignore
  - app.json
  - babel.config.js
  - jest.config.ts
  - prettier.config.js
  - metro.config.js

run project android
```powershell
  cd android;./gradlew clean;cd ..;npx react-native run-android;yarn start
```
run open ports
adb reverse:
```powershell
adb reverse tcp:3333 tcp:3333
```
adb connect your device
```powershell
  adb reverse tcp:8081 tcp:5555
  adb connect YOUR.PHONE.IP.ADDRESS:5555
```
run connections
```powershell
adb kill-server && adb start-server
```

deeplinking -flag <android | ios>
```powershell
npx uri-scheme open cherry-go://app/splash/123 --android
```
