function init() {
	/* 
	* @description this method will return birthday calendar for given input year 
	* @param {String} year
	*/
	function getBirthdayCal(year) {
		var json_input = document.getElementById("json-input").value; // get input calendar values

		json_input = JSON.parse(JSON.stringify(eval("(" + json_input + ")"))); // get JSON value of input calendar

		var birthday_cal = {
			"mon": [],
			"tue": [],
			"wed": [],
			"thu": [],
			"fri": [],
			"sat": [],
			"sun": []
		}; // create an object entry for all days of given year

		for (var i = 0; i < json_input.length; i++) {
			  var birthday = new Date(json_input[i].birthday); // get date object of birthday
			  if ( birthday.getFullYear() == year) { // condition to get only selcted year values
			  	var name = getNameInitials(json_input[i].name); // get initials of name
			  	var day = birthday.getDay();  // get day of week
			  	switch (day) {
			  		case 0:
			  			birthday_cal["sun"].push({"name": name, "birthday": birthday});
			  			break;
			  		case 1:
			  			birthday_cal["mon"].push({"name": name, "birthday": birthday});
			  			break;
			  		case 2:
			  			birthday_cal["tue"].push({"name": name, "birthday": birthday});
			  			break;
			  		case 3:
			  			birthday_cal["wed"].push({"name": name, "birthday": birthday});
			  			break;
			  		case 4:
			  			birthday_cal["thu"].push({"name": name, "birthday": birthday});
			  			break;
			  		case 5:
			  			birthday_cal["fri"].push({"name": name, "birthday": birthday});
			  			break;
			  		case 6:
			  			birthday_cal["sat"].push({"name": name, "birthday": birthday});
			  			break;	
			  	}
			  }
			}
		return birthday_cal;
	}
	/* 
	* @description this method will return name initials for given name 
	* @param {String} name
	*/
	 function getNameInitials(name) {
	 	var nameInital = '';
	 	if (name) {
	 		var nameArray = name.split(' '); // split given name by space
		 	for (var each in nameArray) {
		 		nameInital += nameArray[each][0];
		 	}
	 	}
	 	return nameInital;
	 }

	/* 
	* @description custom compare method sort based on birthday
	*/
	function compare(a, b) {
	  if (a.birthday < b.birthday) {
	    return -1;
	  }
	  if (a.birthday > b.birthday) {
	    return 1;
	  }
	  return 0;
	}

	/* 
	* @description update birthday calendar for given input year
	*/
	function update() {
		var input_year = document.getElementsByClassName('js-year')[0].value,
			birthday_cal = getBirthdayCal(input_year); // get input year value
		resetBirthdayCal(birthday_cal); // reset the calendar box
		getMessage(birthday_cal); // get total no birthday message
		for (each in birthday_cal) {
			var eachday = document.querySelectorAll('[data-day='+each+']');
			if (birthday_cal[each].length === 0) {
				eachday[0].classList.add("day--empty"); // if no birthday for this day
			} else {
				birthday_cal[each].sort(compare) // sort based on birthday
				var day__people = eachday[0].querySelector(".day__people"),
					length = birthday_cal[each].length;
				for (var i = 0; i < length; i++) {
					var newPerson = document.createElement("DIV");
					newPerson.className = "day__person";
					newPerson.style.height = getProperty(length) +"%";
					newPerson.style.width = getProperty(length) +"%";
					var textnode = document.createTextNode(birthday_cal[each][i].name);
					newPerson.appendChild(textnode);
					day__people.appendChild(newPerson);
				}
			}
		}
	}
	/* 
	* @description reset birthday calendar to intial state
	*/
	function resetBirthdayCal(birthday_cal) {
		var peoples = document.getElementsByClassName('day__people');
		for (var i=0; i < peoples.length; i++) {
			peoples[i].innerHTML = ''
		}
		for (each in birthday_cal) {
			var eachday = document.querySelectorAll('[data-day='+each+']');
			eachday[0].classList.remove("day--empty");
		}
	}
	/* 
	* @description get style property of each box
	* @param {number} nubmer of birthday count
	*/
	function getProperty(number) {
		var boxSize = Math.ceil(Math.sqrt(number));
		return Math.round(100/boxSize * 100) / 100
	}
	/* 
	* @description get birthday messagesfor each day
	* @param {object} birthday_cal object of given year
	*/
	function getMessage(birthday_cal) {
		var jsCalendarMessage = document.getElementsByClassName('js-calendar');
		jsCalendarMessage[0].innerHTML = '';
		for (each in birthday_cal) {
			var node = document.createElement("LI");
			node.className = "cal__day_message";
			var birth_count = '';
			switch (birthday_cal[each].length) {
				case 0:
					birth_count = "No birthdays";
					break;
				case 1:
					birth_count = "1 birthday";
					break;
				default:
					birth_count = birthday_cal[each].length + " birthdays";
			}
			var textnode = document.createTextNode(birth_count);
			node.appendChild(textnode);
			jsCalendarMessage[0].appendChild(node);
		}
	}
	return update;
}
var updateCalendar = init();
updateCalendar();