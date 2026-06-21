let tasks =
    JSON.parse(localStorage.getItem("tasks")) || [];
let editIndex = -1;
let editJobIndex = -1;
displayTasks();

function addTask(){

    let taskInput =
        document.getElementById("taskInput");

    if(!taskInput) return;

    let task =
        taskInput.value.trim();

    if(task === ""){
        alert("Enter a task");
        return;
    }

    let priority =
    document.getElementById("priorityInput").value;

let dueDate =
    document.getElementById("dueDate").value;

tasks.push({
    text: task,
    completed: false,
    priority: priority,
    dueDate: dueDate
});

    saveTasks();

    taskInput.value = "";

    displayTasks();
}

function displayTasks(){

    let taskList =
        document.getElementById("taskList");

    if(!taskList) return;

    taskList.innerHTML = "";

    tasks.forEach(function(task,index){

        let li =
            document.createElement("li");

        if(task.completed){
            li.classList.add("completed");
        }

li.innerHTML = `
    <span onclick="toggleTask(${index})">
        ${task.text}
        <br>
        📅 ${task.dueDate || "No Date"}
        <br>
        <span class="priority-${(task.priority || 'Medium').toLowerCase()}">
            ${task.priority || 'Medium'}
        </span>
    </span>

    <div>
        <button onclick="editTask(${index})">
            Edit
        </button>

        <button onclick="deleteTask(${index})">
            Delete
        </button>
    </div>
`;

        taskList.appendChild(li);

    });

    updateProgress();
    updateNotifications();
    updateAchievements();
}

function toggleTask(index){

    tasks[index].completed =
        !tasks[index].completed;

    saveTasks();

    displayTasks();
}

function deleteTask(index){

    tasks.splice(index,1);

    saveTasks();

    displayTasks();
}
function editTask(index){

    editIndex = index;

    document.getElementById(
        "editTaskInput"
    ).value = tasks[index].text;

    document.getElementById(
        "editDueDate"
    ).value = tasks[index].dueDate || "";

    document.getElementById(
        "editPriority"
    ).value = tasks[index].priority || "Medium";

    document.getElementById(
        "editModal"
    ).style.display = "flex";
}
function saveTasks(){

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}
function closeModal(){

    document.getElementById(
        "editModal"
    ).style.display = "none";
}
function saveEditedTask(){

    tasks[editIndex].text =
        document.getElementById(
            "editTaskInput"
        ).value;

    tasks[editIndex].dueDate =
        document.getElementById(
            "editDueDate"
        ).value;

    tasks[editIndex].priority =
        document.getElementById(
            "editPriority"
        ).value;

    saveTasks();

    displayTasks();

    closeModal();
}
function updateProgress(){

    let progressText =
        document.getElementById("progressText");

    let progressBar =
        document.getElementById("progressBar");

    if(!progressText || !progressBar){
        return;
    }

    let completed =
        tasks.filter(task => task.completed).length;

    let percent =
        tasks.length === 0
        ? 0
        : Math.round((completed / tasks.length) * 100);

    progressText.innerText =
        percent + "% Completed";

    progressBar.style.width =
        percent + "%";
}
let jobs =
    JSON.parse(localStorage.getItem("jobs")) || [];

displayJobs();

function addJob(){

    let company =
        document.getElementById("companyInput");

    let role =
        document.getElementById("roleInput");

    let status =
        document.getElementById("statusInput");

    if(!company || !role || !status){
        return;
    }

    if(company.value.trim() === "" ||
       role.value.trim() === ""){
        alert("Fill all fields");
        return;
    }

    let applicationDate =
    document.getElementById(
        "applicationDate"
    ).value;

jobs.push({
    company: company.value,
    role: role.value,
    status: status.value,
    applicationDate: applicationDate
});

    localStorage.setItem(
        "jobs",
        JSON.stringify(jobs)
    );

    company.value = "";
    role.value = "";
    document.getElementById(
    "applicationDate"
).value = "";
    displayJobs();
}

