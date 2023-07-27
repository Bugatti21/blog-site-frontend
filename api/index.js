const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');
const bcrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');


const salt = bcrypt.genSaltSync(10);
const secret = 'art54ghy7ygyuy7t6tgrvb';   

app.use(cors({credentials:true,origin:'http://localhost:5173'}));
app.use(express.json());
app.use(cookieParser());

const uri = 'mongodb+srv://blog:mHlDoDglcURK1uvP@cluster0.ampyuu7.mongodb.net/?retryWrites=true&w=majority';


mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useUnifiedTopology: true,
})
.then(() => console.log("connected to DB"))
.catch(err => {
    console.error("failed to connect to DB:", err);
    process.exit(1);
});

app.post('/register', async (req, res) => {
    const {username,password} = req.body;
    console.log(username)
    console.log(User)
    const userDoc = await User.create({
        username, 
        password:bcrypt.hashSync(password, salt),
    });

    res.json(userDoc);
});


app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
      const userDoc = await User.findOne({ username });
  
      if (!userDoc) {
        // User not found
        res.status(400).json('User not found');
        return;
      }
  
      const passOk = bcrypt.compareSync(password, userDoc.password);
      if (passOk) {
        // Password matched, generate and send the JWT token
        jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
          if (err) {
            console.error('Error generating JWT:', err);
            res.status(500).json('Login failed');
            return;
          }
  
          // Set the JWT token in a cookie and send 'ok' response
          res.cookie('token', token).json('ok');
        });
      } else {
        // Password did not match
        res.status(400).json('Wrong credentials');
      }
    } catch (err) {
      // Handle any unexpected errors
      console.error('Error during login:', err);
      res.status(500).json('Login failed');
    }
  });

  app.get('/profile', (req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err,info) =>{
        if (err) throw err;
        res.json(info);
    });
  });

  app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok');
  });


  app.post('/post', uploadMiddleware.single('file'), async(req,res) => {
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path+'.'+ext;
    fs.renameSync(path, newPath);

    const {title,summary,content} = req.body;
    const postDoc = await Post.create({
        title,
        summary,
        content,
        cover:newPath,
    });

    res.json(postDoc);
  })

app.listen(5000);
//mHlDoDglcURK1uvP
//   mongodb+srv://blog:mHlDoDglcURK1uvP@cluster0.ampyuu7.mongodb.net/?retryWrites=true&w=majority

