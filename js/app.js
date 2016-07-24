// Reference the .student-list element
var studentList = document.getElementsByClassName('student-list')[0];

// Create a node list of students
var students = studentList.children;

// Create array to store students in
var studentsArr = [];

// Student constructer function
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
}

// Create students
for (var i = 0; i < students.length; i++) {
    var s = new Student(students[i].children[0].children[0].getAttribute('src'), students[i].children[0].children[1].textContent, students[i].children[0].children[2].textContent, students[i].children[1].children[0].textContent);
}

// Show 10 students at a time
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
        } else if (studentList.innerHTML == '') {
            studentList.innerHTML = 'Sorry. No matches were found.';
        }
    }
}

// Create pagination and make it work
function generatePagination(a) {
    // Create pagination
    var pages = Math.ceil(a.length / 10);
    var pagination = '<div class="pagination"></div>',
        paginationInner = '<ul>'
    for (var i = 0; i < pages; i ++) {
        paginationInner += '<li><a href="#" ';
        if (i == 0) {
            paginationInner += 'class="active" ';
        }
        paginationInner += 'page="' + i + '">' + (i + 1) + '</a></li>';
    }
    paginationInner += '</ul>';

    if (document.getElementsByClassName('pagination').length == 0) {
        document.getElementsByClassName('page')[0].innerHTML += pagination;
    }
    document.getElementsByClassName('pagination')[0].innerHTML = paginationInner;

    // Make pagination work
    var pageLinks = document.getElementsByClassName('pagination')[0].children[0].children;
    for (var i = 0; i < pageLinks.length; i++) {
        pageLinks[i].children[0].addEventListener('click', function() {
            for (var i = 0; i < pageLinks.length; i++) {
                pageLinks[i].children[0].className = '';
            }
            this.className = 'active';
            generateStudents(this.getAttribute('page'), a);
        });
    }
}

// Create search and make it work
function generateSearch() {
    // Create search
    var search = '<div class="student-search"><input placeholder="Search for students..."><button>Search</button>';
    document.getElementsByClassName('page-header')[0].innerHTML += search;

    // Make search work
    var input = document.getElementsByClassName('student-search')[0].children[0],
        button = document.getElementsByClassName('student-search')[0].children[1],
        searchResults = [],
        search;
    button.addEventListener('click', function() {
        searchStudents();
    });
    input.addEventListener('keyup', function() {
        searchStudents();
    });
}

// Search students
function searchStudents() {
    searchResults = [];
    search = document.getElementsByClassName('student-search')[0].children[0].value;
    var studentList = document.getElementsByClassName('student-list')[0];
    studentList.innerHTML = '';
    for (var i = 0; i < studentsArr.length; i++) {
        if (studentsArr[i].name.toLowerCase().indexOf(search.toLowerCase()) > -1 || studentsArr[i].email.toLowerCase().indexOf(search.toLowerCase()) > -1) {
            searchResults.push(studentsArr[i]);
        } else if (search == '') {
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
