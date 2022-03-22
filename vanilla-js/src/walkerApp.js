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
    "20220226": 606,
    "20220227": 641,
    "20220228": 860,
    "20220301": 1330,
    "20220302": 1102,
    "20220302": 451,
    "20220303": 1717,
    "20220304": 816,
    "20220305": 0,
    "20220306": 1209,
    "20220307": 247,
    "20220308": 263,
    "20220309": 1444,
    "20220310": 1108,
    "20220311": 3287,
    "20220312": 0,
    "20220313": 2500,
    "20220314": 427,
    "20220315": 820,
    "20220316": 509,
    "20220317": 1095,
    "20220318": 186,
    "20220319": 1294,
    "20220320": 2445,
    "20220321": 4777,
    "20220322": 1372
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
