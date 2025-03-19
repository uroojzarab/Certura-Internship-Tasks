export const uploadFile = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded!" });
    }

    res.json({
      message: "File uploaded successfully",
      file: req.file,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFile = (req, res) => {
  try {
    const filePath = path.join(__dirname, "../../uploads", req.params.filename);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File not found!" });
    }

    // Send the file
    res.sendFile(filePath);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
