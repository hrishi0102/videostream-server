# Video HLS Conversion and Streaming Service

This project is a video streaming service built with Node.js and Express. It allows users to upload videos, which are then converted to HLS (HTTP Live Streaming) format using ffmpeg. The converted videos can be streamed through a frontend interface.

## Video is streamed in Segments

![Demo](https://github.com/hrishi0102/videostream-server/assets/97527878/78dc0293-d1ae-45ac-b9ac-7de03026ea22)

## Features

- **File Upload**: Users can upload video files.
- **Video Conversion**: Uploaded videos are converted to HLS format.
- **Static File Serving**: Converted videos are served as static files.

## Prerequisites

- Node.js
- FFmpeg

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/hrishi0102/videostream-server.git
   cd your-repo
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Ensure FFmpeg is installed and available in your system's PATH.

## Usage

1. Start the server:

   ```bash
   npm start
   ```

2. The server will be running at `http://localhost:8000`.

3. Endpoints:
   - `GET /`: Returns a welcome message.
   - `POST /upload`: Upload a video file for conversion. The form field name should be `file`.

## Example Request

To upload a file, send a POST request to `http://localhost:8000/upload` with the video file in the `file` form field. The server will respond with a JSON object containing the URL of the converted HLS video.

## Code Overview

### Dependencies

- **express**: Web framework for Node.js.
- **cors**: Middleware for enabling Cross-Origin Resource Sharing.
- **multer**: Middleware for handling `multipart/form-data` for file uploads.
- **uuid**: Utility for generating unique IDs.
- **path**: Utility for working with file and directory paths.
- **fs**: File system module for interacting with the file system.
- **child_process**: Module for executing shell commands.

### Middleware

- **CORS**: Configured to allow requests from `http://localhost:3000` and `http://localhost:5173`.
- **multer**: Configured to store uploaded files in the `./uploads` directory with unique filenames.
- **Static File Serving**: Serves files from the `./uploads` directory.

### Routes

- **POST /upload**: Handles file uploads and initiates the FFmpeg conversion process.

### Video Conversion

- **FFmpeg Command**: Converts the uploaded video to HLS format.

  ```bash
  ffmpeg -i {videoPath} -codec:v libx264 -codec:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename "{outputPath}/segment%03d.ts" -start_number 0 {hlsPath}

  ```

### License

This project is licensed under the MIT License. See the LICENSE file for details.

Feel free to contribute to the project by submitting issues or pull requests.

###Contact
For any questions or suggestions, please open an issue or contact me at hrishi0102@business.com.