function displayJobs(){

    let jobList =
        document.getElementById("jobList");

    if(!jobList){
        return;
    }

    jobList.innerHTML = "";

    jobs.forEach(function(job,index){

        let li =
            document.createElement("li");

        li.innerHTML = `
            <div>
                <strong>${job.company}</strong><br>
                ${job.role}<br>

📅 ${job.applicationDate || "No Date"}<br>
                <span class="status-${job.status}">
                    ${job.status}
                </span>
            </div>

            <div>

    <button onclick="editJob(${index})">
        Edit
    </button>

    <button onclick="deleteJob(${index})">
        Delete
    </button>

</div>
        `;

        jobList.appendChild(li);

    });
    updateNotifications();
    updateAchievements();
}

function deleteJob(index){

    jobs.splice(index,1);

    localStorage.setItem(
        "jobs",
        JSON.stringify(jobs)
    );

    displayJobs();
}
updateAnalytics();
function editJob(index){

    editJobIndex = index;

    document.getElementById(
        "editCompany"
    ).value = jobs[index].company;

    document.getElementById(
        "editRole"
    ).value = jobs[index].role;

    document.getElementById(
        "editApplicationDate"
    ).value =
        jobs[index].applicationDate || "";

    document.getElementById(
        "editJobStatus"
    ).value =
        jobs[index].status;

    document.getElementById(
        "editJobModal"
    ).style.display = "flex";
}
function closeJobModal(){

    document.getElementById(
        "editJobModal"
    ).style.display = "none";
}
function saveEditedJob(){

    jobs[editJobIndex].company =
        document.getElementById(
            "editCompany"
        ).value;

    jobs[editJobIndex].role =
        document.getElementById(
            "editRole"
        ).value;

    jobs[editJobIndex].applicationDate =
        document.getElementById(
            "editApplicationDate"
        ).value;

    jobs[editJobIndex].status =
        document.getElementById(
            "editJobStatus"
        ).value;

    localStorage.setItem(
        "jobs",
        JSON.stringify(jobs)
    );

    displayJobs();

    closeJobModal();
}
function searchJobs(){

    let keyword =
        document.getElementById("searchJob")
        .value.toLowerCase();

    let items =
        document.querySelectorAll("#jobList li");

    items.forEach(function(item){

        if(
            item.textContent.toLowerCase()
            .includes(keyword)
        ){
            item.style.display = "";
        }
        else{
            item.style.display = "none";
        }

    });
}
function editJob(index){

    editJobIndex = index;

    document.getElementById("editCompany").value =
        jobs[index].company;

    document.getElementById("editRole").value =
        jobs[index].role;

    document.getElementById("editApplicationDate").value =
        jobs[index].applicationDate || "";

    document.getElementById("editJobStatus").value =
        jobs[index].status;

    document.getElementById("editJobModal").style.display =
        "flex";
}
function filterJobs(){

    let status =
        document.getElementById("jobFilter").value;

    let items =
        document.querySelectorAll("#jobList li");

    items.forEach(function(item){

        if(
            status === "All" ||
            item.textContent.includes(status)
        ){
            item.style.display = "";
        }
        else{
            item.style.display = "none";
        }

    });
}
function updateAnalytics(){

    let tasks =
        JSON.parse(localStorage.getItem("tasks")) || [];

    let jobs =
        JSON.parse(localStorage.getItem("jobs")) || [];

    let totalTasks =
        document.getElementById("totalTasks");

    let completedTasks =
        document.getElementById("completedTasks");

    let pendingTasks =
        document.getElementById("pendingTasks");

    let totalJobs =
        document.getElementById("totalJobs");

    let interviewJobs =
        document.getElementById("interviewJobs");

    let selectedJobs =
        document.getElementById("selectedJobs");

    if(!totalTasks){
        return;
    }

    let completed =
        tasks.filter(
            task => task.completed
        ).length;

    totalTasks.innerText =
        tasks.length;

    completedTasks.innerText =
        completed;

    pendingTasks.innerText =
        tasks.length - completed;

    totalJobs.innerText =
        jobs.length;

    interviewJobs.innerText =
        jobs.filter(
            job => job.status === "Interview"
        ).length;

    selectedJobs.innerText =
        jobs.filter(
            job => job.status === "Selected"
        ).length;
}
loadProfile();

