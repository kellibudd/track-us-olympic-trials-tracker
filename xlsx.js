
const XLSX = require('xlsx');

const usOlympicTrialStandardsMen = {
    // Add qualifying marks by event
};

const usOlympicTrialStandardsWomen = {
    // Add qualifying marks by event
};

const olympicStandardsMen = {
    // Add qualifying marks by event
};

const olympicStandardsWomen = {
    // Add qualifying marks by event
};

const assesAthleteQualification = (standards, mark, event) => {
    // determine if mark in event meets given standard requirements
};

// determine if need to use async/await
const convertQualifierDataToJSON = async (filePath) => {
    const workbook = await XLSX.readFile('./track-data.xlsx');
    const sheets = workbook.SheetNames;
    const mensData = sheets[0];
    const womensData = sheets[1];
    const mensPerformanceDataSON = await XLSX.utils.sheet_to_json(mensData);
    const womensPerformanceDataJSON = await XLSX.utils.sheet_to_json(womensData);

    return {
        men: {performanceData: mensPerformanceDataSON},
        women: {performanceData: womensPerformanceDataJSON}
    };
};

const formatQualifierDataAsMap = (performanceJSONData, group) => {

    let performanceMapByAthlete = {};
    performanceJSONData.forEach(athlete => {
        let event = athlete['EVENT'].toString();
        if (athlete['EVENT'].toString() === '3K SC') {
            event = '3000SC';
        }

        const usOlympicTrialStandard = group === 'men' ? usOlympicTrialStandardsMen : usOlympicTrialStandardsWomen;
        const olympicStandard = group === 'men' ? olympicStandardsMen : olympicStandardsWomen;
        
        performanceMapByAthlete[athlete['ATHLETE']] = {
            athlete: athlete['ATHLETE'],
            rankingInUS: athlete['RANK'],
            mark: athlete['MARK'],
            event,
            competitionGroup: group,
            // could just take oly trial status from json data
            hasUSOlympicTrialStandard: assesAthleteQualification(usOlympicTrialStandard, athlete['MARK'], event),
            hasOlympicStandard: olympicStandard, // could just take oly standard from json data
        }
    })

    return qualifierMapByName;
};

const { men, women } = await convertQualifierDataToJSON('./track-data.xlsx');
const menQualifierData = formatQualifierDataAsMap(men.qualifierList, 'men');
const womenQualifierData = formatQualifierDataAsMap(women.qualifierList, 'women');

