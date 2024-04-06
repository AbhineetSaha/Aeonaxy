var express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const { createClient } = require("@supabase/supabase-js");
const { Resend } = require('resend');
const serverless = require('serverless-http');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const resend = new Resend(process.env.RESEND_KEY);

app.use(cors());

app.get('/', function(req, res, next) {
    res.send("Working");
});
  
app.get(`/fetchEmail`, async (req, res) => {
    const { username } = req.query;
    try {
        const { data, error } = await supabase.from('user').select('email').eq('username', username);
        if (error) throw error;
        res.json(data);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});
  
app.get('/pushData', async (req, res) => {
    const u_email = req.query.email;
    const u_name = req.query.name;
    const u_password = req.query.password;
    const u_username = req.query.username;
    const { data, error } = await supabase.from('user').insert([{name: u_name, username: u_username, email: u_email, password: u_password}]);
    if (error){
        res.send(error);
    }else{
        res.sendStatus(200);
    }
});
  
app.get('/getUsernames', async (req, res) => {
    try {
        const { data, error } = await supabase.from('user').select('username');
        if (error) throw error;
        var temp = [];
        for (var i = 0; i < data.length; i++){
            temp.push(data[i].username);
        }
        res.send(temp);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});
  
app.get('/pushRole', async (req, res) => {
    const u_username = req.query.username;
    const u_role = req.query.role;
    const { data, error } = await supabase.from('role').insert([{user:u_username,role:u_role}]);
    if (error){
        res.send(error);
    }else{
        res.sendStatus(200);
    }
});
  
app.get('/pushProfile', async (req, res) => {
    const u_username = req.query.username;
    const u_location = req.query.location;
    const u_photo = req.query.photo;
    const { data, error } = await supabase.from('profile').insert([{user:u_username,location:u_location,photo:u_photo}]);
    if (error){
        res.send(error);
    }else{
        res.sendStatus(200);
    }
});
  
app.get('/getEmail', async(req, res) => {
    const u_username = req.query.username;
    const { data, error } = await supabase.from('user').select('email').eq('username', u_username);
    res.send(data[0].email);
});
  
app.get('/verification', async (req, res) => {
    const email = req.query.email;
    const user = req.query.user;
    console.log(email);
    const { data, error } = await resend.emails.send({
        from: "Project <project@abhineet-saha.tech>",
        to: [email],
        subject: "Verification",
        html: `Hello ${user}, Welcome to Aeonaxy!`
    });
    if (error) {
        console.log(error);
    }else {
        res.send(email);
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports.handler = serverless(app);