function saveProfile(){

    let name =
        document.getElementById("nameInput");

    let goal =
        document.getElementById("goalInput");

    if(!name || !goal){
        return;
    }

    let profile = {

        name: name.value,

        goal: goal.value

    };

    localStorage.setItem(
        "profile",
        JSON.stringify(profile)
    );
    document.getElementById(
    "profileFormCard"
).style.display = "none";

document.getElementById(
    "profileDisplayCard"
).style.display = "block";

    loadProfile();

    alert("Profile Saved Successfully!");
}

function loadProfile(){

    let showName =
        document.getElementById("showName");

    let showGoal =
        document.getElementById("showGoal");

    if(!showName || !showGoal){
        return;
    }

    let profile =
        JSON.parse(localStorage.getItem("profile")) || {};

    showName.innerHTML =
        profile.name || "Not Set";

    showGoal.innerHTML =
        profile.goal || "Not Set";

    if(profile.name){

        document.getElementById(
            "profileFormCard"
        ).style.display = "none";

        document.getElementById(
            "profileDisplayCard"
        ).style.display = "block";

    }
}
function editProfile(){

    let profile =
        JSON.parse(localStorage.getItem("profile")) || {};

    document.getElementById(
        "nameInput"
    ).value = profile.name || "";

    document.getElementById(
        "goalInput"
    ).value = profile.goal || "";

    document.getElementById(
        "profileFormCard"
    ).style.display = "block";

    document.getElementById(
        "profileDisplayCard"
    ).style.display = "none";
}
function checkAchievements(){

    let badges =
        document.getElementById("badges");

    if(!badges){
        return;
    }

    let tasks =
        JSON.parse(localStorage.getItem("tasks")) || [];

    let completed =
        tasks.filter(
            task => task.completed
        ).length;

    let achievementHTML = "";

    if(completed >= 1){
        achievementHTML +=
        "<span class='badge'>🎯 First Task Completed</span>";
    }

    if(completed >= 5){
        achievementHTML +=
        "<span class='badge'>🔥 5 Tasks Completed</span>";
    }

    if(completed >= 10){
        achievementHTML +=
        "<span class='badge'>🏆 Productivity Master</span>";
    }

    if(achievementHTML === ""){
        achievementHTML =
        "No achievements yet";
    }

    badges.innerHTML =
        achievementHTML;
}
loadTheme();
function updateAchievements(){

    let badges =
        document.getElementById("badges");

    if(!badges){
        return;
    }

    let achievements = [];

    if(tasks.length >= 1){
        achievements.push(
            "🏆 First Task Added"
        );
    }

    let completed =
        tasks.filter(
            task => task.completed
        ).length;

    if(completed >= 5){
        achievements.push(
            "⭐ 5 Tasks Completed"
        );
    }

    if(jobs.length >= 1){
        achievements.push(
            "💼 First Job Application"
        );
    }

    if(
        jobs.some(
            job => job.status === "Interview"
        )
    ){
        achievements.push(
            "🎯 First Interview"
        );
    }

    badges.innerHTML =
        achievements.join("<br>") ||
        "No achievements yet";
}
function toggleTheme(){

    document.body.classList.toggle("light-mode");

    let btn =
        document.getElementById("themeBtn");

    if(document.body.classList.contains("light-mode")){

        btn.innerHTML = "☀️";

        localStorage.setItem(
            "theme",
            "light"
        );

    }else{

        btn.innerHTML = "🌙";

        localStorage.setItem(
            "theme",
            "dark"
        );
    }
}

