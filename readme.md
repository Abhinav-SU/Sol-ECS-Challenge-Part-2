# QR Code Grading System

This is a React-based QR Code Grading System that allows users to log in, assign a grade, and modify their scores. The system stores user credentials and grades in local storage and provides a QR code for easy access.

## Features
- User authentication (predefined users stored in local storage)
- Grade submission and modification (range: 0-10)
- Data persistence using local storage
- QR code generation for easy access
- Basic UI styling

## Prerequisites
- A modern web browser (Chrome, Firefox, Edge, etc.)
- An active internet connection

## Running the Application (CodeSandbox)
1. Open the application in your browser:
   - [QR Code Grading System](https://pzxs99.csb.app/)
   - [QR Code Page](https://pzxs99.csb.app/qrcode)
2. Log in using one of the predefined users:
   - Email: `user1@example.com`, Password: `password123`
   - Email: `user2@example.com`, Password: `password456`
3. Enter a grade (0-10) and submit.
4. Modify the grade if needed.
5. Scan the QR code (`/qrcode`) to access the grading system on another device.
6. Log out to return to the login screen.

## Development (If Forking the CodeSandbox Project)
1. Open the CodeSandbox link: [Project URL](https://pzxs99.csb.app/)
2. Click **Fork** to create your own instance.
3. Modify the code directly within CodeSandbox.
4. Changes will be reflected instantly.

## Troubleshooting
- If the page does not load correctly, try clearing local storage by opening developer tools (F12) and running `localStorage.clear();` in the console.
- Ensure that the correct URL is used when accessing the application.

## License
This project is open-source and available under the MIT License.

