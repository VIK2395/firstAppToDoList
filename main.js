'use strict';

let addbtn = document.getElementById("addbtn"),
	list = document.getElementById("list"),
	clearAndRefresh = document.getElementById("clearAndRefresh");

if (localStorage.getItem("toDoList") !== null) {
	let toDoList = [];
		toDoList = JSON.parse(localStorage.getItem("toDoList"));
		for (let i=0; i<toDoList.length; i++) {
			let pTagStyle = function (){
						if (toDoList[i].iconClass === "glyphicon-check") return "del";
			};

		const item = `<li class="item">
						<i class="glyphicon check-icon ${toDoList[i].iconClass}"></i>
						<p class=${pTagStyle()}>${toDoList[i].task}</p>
						<i class="glyphicon glyphicon-trash"></i>
					</li> `;
			list.insertAdjacentHTML("beforeend", item);
	}
}

addbtn.addEventListener("click", addItem, false);

function addItem () {
	if (document.getElementById("input").value !== "") {
		const input = document.getElementById("input");
		const item = `<li class="item">
						<i class="glyphicon check-icon glyphicon-unchecked"></i>
						<p>${input.value}</p>
						<i class="glyphicon glyphicon-trash"></i>
					</li> `;
			list.insertAdjacentHTML("beforeend", item);
			input.value = "";
			saveToLocalStorage ();
	}
}

function saveToLocalStorage () {
	let toDoList = [],
		items = list.querySelectorAll("li");
		if (items.length!==0) {
			for (let i=0; i<items.length; i++) {
				let itemObject = {};
					itemObject.task = items[i].innerText;

					if (items[i].querySelector("i").classList.contains("glyphicon-unchecked")) {
						itemObject.iconClass = "glyphicon-unchecked"} else {itemObject.iconClass = "glyphicon-check"};
					toDoList.push(itemObject);
			}
		localStorage.setItem("toDoList", JSON.stringify(toDoList));
		} else localStorage.clear();
}

document.addEventListener("keyup", btnEnterClick, false);

function btnEnterClick(event) {
	if (event.keyCode === 13) {addItem ()};
}

list.addEventListener("click", itemSwitchStateOrRemove, false);

let switchStyle = function (itemToBeSwitched, styleToSwith, styleToSwith$) {
		itemToBeSwitched.classList.toggle(styleToSwith);
		itemToBeSwitched.classList.toggle(styleToSwith$);
	}

function itemSwitchStateOrRemove(event) {
	if (event.target.tagName === "I") {
		if (event.target.classList.contains("check-icon")) {switchStyle(event.target, "glyphicon-unchecked", "glyphicon-check"); event.target.parentNode.querySelector("p").classList.toggle("del"); saveToLocalStorage (); return};//setLocalStorage
		if (event.target.classList.contains("glyphicon-trash")) {event.target.parentNode.parentNode.removeChild(event.target.parentNode); saveToLocalStorage ()} //+removeItemFromLocalStorage
	}
}

function clearList () {
	localStorage.clear();
	location.reload();
}

clearAndRefresh.addEventListener("click", clearList, false)
