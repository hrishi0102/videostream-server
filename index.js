import express from "express";
import cors from "cors";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";
import { exec } from "child_process";
import { error } from "console";
import { stderr, stdout } from "process";

const app = express();

//multer (for handling files) middleware
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + uuidv4() + path.extname(file.originalname));
  },
});
//multer config
const upload = multer({ storage: storage });

// cors middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serve static files from a server
app.use("/uploads", express.static("uploads"));

//Routes
app.get("/", (req, res) => {
  res.json({ message: "hello" });
});

// Define a POST route for uploading a video file
app.post("/upload", upload.single("file"), (req, res) => {
  // Generate a unique identifier for the uploaded video
  const lessonId = uuidv4();

  // Path to the uploaded video file
  const videoPath = req.file.path;

  // Directory where the converted HLS files will be stored
  const outputPath = `./uploads/courses/${lessonId}`;

  // Path to the HLS master playlist file
  const hlsPath = `${outputPath}/index.m3u8`;
  console.log("hls path: ", hlsPath);

  // Check if the output directory exists, if not, create it
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }

  // Command to convert the video to HLS format using ffmpeg
  const ffmpegCommand = `ffmpeg -i ${videoPath} -codec:v libx264 -codec:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${outputPath}/segment%03d.ts" -start_number 0 ${hlsPath}`;

  // Execute the ffmpeg command to convert the video
  // Note: In production, use a queue to handle the conversion process
  exec(ffmpegCommand, (error, stdout, stderr) => {
    if (error) {
      console.log(`exec error: ${error}`);
      return;
    }

    // Log the standard output and error from the ffmpeg command
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);

    // URL to access the converted HLS video
    const videoUrl = `http://localhost:3000/uploads/courses/${lessonId}/index.m3u8`;

    // Send a JSON response with the conversion result
    res.json({
      message: "Video converted to HLS format",
      videoUrl: videoUrl,
      lessonId: lessonId,
    });
  });
});

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
