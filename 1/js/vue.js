function newTask () {
	return {
		title: '',
		deadline: '',
		file: '',
		comment: '',
		status_star: false,
		status_checked: false,
		edit: false
	}
}

function getInitTasks () {
	let todoLists = localStorage.getItem('todoLists') || '[]';
	try {
		todoLists = JSON.parse(todoLists);
	} catch (e) {
		todoLists = [
				{
					title: 'A done',
					deadline: '2018-06-27 18:22:00',
					file: '',
					comment: 'this is a message',
					status_star: false,
					status_checked: false,
					edit: false
				},
				{
					title: 'B Writing',
					deadline: '2018-07-01 22:39:00',
					file: '',
					comment: 'this is a message',
					status_star: true,
					status_checked: false,
					edit: false
				},
				{
					title: 'C Done',
					deadline: '2018-10-11 22:39:00',
					file: '',
					comment: '',
					status_star: true,
					status_checked: true,
					edit: false
				}
			];
	}
	return todoLists;
}

var app = new Vue({
	el: '#wrapper',
	data(){
		return {
			labelPosition: 'top',
			filter_status: 'all',
			todoShow: false,
			todoForm: newTask(),
			todoLists: getInitTasks(),
			modifyForm: {
				deadline: '',
				comment: ''
			}
	}},
	created: function(){
		//
	},
	methods: {
		handleRemove(file, fileList){
			console.log(file, fileList);
		},
		onSubmit: function(){
			this.todoLists.push(this.todoForm);
			this.todoForm = newTask();
			localStorage.setItem('todoLists', JSON.stringify(this.todoLists));
			this.todoShow = false;
		},
		onModify: function(e){
			if(this.modifyForm.deadline){
				this.todoLists[e].deadline = this.modifyForm.deadline;
			}
			if(this.modifyForm.comment){
				this.todoLists[e].comment = this.modifyForm.comment;
			}
			this.todoLists[e].edit = false;
			localStorage.setItem('todoLists', JSON.stringify(this.todoLists));
		},
		onModifyStar: function(e) {
			if(this.todoLists[e].status_star) {
				this.todoLists[e].status_star = false
			} else {
				this.todoLists[e].status_star = true
			}
			localStorage.setItem('todoLists', JSON.stringify(this.todoLists));
		}
	},
	computed: {
		filteredTodoLists: function() {
			return this.todoLists.filter((todo) => {
				if (this.filter_status === 'all') 
					return true;
				if (this.filter_status === 'progress') 
					return !todo.status_checked;
				if (this.filter_status === 'complete')
					return todo.status_checked;
			})
		},
		tasks: function() {
			let i = 0;
			this.todoLists.filter((todo) => {
				if(todo.status_checked === false) {
					i++;
					return i;
				}
			})
			return i;
		}
	}
})