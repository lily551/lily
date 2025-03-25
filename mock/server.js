import fs from 'fs';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';


// Initialize the Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Read the JSON data from the file
const rawData = fs.readFileSync('data.json');
const data = JSON.parse(rawData);

const readData = () => {
  const rawData = fs.readFileSync('data.json');
  return JSON.parse(rawData);
};

// Function to save data.json
const saveData = (data) => {
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
};

// **GET request**: Get class details by classId
app.get('/api/RegularFacultyAllocation/:classId', (req, res) => {
  const { classId } = req.params;
  const data = readData();
  const classDetails = data.RegularClassData.find((cls) => cls.classId === classId);

  if (!classDetails) {
    return res.status(404).json({ message: 'Class not found' });
  }
  res.json(classDetails);
});

// **POST request**: Add faculty to a subject in a class
app.post('/api/RegularFacultyAllocation/:classId/:subjectId/:teachingMode', (req, res) => {
  const { classId, subjectId, teachingMode } = req.params;
  const { internalFacultyId, internalFacultyName, facultyPhoto } = req.body; 

  const data = readData();
  const classDetails = data.RegularClassData.find((cls) => cls.classId === classId);
  
  if (!classDetails) {
    return res.status(404).json({ message: 'Class not found' });
  }

  const subject = classDetails.subjectList.find((sub) => sub.subjectId == subjectId && sub.teachingMode == teachingMode);
  console.log("ye dekho mere subject me kya hai", subject);

  if (!subject) {
    return res.status(404).json({ message: 'Subject not found' });
  }

  // Check if faculty is already assigned
  if (subject.facultyList.some((faculty) => faculty.internalFacultyId === internalFacultyId)) {
    return res.status(400).json({ message: 'Faculty already assigned to this subject' });
  }

  // ✅ Add new faculty with facultyPhoto and default allocation status = 0
  subject.facultyList.push({ 
    internalFacultyId, 
    internalFacultyName, 
    facultyPhoto, 
    facultyAllocationStatus: 0 
  });
  
  saveData(data);

  res.status(201).json({ message: 'Faculty added successfully', subject });
});

// **PUT request**: Update facultyAllocationStatus to 1 for all faculties in a class
app.put('/api/RegularFacultyAllocation/:classId', (req, res) => {
  const { classId } = req.params;
  const data = readData();
  const classDetails = data.RegularClassData.find((cls) => cls.classId === classId);

  if (!classDetails) {
    return res.status(404).json({ message: 'Class not found' });
  }

  // Set facultyAllocationStatus to 1 for all faculties in the class
  classDetails.subjectList.forEach((subject) => {
    subject.facultyList.forEach((faculty) => {
      faculty.facultyAllocationStatus = 1;
    });
  });

  saveData(data);
  res.json({ message: 'All faculty allocation statuses updated to 1', classDetails });
});

// **PUT request**: Update facultyAllocationStatus to 1 for a given faculty in a class
app.put('/api/RegularFacultyAllocation/:classId/:subjectId/:teachingMode/:internalFacultyId', (req, res) => { 
  const { classId, subjectId, teachingMode, internalFacultyId } = req.params;
  const data = readData();

  // Find the class by classId
  const classDetails = data.RegularClassData.find((cls) => cls.classId === classId);

  if (!classDetails) {
    return res.status(404).json({ message: 'Class not found' });
  }

  // Find the subject inside the class
  const subjectDetails = classDetails.subjectList.find(
    (subject) => subject.subjectId == subjectId && subject.teachingMode == teachingMode
  );

  if (!subjectDetails) {
    return res.status(404).json({ message: 'Subject not found for the given class and teaching mode' });
  }

  // Find the faculty inside the subject
  const facultyDetails = subjectDetails.facultyList.find(
    (faculty) => faculty.internalFacultyId === internalFacultyId
  );

  if (!facultyDetails) {
    return res.status(404).json({ message: 'Faculty not found in the subject' });
  }

  // ✅ Update facultyAllocationStatus to 1
  facultyDetails.facultyAllocationStatus = 1;

  // Save the updated data
  saveData(data);

  res.status(200).json({
    message: 'Faculty allocation status updated successfully',
    updatedFaculty: facultyDetails,
  });
});

// **DELETE request**: Remove faculty from a subject using subjectCode and teachingMode
app.delete('/api/RegularFacultyAllocation/:classId/:subjectId/:teachingMode/:internalFacultyId', (req, res) => {
  const { classId, subjectId, teachingMode, internalFacultyId } = req.params;
  const data = readData();
  const classDetails = data.RegularClassData.find((cls) => cls.classId === classId);

  if (!classDetails) {
    return res.status(404).json({ message: 'Class not found' });
  }

  // Find the subject using subjectId and teachingMode
  const subject = classDetails.subjectList.find(
    (sub) => sub.subjectId == subjectId && sub.teachingMode == teachingMode
  );

  if (!subject) {
    return res.status(404).json({ message: 'Subject not found' });
  }

  // Find the faculty in the facultyList
  const facultyIndex = subject.facultyList.findIndex(
    (faculty) => faculty.internalFacultyId === internalFacultyId
  );

  if (facultyIndex === -1) {
    return res.status(404).json({ message: 'Faculty not found' });
  }

  // Remove faculty from the list
  subject.facultyList.splice(facultyIndex, 1);
  saveData(data);

  res.status(200).json({
    message: `Faculty with ID ${internalFacultyId} removed successfully`,
    subject,
  });
});
 
app.get('/api/ExClassList', (req, res) => {
  res.json(data.ExClassList);
});

app.get('/api/InternalList', (req, res) => {
  res.json(data.InternalList);
});

app.get('/api/RegularClassList', (req, res) => {
  res.json(data.RegularClassListData);
});

const port = 3002;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

