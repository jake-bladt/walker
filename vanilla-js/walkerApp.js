const walkerApp = {};

// This will eventually be loaded from the service
walkerApp.dailyStepCounts = {
    "20220101": 390,
    "20220102": 69,
    "20220103": 594,
    "20220104": 741,
    "20220105": 1264,
    "20220106": 1008
};

// Page Actions
document.addEventListener('DOMContentLoaded',
    () => {

        const table = document.getElementById('stepsTable');

        for(let dateSig in walkerApp.dailyStepCounts) {
            if(walkerApp.dailyStepCounts.hasOwnProperty(dateSig)) {
                let row = table.insertRow();
                let dateCell = row.insertCell(0);
                dateCell.innerHTML = dateSig;

                let countCell = row.insertCell(1);
                countCell.innerHTML = walkerApp.dailyStepCounts[dateSig];
            }
        }
    },
    false);
