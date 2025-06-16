import pool from "./server.js"
import e from "express";
import bodyParser from "body-parser";
import cors from "cors"
import path from "path"
import archiver from "archiver";
import multer from "multer";
import bcrypt from "bcryptjs"
import { configureSession } from "./statergy.js";
import passport from "passport";
import { readdirSync } from "fs"

const app = e();
const port = 5000;
const cport = 57087;
const saltRounds = 10;

configureSession(app);

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: `http://localhost:${cport}`, // Allow only your frontend
  credentials: true, // Allow credentials (cookies, authentication headers, etc.)
}));

let verifydocs = [];
app.use('/downloads', e.static(path.resolve('./downloads')));
app.use("/aifiles", e.static(path.resolve("./aifiles")));

// Sample Route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// API to Fetch All Templates from Database
app.get('/api/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM template');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching data', error);
    res.status(500).send('Server Error');
  }
});

// Get template details by ID including likes and downloads
app.get('/api/template/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT id, name, image_url, category, likes, downloads FROM template WHERE id = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Template not found' });
    }
    console.log(result.rows[0]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching template details', error);
    res.status(500).send('Server Error');
  }
});

// Update likes count
app.post('/api/template/like', async (req, res) => {
  try {
    const { id, action } = req.body;
    let query;
    
    if (action === 'like') {
      query = 'UPDATE template SET likes = likes + 1 WHERE id = $1 RETURNING likes';
    } else if (action === 'unlike') {
      query = 'UPDATE template SET likes = GREATEST(likes - 1, 0) WHERE id = $1 RETURNING likes';
    } else {
      return res.status(400).json({ message: 'Invalid action' });
    }
    
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Template not found' });
    }
    
    res.json({ likes: result.rows[0].likes });
  } catch (error) {
    console.error('Error updating likes', error);
    res.status(500).send('Server Error');
  }
});

// Update download count
app.post('/api/template/download', async (req, res) => {
  try {
    const { id } = req.body;
    const result = await pool.query(
      'UPDATE template SET downloads = downloads + 1 WHERE id = $1 RETURNING downloads',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Template not found' });
    }
    
    res.json({ downloads: result.rows[0].downloads });
  } catch (error) {
    console.error('Error updating downloads', error);
    res.status(500).send('Server Error');
  }
});

// Get HTML icons
app.get("/icondata-html", async(req, res) => {
  try {
    const result = await pool.query('SELECT * FROM htmlicon');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching data', error);
    res.status(500).send('Server Error');
  }
});

// Get React icons
app.get("/icondata-react", async(req, res) => {
  try {
    const result = await pool.query('SELECT * FROM reacticon');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching data', error);
    res.status(500).send('Server Error');
  }
});

