document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registration-form');
    const studentList = document.getElementById('student-list');
    const submitBtn = document.getElementById('submit-btn');

    let students = JSON.parse(localStorage.getItem('students')) || [];
    let editIndex = -1;

    // Initial render
    renderStudents();

    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('student-name').value.trim();
        const id = document.getElementById('student-id').value.trim();
        const email = document.getElementById('email-id').value.trim();
        const contact = document.getElementById('contact-number').value.trim();

        if (!validateInputs(name, id, email, contact)) return;

        const studentData = { name, id, email, contact };

        if (editIndex === -1) {
            // Add new student
            students.push(studentData);
        } else {
            // Update existing student
            students[editIndex] = studentData;
            editIndex = -1;
            submitBtn.textContent = 'Register';
        }

        saveAndRender();
        registrationForm.reset();
    });

    function validateInputs(name, id, email, contact) {
        // Name: only characters
        if (!/^[a-zA-Z\s]+$/.test(name)) {
            alert('Student Name should only contain characters.');
            return false;
        }

        // ID: only numbers
        if (!/^\d+$/.test(id)) {
            alert('Student ID should only contain numbers.');
            return false;
        }

        // Email: valid format (handled by HTML5 type="email", but double-check)
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Please enter a valid email address.');
            return false;
        }

        // Contact: only numbers, at least 10 digits
        if (!/^\d{10,}$/.test(contact)) {
            alert('Contact Number should be at least 10 digits and contain only numbers.');
            return false;
        }

        return true;
    }

    function saveAndRender() {
        localStorage.setItem('students', JSON.stringify(students));
        renderStudents();
    }

    function renderStudents() {
        studentList.innerHTML = '';

        students.forEach((student, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.id}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td class="actions">
                    <button class="edit-btn" onclick="editStudent(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
                </td>
            `;
            studentList.appendChild(row);
        });

        // Dynamic scrollbar check (Requirement: Add a vertical scrollbar dynamically with JS)
        const tableContainer = document.getElementById('table-container');
        if (studentList.children.length > 5) {
            tableContainer.style.overflowY = 'scroll';
        } else {
            tableContainer.style.overflowY = 'auto';
        }
    }

    // Expose functions to global scope for onclick handlers
    window.editStudent = (index) => {
        const student = students[index];
        document.getElementById('student-name').value = student.name;
        document.getElementById('student-id').value = student.id;
        document.getElementById('email-id').value = student.email;
        document.getElementById('contact-number').value = student.contact;

        editIndex = index;
        submitBtn.textContent = 'Update';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.deleteStudent = (index) => {
        if (confirm('Are you sure you want to delete this record?')) {
            students.splice(index, 1);
            saveAndRender();
        }
    };
});
