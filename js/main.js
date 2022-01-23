document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(e) {
    var issueDesc = document.getElementById('issueDescInput').value;
    var issueSeverity = document.getElementById('issueSeverityInput').value;
    var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    var issueId = chance.guid();
    var issueStatus = 'Open';

    var issue = {
        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus
    }

    if(localStorage.getItem('issues') == null) {
        var issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    } else {
        var issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }
    document.getElementById('issueInputForm').reset();

    fetchIssues();

    e.preventDefault();
}

function setStatusClosed(id) {
    var issues = JSON.parse(localStorage.getItem('issues'));
    for(var index = 0; index < issues.length; index++) {
        if(issues[index].id == id) {
            issues[index].status = "Closed";
        }
    }
    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
}

function deleteIssue(id) {
    var issues = JSON.parse(localStorage.getItem('issues'));
    for(var index = 0; index < issues.length; index++) {
        if(issues[index].id == id) {
            issues.splice(index, 1);
        }
    }
    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
}

function fetchIssues() {
    var issues = JSON.parse(localStorage.getItem('issues'));
    var issueList = document.getElementById('issueList');

    issueList.innerHTML = '';

    for(let i = 0; i < issues.length; i++) {
        var id = issues[i].id;
        var desc = issues[i].description;
        var severity = issues[i].severity;
        var assignedTo = issues[i].assignedTo;
        var status = issues[i].status;
        console.log(id, desc, severity, assignedTo, status);
        issueList.innerHTML += issueFactory({id, desc, severity, assignedTo, status});
    }
    // issues.array.forEach(issue => {
    //     var id = issue.id;
    //     var desc = issue.desc;
    //     var severity = issue.severity;
    //     var assignedTo = issue.assignedTo;
    //     var status = issue.status;
    //     console.log(id, desc, severity, assignedTo, status);
    //     issueList.innerHTML += issueFactory({id, desc, severity, assignedTo, status})
    // });
}

function issueFactory({id, desc, severity, assignedTo, status}) {
    return `<div class="well issue">
                <h7>Issue ID: ${id}</h7>
                <p><span class="badge ${(status == 'Open' ? 'bg-success' : 'bg-danger')}"> ${status} </span></p>
                <h3> ${desc} </h3>
                <p class="severity"><span class="bi bi-clock"></span> ${severity}</p>
                <p class="assignedTo"><span class="bi bi-person-fill"></span> ${assignedTo}</p>
                <a href="#" onclick="setStatusClosed('${id}')" class="btn btn-warning">Close</a>
                <a href="#" onclick="deleteIssue('${id}')" class="btn btn-danger">Delete</a>
            </div>`
}