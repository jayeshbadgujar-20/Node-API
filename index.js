const express = require('express');
const mongoose = require('mongoose');


const app = express();

const db = mongoose.connect(`mongodb+srv://jayubadgujar123:jayubadgujar123@jayu.ynhyhjy.mongodb.net/`)

    .then(() => {
        console.log("Connection Created")
    })
    .catch((err) => {
        console.log(`There will be some error ${err}`)
    }) 


const studentSchema = new mongoose.Schema({
    FirstName: String,
    LastName: String,
    EmailID: String,
    MobNo: Number,
    Class: String,
    Address: String,
    RollNo: Number,
    BloodG: String,
    DOB: String,
});
const Student = mongoose.model('Student', studentSchema);


app.get('/students', async (req, res) => {
    const students = await Student.find();
    res.json(students);
});

app.post('/students', async (req, res) => {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json(newStudent);
});

app.put('/students/:id', async (req, res) => {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.json(updatedStudent);
});

app.delete('/students/:id', async (req, res) => {

    try {
      const deletedStudent = await Student.findByIdAndDelete(req.params.id);
      if (!deletedStudent) {
        return res.status(404).json({ error: 'Student not found' });
      }
      res.json({ message: 'Student deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
    res.status(204).send();
});

app.delete('/students/:id', async (req, res) => {
    try {
      const deletedStudent = await Student.findByIdAndDelete(req.params.id);
      if (!deletedStudent) {
        return res.status(404).json({ error: 'Student not found' });
      }
      res.json({ message: 'Student deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

app.listen(3000);
