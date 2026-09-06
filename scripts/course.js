const courses = [
  {
    subject: "CSE",
    number: 110,
    title: "Introduction to Programming",
    credits: 2,
    certificate: "Web and Computer Programming",
    description: "This course introduces students to programming. It will introduce the building blocks of programming languages such as variables, decisions, calculations, loops, array, and input/output.",
    technology: ["Python"],
    completed: true
  },
  {
    subject: "WDD",
    number: 130,
    title: "Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description: "This course introduces students to the World Wide Web and to careers in web site design and development.",
    technology: ["HTML", "CSS"],
    completed: true
  },
  {
    subject: "CSE",
    number: 111,
    title: "Programming with Functions",
    credits: 2,
    certificate: "Web and Computer Programming",
    description: "CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others.",
    technology: ["Python"],
    completed: true
  },
  {
    subject: "CSE",
    number: 210,
    title: "Programming with Classes",
    credits: 2,
    certificate: "Web and Computer Programming",
    description: "This course introduces the notion of classes and objects. It presents encapsulation as a powerful and central principle of computer programming.",
    technology: ["C#"],
    completed: false
  },
  {
    subject: "WDD",
    number: 131,
    title: "Dynamic Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description: "This course builds on prior experience in Web Fundamentals and programming.",
    technology: ["HTML", "CSS", "JavaScript"],
    completed: true
  },
  {
    subject: "WDD",
    number: 231,
    title: "Frontend Web Development I",
    credits: 2,
    certificate: "Web and Computer Programming",
    description: "This course introduces students to frontend web development with responsive design and dynamic content.",
    technology: ["HTML", "CSS", "JavaScript"],
    completed: false
  }
];

const courseList = document.querySelector("#courseList");
const creditTotal = document.querySelector("#creditTotal");
const filterButtons = document.querySelectorAll("[data-filter]");

function displayCourses(courseItems) {
  if (!courseList || !creditTotal) {
    return;
  }

  courseList.innerHTML = "";

  courseItems.forEach((course) => {
    const courseCard = document.createElement("article");
    courseCard.className = `course-card${course.completed ? " completed" : ""}`;
    courseCard.innerHTML = `${course.subject} ${course.number}<span>${course.title}</span>`;
    courseList.appendChild(courseCard);
  });

  const credits = courseItems.reduce((total, course) => total + course.credits, 0);
  creditTotal.textContent = `Total Credits: ${credits}`;
}

function filterCourses(filter) {
  if (filter === "all") {
    return courses;
  }

  return courses.filter((course) => course.subject === filter);
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    displayCourses(filterCourses(selectedFilter));
  });
});

displayCourses(courses);
