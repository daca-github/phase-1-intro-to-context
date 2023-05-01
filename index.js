// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
      firstName,
      familyName,
      title,
      payPerHour,
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  function createEmployeeRecords(arrays) {
    return arrays.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(employee, dateStamp) {
    employee.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(dateStamp.split(" ")[1]),
      date: dateStamp.split(" ")[0]
    });
    return employee;
  }
  
  function createTimeOutEvent(employee, dateStamp) {
    employee.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(dateStamp.split(" ")[1]),
      date: dateStamp.split(" ")[0]
    });
    return employee;
  }
  
  function hoursWorkedOnDate(employee, date) {
    const timeInEvent = employee.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employee.timeOutEvents.find(event => event.date === date);
  
    if (timeInEvent && timeOutEvent) {
      return (timeOutEvent.hour - timeInEvent.hour) / 100;
    }
  
    return 0;
  }
  
  function wagesEarnedOnDate(employee, date) {
    const hours = hoursWorkedOnDate(employee, date);
    return hours * employee.payPerHour;
  }
  
  function allWagesFor(employee) {
    const dates = employee.timeInEvents.map(event => event.date);
    return dates.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0);
  }
  
  function calculatePayroll(employees) {
    return employees.reduce((total, employee) => total + allWagesFor(employee), 0);
  }
  