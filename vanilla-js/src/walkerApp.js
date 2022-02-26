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
    stats: () => {
        let vals = [];
        let counts = [];

        for(let dateSig in walkerApp.dailyStepCounts) {
            if(walkerApp.dailyStepCounts.hasOwnProperty(dateSig)) {
                vals.push(walkerApp.dailyStepCounts[dateSig]);
                counts.push({ 
                    "formattedDate": walkerApp.utilities.stampedDate(dateSig).toyyyyMMdd(),
                    "count": walkerApp.dailyStepCounts[dateSig]
                });
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
    "20220118": 1116,
    "20220119": 2232,
    "20220120": 1124,
    "20220121": 461,
    "20220122": 130,
    "20220123": 1269,
    "20220124": 342,
    "20220125": 3435,
    "20220126": 707,
    "20220127": 727,
    "20220128": 421,
    "20220129": 0,
    "20220130": 505,
    "20220131": 522,
    "20220201": 604,
    "20220202": 1012,
    "20220203": 0,
    "20220204": 371,
    "20220205": 538,
    "20220206": 674,
    "20220207": 1099,
    "20220208": 0,
    "20220209": 1585,
    "20220210": 0,
    "20220211": 1233,
    "20220212": 1087,
    "20220213": 2035,
    "20220214": 1666,
    "20220215": 1542,
    "20220216": 2054,
    "20220217": 0,
    "20220218": 1688,
    "20220219": 511,
    "20220220": 521,
    "20220221": 0,
    "20220222": 1808,
    "20220223": 553,
    "20220224": 1091,
    "20220225": 1115,
    "20220236": 606
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
