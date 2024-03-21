// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');

// Collect employee data
const collectEmployees = function () {
  //Array that holds employee info
  let companyStaffArr = []

  //Variable which will later be reassigned to the value of the confirm method
  let isNewEmployeeAdded = true;
  do {
    //Employee information prompts
    let employeeFirstNamePrompt = prompt("Enter employee first name");
    let employeeLastNamePrompt = prompt("Enter employee last name");
    let employeeSalaryPrompt = prompt("Enter employee salary");
    isNewEmployeeAdded = confirm("Do you want to add a new employee?")

    //checking if the value returned in the salary prompt is a number 
    if (isNaN(employeeSalaryPrompt)) {
      employeeSalary = 0
    }

    //Pushing prompt values into an object, into the companyStaffArr
    companyStaffArr.push({
      firstName: employeeFirstNamePrompt,
      lastName: employeeLastNamePrompt,
      salary: Number(employeeSalaryPrompt)
    })
  } while (isNewEmployeeAdded)

  return companyStaffArr
}

// Display the average salary
const displayAverageSalary = function (employeesArray) {
  //Calculating the total employee salary
  const totalEmployeeSalary = employeesArray.reduce(function (total, currentItem) {
    return total + currentItem.salary
  }, 0)
  //Calculating the average salary based on the value returned in the variable above
  const averageEmployeeSalary = totalEmployeeSalary / employeesArray.length

  const salaryMessage = `The average salary between our ${employeesArray.length} employees is $${averageEmployeeSalary.toFixed(2)}`
  console.log(salaryMessage)
}

// Select a random employee
const getRandomEmployee = function (employeesArray) {
  //Generating a random index to render a random employee
  const randomEmployeeIndex = Math.floor(Math.random() * employeesArray.length)


  const employeeMessage = `congratulations to ${employeesArray[randomEmployeeIndex].firstName} ${employeesArray[randomEmployeeIndex].lastName} for being our random draw winner!`
  console.log(employeeMessage)
}

/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function (employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector('#employee-table');

  // Clear the employee table
  employeeTable.innerHTML = '';

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
}

const trackEmployeeData = function () {
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log('==============================');

  getRandomEmployee(employees);

  employees.sort(function (a, b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
}

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener('click', trackEmployeeData);
