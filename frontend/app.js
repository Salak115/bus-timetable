// const tableBody = document.querySelector("#timetable tbody");


// fetch("http://localhost:3000/schedules").then((response) => response.json()).then((data) => {console.log(data);
// data.forEach((row) => {
// const tr = document.createElement("tr");
// const deleteButton = document.createElement("button");
// deleteButton.textContent = "Delete";
// deleteButton.className = "delete_btn";
// deleteButton.addEventListener("click", () => {
// deleteSchedule(row.id); });
// tr.innerHTML = `
// <td>${row.course_name}</td>
// <td>${row.room}</td>
// <td>${row.day}</td>
// <td>${row.start_time}</td>
// <td>${row.end_time}</td>

// `;
// const td = document.createElement("td");
// td.appendChild(deleteButton)
// tr.appendChild(td);
// tableBody.appendChild(tr)
// });
// }).catch((error) => console.error("Error:", error));

// function deleteSchedule(id) {
// fetch(`http://localhost:3000/delete/${id}`, {
// method: "DELETE",
// })
// .then((response) => {
// if (response.ok) {
// alert("Schedule deleted successfully!");
// window.location.reload(); // Refresh the table
// } else {
// alert("Failed to delete the schedule.");
// }
// })
// .catch((err) => console.error("Error during deletion:", err));
// }

// document.getElementById("logoutButton").addEventListener("click", function () {fetch("http://localhost:3000/api/admin/logout", {method: "POST",
// credentials: "include",
// })
// .then((response) => response.json())
// .then((message) => {
// alert(message.message);
// window.location.href = "admin_login.html";
// })
// .catch((error) => console.error("Error:", error));
// });

// // fetch("http://localhost:3000/api/admin/protected", {
// //   credentials: "include",
// // }).then((response) => {
// //   if (response.status !== 200) {
// //     alert("Access denied! Redirecting to login.");
// //     window.location.href = "admin_login.html";
// //   }
// // });

// document.getElementById("loginForm").addEventListener("submit", function (e) {
//   e.preventDefault();
// const data = {
// username: document.getElementById("username").value,
// password: document.getElementById("password").value,
// };
// fetch("http://localhost:3000/api/admin/login", {
// method: "POST",
// headers: { "Content-Type": "application/json" },
// body: JSON.stringify(data),
// credentials: "include",
// })
// .then((response) => response.json())
// .then((data) => {
// document.getElementById("status").innerText = data.message;
// if (data.message === "Login successful") {
// window.location.href = "/university-timetable/frontend/index.html";
// }
// })
// .catch((error) => console.error("Error:", error));
// });



// const form = document.getElementById('scheduleForm');

// form.addEventListener('submit', async (event) => {
// event.preventDefault(); // Prevent form from refreshing the page

// // Collect form data
// const formData = {
//     course_name: document.getElementById('course_name').value,
//     room: document.getElementById('room').value,
//     day: document.getElementById('day').value,
//     start_time: document.getElementById('start_time').value,
//     end_time: document.getElementById('end_time').value,
// };

// try {
//     // Send the data to the backend
//     const response = await fetch('http://localhost:3000/add', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//     });

//     if (response.ok) {
//         const result = await response.json();
//         alert('Schedule created successfully!');
//         window.location.href = '/university-timetable/frontend/index.html'; 
//     } else {
//         const error = await response.json();
//         alert(`Error: ${error.message}`);
//     }
// } catch (err) {
//     alert('Failed to send data to the backend. Please check your connection.');
//     console.error(err);
// }
// });