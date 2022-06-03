function createEmployeeRecord(propArray) {
    let [ firstName, familyName, title, payPerHour ] = propArray;
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
};

function createEmployeeRecords(nestedArray) {
    return nestedArray.map(employee => createEmployeeRecord(employee))
};

function createTimeInEvent(dateStamp) {
    let [ date, hour ] = dateStamp.split(' ');
    const event = {
        type: "TimeIn",
        hour: Number(hour),
        date,
    };
    this.timeInEvents.push(event);
    return this
};

function createTimeOutEvent(dateStamp) {
    let [ date, hour ] = dateStamp.split(' ');
    const event = {
        type: "TimeOut",
        hour: Number(hour),
        date,
    };
    this.timeOutEvents.push(event);
    return this;
};

function hoursWorkedOnDate(date) {
    const { hour: timeIn } = this.timeInEvents.find(event => event.date === date);
    const { hour: timeOut } = this.timeOutEvents.find(event => event.date === date);

    return (timeOut - timeIn) / 100;
};

function wagesEarnedOnDate(date) {
    return this.payPerHour * hoursWorkedOnDate.call(this, date);
};

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(record => record.firstName === firstName);
};

function calculatePayroll(srcArray) {
	let wages = srcArray.map(record => allWagesFor.call(record));
    return wages.reduce((a, b) => a + b);
};