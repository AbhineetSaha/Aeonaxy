import express from 'express';
import cors from 'cors';
import { supabase } from './lib/supabaseClient.js';
import { resend } from './lib/resend.js';

const app = express();

app.use(cors());
app.use(express.static("public"));

app.get(`/api/fetchEmail`, async (req, res) => {
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

app.get('/api/pushData', async (req, res) => {
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
})

app.get('/api/getUsernames', async (req, res) => {
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
})

app.get('/api/pushRole', async (req, res) => {
    const u_username = req.query.username;
    const u_role = req.query.role;
    const { data, error } = await supabase.from('role').insert([{user:u_username,role:u_role}]);
    if (error){
        res.send(error);
    }else{
        res.sendStatus(200);
    }
})

app.get('/api/pushProfile', async (req, res) => {
    const u_username = req.query.username;
    const u_location = req.query.location;
    const u_photo = req.query.photo;
    const { data, error } = await supabase.from('profile').insert([{user:u_username,location:u_location,photo:u_photo}]);
    if (error){
        res.send(error);
    }else{
        res.sendStatus(200);
    }
})

app.get('/api/getEmail', async(req, res) => {
    const u_username = req.query.username;
    const { data, error } = await supabase.from('user').select('email').eq('username', u_username);
    res.send(data[0].email);
})

app.get('/api/verification', async (req, res) => {
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
})
app.listen(3001, () => {
    console.log('server started');
});