$(document).ready(function(){

  refreshList();

  function refreshList() {
    $.ajax({
      type: 'GET',
      url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=1254',
      dataType: 'json',
      success: function (response, textStatus) {
        console.log(response);
        $('#taskTable').empty();
        generateTable(response);
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

  function generateTable(response){
    const tbl = document.createElement("table");
    const tblBody = document.createElement("tbody");
    for (i = 0; i < response.tasks.length; i++){
      const row = document.createElement("tr");

      cell1 = document.createElement("td");
      const cellCheckbox = document.createElement('INPUT');
      cellCheckbox.setAttribute("type", "checkbox");
      cellCheckbox.checked = response.tasks[i].completed;
      cell1.id = response.tasks[i].id + "checkbox";
      cell1.classList.add('taskCheckbox');
      cell1.appendChild(cellCheckbox);
      row.appendChild(cell1);

      cell2 = document.createElement("td");
      const cellText = document.createTextNode(response.tasks[i].content);
      cell2.appendChild(cellText);
      cell2.id = response.tasks[i].id + "text";
      row.appendChild(cell2);

      cell3 = document.createElement("td");
      const cellButton = document.createElement('button');
      cellButton.setAttribute("type", "button");
      cellButton.innerHTML = "X";
      cell3.id = response.tasks[i].id + "button";
      cell3.classList.add('taskDeleteButton');
      cell3.appendChild(cellButton);
      row.appendChild(cell3);


      tblBody.appendChild(row);
    }
    tbl.appendChild(tblBody);
    document.getElementById('taskTable').appendChild(tbl);
    tbl.setAttribute("border","2");
  }

  $(document).on('click', '#refreshButton', function() {
    refreshList();
  });

  $(document).on('click', '#submitTask', function() {
    $.ajax({
      type: 'POST',
      url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=1254',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        task: {
          content: $('#newItem').val()
        }
      }),
      success: function (response, textStatus) {
        console.log(response);
        refreshList();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  });

  $(document).on('click', '.taskDeleteButton',function(){
    //console.log(this.id);
    const taskid = this.id.replace('button','');
    const deletedurl = 'https://fewd-todolist-api.onrender.com/tasks/'+taskid+'?api_key=1254'
    $.ajax({
      type: 'DELETE',
      url: deletedurl,
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        task: {
          content: $('#newItem').val()
        }
      }),
      success: function (response, textStatus) {
        console.log(response);
        refreshList();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  });

  $(document).on('click', '.taskCheckbox',function(){
    //console.log(this.id);
    var checkboxID = this.id;
    var taskid = this.id.replace('checkbox','');
    var taskChecked = this.firstChild.checked;
    var taskStatus = '';
    if(taskChecked === true) {
      taskStatus = 'complete';
    } else {
      taskStatus = 'active';
    }
    //console.log (taskStatus);
    var checkboxurl = 'https://fewd-todolist-api.onrender.com/tasks/'+taskid+'/mark_'+taskStatus+'?api_key=1254';
    $.ajax({
      type: 'PUT',
      url: checkboxurl,
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        task: {
          content: $('#newItem').val()
        }
      }),
      success: function (response, textStatus) {
        console.log(response);
        refreshList();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
    refreshList();
  });

});  