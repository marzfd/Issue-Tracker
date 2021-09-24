
document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(e) {

  e.preventDefault();

  const issueDesc = document.getElementById('issueDesInput').value;
  const issueSeverity = document.getElementById('issueSeverityInput').value;
  const issueAssignedTo = document.getElementById('issueAssignedToInput').value;
  const issueId = chance.guid();
  const issueStatus = 'Open';

  const issue = {
    id: issueId,
    description: issueDesc,
    severity: issueSeverity,
    assignedTo: issueAssignedTo,
    status: issueStatus
  }

  if (localStorage.getItem('issues') == null) {
    const issues = [];
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  } else {
    const issues = JSON.parse(localStorage.getItem('issues'));
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  }

  document.getElementById('issueInputForm').reset();

  fetchIssues();
}

function setStatusClosed(id) {
  const issues = JSON.parse(localStorage.getItem('issues'));

  for (let i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues[i].status = 'Closed';
    }
  }

  localStorage.setItem('issues', JSON.stringify(issues));

  fetchIssues();
}

function deleteIssue(id) {
  const issues = JSON.parse(localStorage.getItem('issues'));

  for (let i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues.splice(i, 1);
    }
  }

  localStorage.setItem('issues', JSON.stringify(issues));

  fetchIssues();
}

function fetchIssues() {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');

  issuesList.innerHTML = '';

  for (let i = 0; i < issues.length; i++) {
    const id = issues[i].id;
    const desc = issues[i].description;
    const severity = issues[i].severity;
    const assignedTo = issues[i].assignedTo;
    const status = issues[i].status;

    issuesList.innerHTML += '<div class="mt-4 border border-2 p-3 rounded">'+
                            '<h6>Issue ID: ' + id + '</h6>'+
                            '<p><span class="">' + status + '</span></p>'+
                            '<h3>' + desc + '</h3>'+
                            '<p><i class="fa fa-exclamation-circle"></i> ' + severity + '</p>'+
                            '<p><i class="fa fa-user"></i> ' + assignedTo + '</p>'+
                            '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning">Close</a> '+
                            '<a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a>'+
                            '</div>';
  }
}