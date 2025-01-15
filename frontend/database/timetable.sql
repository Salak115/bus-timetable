CREATE DATABASE university_db;

USE university_db;

CREATE TABLE timetable (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(100) NOT NULL,
    room VARCHAR(50) NOT NULL,
    day_of_week VARCHAR(20) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL
);

INSERT INTO timetable (course_name, room, day_of_week, start_time, end_time)
VALUES 
('Web Programing', 'Room A1', 'Monday', '09:00:00', '10:30:00'),
('DataBase A & B', 'Room B1', 'Monday', '11:00:00', '12:30:00'),
('Machine learning', 'Room C1', 'Tuesday', '10:00:00', '11:30:00');
