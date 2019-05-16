document.onload = function() {

	var router = new Navigo(null, true, '#!');
	var container = document.getElementById('container');

	var taskList = [];

	var taskListTemplate = Handlebars.compile(document.getElementById("home-template").innerHTML);
	var editTemplate = Handlebars.compile(document.getElementById("edit-template").innerHTML);
	var taskItemTemplate = Handlebars.compile(document.getElementById("task-item-template").innerHTML);

	router
	  .on({
	    'edit/:id': function (parameters) {
	    	console.log('edit');
	    	var task = getTaskById(parameters.id);
	    	if (task !== null) {
	    		console.log(task);
		     	container.innerHTML = editTemplate(task);
	    	}
	    },
	    '*': function () {
	      console.log('home');
	      container.innerHTML = taskListTemplate();
	      renderTaskList();
	    }
	  })
	  .resolve();

	 function getTaskById(taskId) {
	 	var result = null;
	 	taskList.forEach(function(task, index) {
	 		if (taskId == (index + 1)) {
	 			result = task;
	 			// break;
	 		}
	 	});
	 	return result;
	 }

	 function renderTaskList() {
	 	document.getElementById('task-list').innerHTML = '';
	 	taskList.forEach(function(task, index) {
	 		task['index'] = index + 1;
	 		document.getElementById('task-list').innerHTML += taskItemTemplate(task);
	 	});
	 }

	document.getElementById('container').addEventListener('click', function(e) {
		if(e.target.id === 'task-add-btn') {
			var taskName = document.getElementById('task-name-input').value;
			if (typeof(taskName) !== 'undefined' && taskName !== '') {
				taskList.push({
					name: taskName
				});
				renderTaskList();
			}
		} else if(e.target.classList.contains('task-item-remove')){
			e.target.parentNode.remove();
		} else if(e.target.classList.contains('task-item-edit')){

		}
	});

	document.getElementById('task-list').addEventListener('click', function (e) {
		if (e.target.classList.contains('remove')) {
			e.target.parentNode.remove();
		}
	});

}();