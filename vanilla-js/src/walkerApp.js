const walkerApp = {
    pageActions: {
        populateTable: (t) => {
            for(let dateSig in walkerApp.dailyStepCounts) {
                if(walkerApp.dailyStepCounts.hasOwnProperty(dateSig)) {
                    let row = t.insertRow();
                    let dateCell = row.insertCell(0);
                    dateCell.innerHTML = walkerApp.utilities.formattedDate(dateSig);
    
                    let countCell = row.insertCell(1);
                    countCell.innerHTML = walkerApp.dailyStepCounts[dateSig];
                }
            }
        }
    },
    utilities: {
        formattedDate: (dateStamp) => {
            let year = parseInt(dateStamp.substring(0, 4));
            let month = parseInt(dateStamp.substring(4, 6)) - 1;
            let day = parseInt(dateStamp.substring(6, 8));

            return new Date(year, month, day);
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
    "20220111": 241
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
