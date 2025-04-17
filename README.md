File Task App - README
API Mocking Choice
For this project, I chose to mock the API using a local mock implementation, which simulates the behavior of the actual API. This approach was chosen for the following reasons:

Faster Development: Mocking the API allowed for quick iteration without waiting for the actual API to be built or integrated.

Simplification: Since the app primarily focuses on the frontend aspects (file uploading, task management), mocking the backend allowed me to focus on user interface development and task handling logic.

Controlled Environment: By mocking the API, I could simulate various scenarios (e.g., success, failure, and cancellation) to test the application’s behavior and handling of different states without needing a real server or network calls.

The mock implementation is handled using simple JavaScript objects and functions that simulate the behavior of an actual API.

AI Tool Usage
I did not use any AI tools in the development of this project. However, I used standard web development best practices, libraries like React, and other JavaScript/TypeScript utilities to speed up the development process. If I had used an AI tool, I would likely have used it for:

Code Suggestions: For improving code quality and suggesting better approaches for implementing certain features.

Testing: AI could potentially have assisted in generating test cases for ensuring the robustness of the application.

Tradeoffs and Shortcuts
Here are some of the tradeoffs and shortcuts I made during the development:

Mock API: By using a mock API, I bypassed the need to set up a full backend with actual database connections or integrate with a real API service. While this saved time, it means that the application won't handle real data, and the backend logic is simplified.

Minimal Validation: Input validation (e.g., for file size and type) was kept simple. The file upload checks for basic file types (PDF and images) and a size limit of 2MB. More complex validation could have been added to cover additional file types or stricter file handling rules.

No Persistent Data: Since the app only uses a mock API, there’s no persistent data storage (such as a real database). Data is lost when the page is refreshed, which would need to be addressed in a production-level application.

Improvements or Additions with More Time
If I had more time to continue developing this project, I would focus on the following improvements:

Real API Integration: Replace the mock API with a real backend service to handle file uploads, status updates, and data persistence.

File Preview and Upload Progress: Implement a file preview feature and display upload progress to improve user experience.

Authentication and User Roles: Add user authentication (e.g., using JWT or OAuth) to manage different roles (admin, user, etc.) and restrict certain functionalities based on the role.

Error Handling and Edge Cases: Add more comprehensive error handling to cover edge cases such as network issues, server errors, or corrupted files during upload.

Styling and UI Enhancements: Further enhance the UI with animations, better feedback for user actions, and responsive design to ensure the app works well on mobile devices.

Trickiest Part and Debugging
The trickiest part of the development was ensuring that the file upload and task management functionality worked smoothly, especially when dealing with the file size limits and different file types. Handling edge cases (such as what happens when the user uploads a file that exceeds the size limit or is in an unsupported format) required careful testing and debugging.

To debug this, I followed these steps:

Console Logging: I used console logs at various stages of the file upload process to understand the flow and pinpoint where things were going wrong.

Testing with Different Files: I tested with a variety of file types and sizes to simulate real-world scenarios and ensure the app’s validation logic worked correctly.

Using DevTools: Chrome’s Developer Tools helped track network requests and catch any issues related to file uploads or API calls.

By isolating and testing each part of the functionality, I was able to ensure that the app handles various scenarios as expected.