const fs = require("fs")
const path = require("path")

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(process.cwd(), "public", "uploads")

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
  console.log("Created uploads directory")
} else {
  console.log("Uploads directory already exists")
}