function loadTheme(){

    let theme =
        localStorage.getItem("theme");

    if(theme === "true"){

        document.body.classList.add(
            "light-mode"
        );

    }
}
function exportData(){

    const { jsPDF } = window.jspdf;

    let doc = new jsPDF();

    let tasks =
        JSON.parse(localStorage.getItem("tasks")) || [];

    let jobs =
        JSON.parse(localStorage.getItem("jobs")) || [];

    let profile =
        JSON.parse(localStorage.getItem("profile")) || {};

    let y = 20;

    doc.setFontSize(18);
    doc.text("Career Hub Report", 20, y);

    y += 15;

    doc.setFontSize(12);

    doc.text("PROFILE", 20, y);
    y += 10;

    doc.text(
        `Name: ${profile.name || "Not Set"}`,
        20,
        y
    );

    y += 10;

    doc.text(
        `Career Goal: ${profile.goal || "Not Set"}`,
        20,
        y
    );

    y += 20;

    doc.text("TASKS", 20, y);

    y += 10;

    tasks.forEach((task,index)=>{

        doc.text(
            `${index+1}. ${task.text}`,
            20,
            y
        );

        y += 8;

        doc.text(
            `Priority: ${task.priority || "Medium"}`,
            25,
            y
        );

        y += 8;

        doc.text(
            `Status: ${task.completed ? "Completed" : "Pending"}`,
            25,
            y
        );

        y += 12;
    });

    y += 10;

    doc.text("JOB APPLICATIONS", 20, y);

    y += 10;

    jobs.forEach((job,index)=>{

        doc.text(
            `${index+1}. ${job.company}`,
            20,
            y
        );

        y += 8;

        doc.text(
            `Role: ${job.role}`,
            25,
            y
        );

        y += 8;

        doc.text(
            `Status: ${job.status}`,
            25,
            y
        );

        y += 12;
    });

    doc.save("CareerHub_Report.pdf");
}
updateDashboardStats();

function updateDashboardStats(){

    let totalTasks =
        document.getElementById("dashboardTasks");

    let completedTasks =
        document.getElementById("dashboardCompleted");

    let totalJobs =
        document.getElementById("dashboardJobs");

    if(!totalTasks){
        return;
    }

    let tasks =
        JSON.parse(localStorage.getItem("tasks")) || [];

    let jobs =
        JSON.parse(localStorage.getItem("jobs")) || [];

    let completed =
        tasks.filter(
            task => task.completed
        ).length;

    totalTasks.innerText =
        tasks.length;

    completedTasks.innerText =
        completed;

    totalJobs.innerText =
        jobs.length;
}
function updateDailyQuote(){

    let quoteBox =
        document.getElementById("quote");

    if(!quoteBox){
        return;
    }

    let quotes = [

        "Success is the sum of small efforts repeated every day.",
        "Dream big. Start small. Act now.",
        "Your future is created by what you do today.",
        "Consistency beats motivation.",
        "Every expert was once a beginner.",
        "Opportunities don't happen. You create them.",
        "Stay focused and never give up.",
        "Small progress is still progress.",
        "Believe you can and you're halfway there.",
        "Great things take time.",
        "Push yourself because no one else will.",
        "Do something today that your future self will thank you for.",
        "The secret of getting ahead is getting started.",
        "Success doesn't come from comfort zones.",
        "Discipline is the bridge between goals and achievement.",
        "Hard work beats talent when talent doesn't work hard.",
        "Don't watch the clock; do what it does. Keep going.",
        "Your only limit is your mind.",
        "The best way to predict the future is to create it.",
        "Never stop learning.",
        "Every day is a second chance.",
        "Focus on progress, not perfection.",
        "Winners never quit and quitters never win.",
        "The harder you work, the luckier you get.",
        "Success is not final; failure is not fatal.",
        "Stay positive, work hard, make it happen.",
        "Learn from yesterday, live for today.",
        "Difficult roads often lead to beautiful destinations.",
        "A little progress each day adds up to big results.",
        "Don't be afraid to fail. Be afraid not to try.",
        "Work until your idols become your rivals.",
        "Your dreams don't work unless you do.",
        "Keep moving forward.",
        "Start where you are. Use what you have.",
        "Success begins with self-belief.",
        "Be stronger than your excuses.",
        "Turn your dreams into plans.",
        "The future depends on what you do today.",
        "Stay hungry. Stay foolish.",
        "Success is earned, not given.",
        "Don't stop until you're proud.",
        "Make today count.",
        "Success starts with consistency.",
        "Keep learning, keep growing.",
        "Action is the foundational key to success.",
        "A goal without a plan is just a wish.",
        "Believe in yourself and all that you are.",
        "Great achievements require great effort.",
        "Work hard in silence, let success make the noise.",
        "One day or day one. You decide."
    ];

    let today =
        Math.floor(
            new Date().getTime() /
            (1000 * 60 * 60 * 24)
        );

    let quote =
        quotes[today % quotes.length];

    quoteBox.innerHTML = quote;
}
function updateNotifications(){

    let notificationBox =
        document.getElementById(
            "notifications"
        );

    if(!notificationBox){
        return;
    }

    let messages = [];

    let pendingTasks =
        tasks.filter(
            task => !task.completed
        ).length;

    if(pendingTasks > 0){

        messages.push(
            `📋 ${pendingTasks} Pending Tasks`
        );
    }

    let interviewJobs =
        jobs.filter(
            job => job.status === "Interview"
        ).length;

    if(interviewJobs > 0){

        messages.push(
            `💼 ${interviewJobs} Upcoming Interviews`
        );
    }

    let selectedJobs =
        jobs.filter(
            job => job.status === "Selected"
        ).length;

    if(selectedJobs > 0){

        messages.push(
            `🎉 ${selectedJobs} Selected Jobs`
        );
    }

    notificationBox.innerHTML =
        messages.join("<br>") ||
        "No notifications";
}
function searchTasks(){

    let input =
        document.getElementById("searchInput");

    let filter =
        input.value.toLowerCase();

    let items =
        document.querySelectorAll("#taskList li");

    items.forEach(function(item){

        if(
            item.innerText
                .toLowerCase()
                .includes(filter)
        ){
            item.style.display = "";
        }
        else{
            item.style.display = "none";
        }

    });
}
function filterTasks(){

    let selected =
        document.getElementById(
            "filterPriority"
        ).value;

    let items =
        document.querySelectorAll("#taskList li");

    items.forEach(function(item){

        if(
            selected === "All" ||
            item.innerText.includes(selected)
        ){
            item.style.display = "";
        }
        else{
            item.style.display = "none";
        }

    });
}
window.onload = function(){

    let savedTheme =
        localStorage.getItem("theme");

    let btn =
        document.getElementById("themeBtn");

    if(savedTheme === "light"){

        document.body.classList.add(
            "light-mode"
        );

        if(btn){
            btn.innerHTML = "☀️";
        }

    }else{

        if(btn){
            btn.innerHTML = "🌙";
        }
    }
};
updateNotifications();

