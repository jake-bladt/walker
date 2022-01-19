"use strict";

const walkerApp = {
    pageActions: {
        populateTable: (t) => {
            for(let dateSig in walkerApp.dailyStepCounts) {
                if(walkerApp.dailyStepCounts.hasOwnProperty(dateSig)) {
                    let row = t.insertRow();
                    let dateCell = row.insertCell(0);
                    dateCell.innerHTML = walkerApp.utilities.stampedDate(dateSig).toyyyyMMdd();
    
                    let countCell = row.insertCell(1);
                    countCell.innerHTML = walkerApp.dailyStepCounts[dateSig].toLocaleString('en-US');
                }
            }
        }
    },
    utilities: {

        stampedDate: (dateStamp) => {

            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

            let yearPart = dateStamp.substring(0, 4);
            let monthIndex = parseInt(dateStamp.substring(4, 6)) - 1;
            let dayPart = dateStamp.substring(6, 8);
            
            return {
                toDate: () => new Date(parseInt(yearPart), monthIndex, parseInt(dayPart)),
                toyyyyMMdd: () => `${dayPart}-${months[monthIndex]}-${yearPart}`
            }
        }
    }
};

// This will eventually be loaded from the service
walkerApp.dailyStepCounts = {
    "20220101": 390,
    "20220102": 69,
    "20220103": 594,
    "20220104": 741,
    "20220105": 1264,
    "20220106": 1029,
    "20220107": 411,
    "20220108": 867,
    "20220109": 1071,
    "20220110": 2181,
    "20220111": 241,
    "20220112": 504,
    "20220113": 1022,
    "20220114": 1343,
    "20220115": 813,
    "20220116": 165,
    "20220117": 320,
    "20220118": 1018
};

// Page Actions
document.addEventListener('DOMContentLoaded',
    () => {

        const table = document.getElementById('stepsTable');
        if(table) {
            walkerApp.pageActions.populateTable(table);
        } else {
            console.error("Unable to find element stepsTable");
        }
    },
    false);