// Live page preview
app.post("/livepage", (req, res) => {
  try {
    const directoryPath = path.resolve("./downloads/");
    const files = readdirSync(directoryPath).filter(file => {
      if(file === "NiceAdmin") {
        return req.body.name.includes("Nice Admin");
      }
      return req.body.name.includes(file);
    });
    
    if (files.length === 0) {
      return res.status(404).json({ error: "Template files not found" });
    }
    
    const filePath = path.join(directoryPath, files[0], "index.html");
    res.json({ url: `http://localhost:5000${filePath.replace(path.resolve('.'), '')}` });
  } catch (error) {
    console.error("Error in live page preview:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get components
app.get("/getcomponents", async(req, res) => {
  try {
    const result = await pool.query('SELECT * FROM component');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching data', error);
    res.status(500).send('Server Error');
  }
});

// Download template files
app.post("/download", async(req, res) => {
  try {
    // First update the download count in the database if template ID is provided
    if (req.body.id) {
      await pool.query(
        'UPDATE template SET downloads = downloads + 1 WHERE id = $1',
        [req.body.id]
      );
    }
    
    // Then proceed with the download
    const directoryPath = path.resolve("./downloads/");
    const folder = readdirSync(directoryPath).filter(file => {
      if(file === "NiceAdmin") {
        return req.body.name.includes("Nice Admin");
      }
      return req.body.name.includes(file);
    });
    
    if (folder.length === 0) {
      return res.status(404).json({ error: "Template folder not found" });
    }
    
    const folderPath = path.join(directoryPath, folder[0]);
    console.log("Preparing download for:", folderPath);
    
    const archive = archiver("zip", {zlib: {level: 9}});
    res.attachment(`${req.body.name}.zip`);
    
    archive.on('error', (err) => {
      res.status(500).send({ error: "Error creating archive" });
      throw err;
    });
    
    archive.pipe(res);
    archive.directory(folderPath, false);
    archive.finalize();
  } catch (error) {
    console.error('Error processing download:', error);
    if (!res.headersSent) {
      res.status(500).send('Server Error');
    }
  }
});

// Document verification routes
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post("/verify-document", upload.array("file"), (req, res) => {
  try {
    console.log(req.body.path);
    const userid = req.user ? req.user.id : 1; // Use authenticated user ID if available
    const parsedPath = JSON.parse(req.body.path);
    verifydocs.push({[userid]: {name: req.body.name, path: parsedPath, files: req.files}});
    console.log(verifydocs);
    res.status(200).json({ message: "Verification request submitted successfully." });
  } catch (error) {
    console.error("Error in document verification:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/verify-document", (req, res) => {
  try {
    res.status(200).json(verifydocs);
  } catch (error) {
    console.error("Error retrieving verification documents:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// React file upload configuration
const reactstorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "aifiles/reactfiles");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const reactupload = multer({storage: reactstorage});

app.post("/getaireactfiles", reactupload.array("files", 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No files uploaded' });
  }
  console.log(req.files);

  const uploadedFiles = req.files.map((file) => ({
    filename: file.filename,
    filePath: `/aifiles/reactfiles/${file.filename}`,
  }));

  res.json({ message: 'Files uploaded successfully', files: uploadedFiles });
});

// HTML file upload configuration
const htmlstorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "aifiles/htmlfiles");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const htmlupload = multer({storage: htmlstorage});

app.post("/getaihtmlfiles", htmlupload.array("files", 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No files uploaded' });
  }

  const uploadedFiles = req.files.map((file) => ({
    filename: file.filename,
    filePath: `/aifiles/htmlfiles/${file.filename}`,
  }));

  res.json({ message: 'Files uploaded successfully', files: uploadedFiles });
});

// Download React files
app.get("/downloadreactfiles", (req, res) => {
  try {
    const directoryPath = path.resolve("./aifiles/");
    const folder = readdirSync(directoryPath).filter(file => 
      file.includes("react")
    );
    
    if (folder.length === 0) {
      return res.status(404).json({ error: "React files folder not found" });
    }
    
    const folderPath = path.join(directoryPath, folder[0]);
    console.log("Preparing download for React files:", folderPath);
    
    const archive = archiver("zip", {zlib: {level: 9}});
    res.attachment('reactfiles.zip');
    
    archive.on('error', (err) => {
      res.status(500).send({ error: "Error creating archive" });
      throw err;
    });
    
    archive.pipe(res);
    archive.directory(folderPath, false);
    archive.finalize();
  } catch (error) {
    console.error('Error downloading React files:', error);
    if (!res.headersSent) {
      res.status(500).send('Server Error');
    }
  }
});

// Download HTML files
app.get("/downloadhtmlfiles", (req, res) => {
  try {
    const directoryPath = path.resolve("./aifiles/");
    const folder = readdirSync(directoryPath).filter(file => 
      file.includes("html")
    );
    
    if (folder.length === 0) {
      return res.status(404).json({ error: "HTML files folder not found" });
    }
    
    const folderPath = path.join(directoryPath, folder[0]);
    console.log("Preparing download for HTML files:", folderPath);
    
    const archive = archiver("zip", {zlib: {level: 9}});
    res.attachment('htmlfiles.zip');
    
    archive.on('error', (err) => {
      res.status(500).send({ error: "Error creating archive" });
      throw err;
    });
    
    archive.pipe(res);
    archive.directory(folderPath, false);
    archive.finalize();
  } catch (error) {
    console.error('Error downloading HTML files:', error);
    if (!res.headersSent) {
      res.status(500).send('Server Error');
    }
  }
});

// Authentication routes
app.post("/login", passport.authenticate("local"), async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "User not found. Please register." });
    }

    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ success: false, message: "Incorrect password." });
    }

    res.status(200).json({ success: true, message: "Login successful!", user: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error logging in." });
  }
});

app.post("/register", async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // Check if email already exists in users table
    const checkResult = await pool.query(
      "SELECT * FROM users WHERE email = $1", 
      [email]
    );

    if (checkResult.rows.length > 0) {
      return res.status(400).json({ 
        success: false, 
        message: "Email already exists. Try logging in." 
      });
    }

    // Hash password for local strategy
    const hash = await bcrypt.hash(password, saltRounds);
    
    // Insert new user with local strategy credentials
    const result = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hash]
    );

    const user = result.rows[0];

    // Automatically log in the user after registration using passport
    req.login(user, (err) => {
      if (err) {
        console.error('Login error after registration:', err);
        return res.status(500).json({ 
          success: false, 
          message: "Error logging in after registration." 
        });
      }
      res.status(201).json({ 
        success: true, 
        message: "Registration successful!", 
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      });
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ 
      success: false, 
      message: "Error registering user." 
    });
  }
});

// OAuth routes
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/auth/google/callback", 
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect(`http://localhost:${cport}/`); // Redirect after successful login
  }
);

app.get("/auth/github", passport.authenticate("github", { scope: ["user:email"] }));

app.get("/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect(`http://localhost:${cport}/`);
  }
);

// User authentication check
app.get("/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

// Logout route
app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: "Logout error" });
    res.json({ success: true, message: "Logged out!" });
  });
});

// User likes tracking - store which templates a user has liked
app.post('/api/user/likes', async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: 'You must be logged in to track likes' });
    }
    
    const { templateId, action } = req.body;
    const userId = req.user.id;
    
    if (action === 'like') {
      // Check if like already exists
      const checkResult = await pool.query(
        'SELECT * FROM user_likes WHERE user_id = $1 AND template_id = $2',
        [userId, templateId]
      );
      
      if (checkResult.rows.length === 0) {
        // Insert new like
        await pool.query(
          'INSERT INTO user_likes (user_id, template_id) VALUES ($1, $2)',
          [userId, templateId]
        );
      }
    } else if (action === 'unlike') {
      // Remove like
      await pool.query(
        'DELETE FROM user_likes WHERE user_id = $1 AND template_id = $2',
        [userId, templateId]
      );
    }
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error tracking user like:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's liked templates
app.get('/api/user/likes', async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: 'You must be logged in to view liked templates' });
    }
    
    const userId = req.user.id;
    const result = await pool.query(
      'SELECT t.* FROM template t JOIN user_likes ul ON t.id = ul.template_id WHERE ul.user_id = $1',
      [userId]
    );
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching user likes:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Check if user has liked a specific template
app.get('/api/user/likes/:templateId', async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.json({ liked: false });
    }
    
    const userId = req.user.id;
    const { templateId } = req.params;
    
    const result = await pool.query(
      'SELECT * FROM user_likes WHERE user_id = $1 AND template_id = $2',
      [userId, templateId]
    );
    
    res.json({ liked: result.rows.length > 0 });
  } catch (error) {
    console.error('Error checking template like status:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});