function updateClock(){

    let now = new Date();

    let time =
        now.toLocaleTimeString();

    let date =
        now.toDateString();

    let clock =
        document.getElementById(
            "clock"
        );

    let currentDate =
        document.getElementById(
            "currentDate"
        );

    if(clock){
        clock.innerHTML = time;
    }

    if(currentDate){
        currentDate.innerHTML = date;
    }
}
setInterval(
    updateClock,
    1000
);

updateClock();
updateDailyQuote();

if(document.getElementById("showName")){
    loadProfile();
}
function login(){

    let username =
        document.getElementById(
            "username"
        );

    let password =
        document.getElementById(
            "password"
        );

    if(!username || !password){
        return;
    }

    if(
        username.value === "admin" &&
        password.value === "1234"
    ){

        localStorage.setItem(
            "loggedIn",
            "true"
        );

        window.location.href =
            "index.html";

    }
    else{

        alert(
            "Invalid Username or Password"
        );
    }
}
if(
    window.location.pathname
    .includes("index.html") ||

    window.location.pathname
    .includes("tasks.html") ||

    window.location.pathname
    .includes("jobs.html") ||

    window.location.pathname
    .includes("analytics.html") ||

    window.location.pathname
    .includes("profile.html")
){

    if(
        localStorage.getItem(
            "loggedIn"
        ) !== "true"
    ){

        window.location.href =
            "login.html";
    }
}
if(
    window.location.pathname
    .includes("login.html")
){

    if(
        localStorage.getItem(
            "loggedIn"
        ) === "true"
    ){

        window.location.href =
            "index.html";
    }
}
function logout(){

    localStorage.removeItem(
        "loggedIn"
    );

    window.location.href =
        "login.html";
}
updateAchievements();