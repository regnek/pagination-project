// Reference the .student-list element
var studentList = document.getElementsByClassName('student-list')[0];

// Create a node list of students
var students = studentList.children;

// Create array to store students in
var studentsArr = [];

// Student constructer function (create a student and add it to the studentsArr array)
function Student(image, name, email, joined) {
    this.name = name;
    this.email = email;
    this.image = image;
    this.joined = joined;
    studentsArr.push(this);
}

// Render the students to HTML
Student.prototype.render = function() {
    var htmlString = '<li class="student-item cf"><div class="student-details">';
    htmlString += '<img class="avatar" src="' + this.image + '">';
    htmlString += '<h3>' + this.name + '</h3>';
    htmlString += '<span class="email">' + this.email + '</span>';
    htmlString += '</div><div class="joined-details"><span class="date">' + this.joined;
    htmlString += '</span></div></li>';

    return htmlString;
};

// Loop through the node list of students and create a new object for each one
for (var i = 0; i < students.length; i++) {
    var s = new Student(students[i].children[0].children[0].getAttribute('src'), students[i].children[0].children[1].textContent, students[i].children[0].children[2].textContent, students[i].children[1].children[0].textContent);
}

// Remove all of the html inside the .student-list element, and repopulate using the JS objects' render method
function generateStudents(page, arrayOfStudents) {
    var studentList = document.getElementsByClassName('student-list')[0];
    studentList.innerHTML = '';
    if (typeof page == typeof undefined) {
        page = 0;
    } else {
        page = page * 10;
    }
    for (var i = page; i < page + 10; i++) {
        if (arrayOfStudents[i]) {
            studentList.innerHTML += arrayOfStudents[i].render();
        } else if (studentList.innerHTML === '') {
            studentList.innerHTML = 'Sorry. No matches were found.';
        }
    }
}

// Create pagination and make it work
function generatePagination(a) {
    // Create pagination
    var pages = Math.ceil(a.length / 10);
    var pagination = '<div class="pagination"></div>',
        paginationInner = '<ul>';
        // Only if there's more than 1 page of results, render pagination
        if (pages > 1) {
            for (var i = 0; i < pages; i ++) {
                paginationInner += '<li><a href="#" ';
                if (i === 0) {
                    paginationInner += 'class="active" ';
                }
                paginationInner += 'page="' + i + '">' + (i + 1) + '</a></li>';
            }
        }
    paginationInner += '</ul>';

    // If pagination hasn't been created, create it
    if (document.getElementsByClassName('pagination').length === 0) {
        document.getElementsByClassName('page')[0].innerHTML += pagination;
    }
    document.getElementsByClassName('pagination')[0].innerHTML = paginationInner;

    // Make pagination work
    var pageLinks = document.getElementsByClassName('pagination')[0].children[0].children;
	  function paginationClick() {
            // Remove the 'active' class from all of the pagination links
            for (var i = 0; i < pageLinks.length; i++) {
                pageLinks[i].children[0].className = '';
            }
            // Add the 'active' class to the clicked pagination link
            this.className = 'active';
            // Render the appropriate students to the page
            generateStudents(this.getAttribute('page'), a);
    }
    // Trigger the paginationClick() function with a click event and bind it to each pagination link
    for (var n = 0; n < pageLinks.length; n++) {
        pageLinks[n].children[0].addEventListener('click', paginationClick);
    }
}

// Create search and make it work
function generateSearch() {
    // Create search
    var search = '<div class="student-search"><input placeholder="Search for students..."><button>Search</button>';
    document.getElementsByClassName('page-header')[0].innerHTML += search;

    // Make search work
    var input = document.getElementsByClassName('student-search')[0].children[0],
        button = document.getElementsByClassName('student-search')[0].children[1];
    // Add functionality to button (search students when button is clicked)
    button.addEventListener('click', function() {
        searchStudents();
    });
    // Add functionality to input (search students as user is typing)
    input.addEventListener('keyup', function() {
        searchStudents();
    });
}

// Search students
function searchStudents() {
    // Create an array to add search results to
    var searchResults = [];
    var search = document.getElementsByClassName('student-search')[0].children[0].value;
    var studentList = document.getElementsByClassName('student-list')[0];
    // Empty the .student-list innerHTML
    studentList.innerHTML = '';
    // Repopulate .student-list with search results
    for (var i = 0; i < studentsArr.length; i++) {
        // Compare user input to students
        if (studentsArr[i].name.toLowerCase().indexOf(search.toLowerCase()) > -1 || studentsArr[i].email.toLowerCase().indexOf(search.toLowerCase()) > -1) {
            // Add matched results to studentsArr array
            searchResults.push(studentsArr[i]);
        // If the search field is empty, render all of the student in the list
        } else if (search === '') {
            generateStudents(0, studentsArr);
        }
    }
    generateStudents(0, searchResults);
    generatePagination(searchResults);
}

// Create the interface
!function() {
    generateStudents(0, studentsArr);
    generatePagination(studentsArr);
    generateSearch();
}();
