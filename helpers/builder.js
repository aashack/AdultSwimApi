import _ from "lodash";

const HEADERS = [
    'Id', 'Name', 'Status', 'Species', 'Type', 'Gender', 'Origin', 'Location', 'ImageURL'
];

const jsonOutputBuilder = (json) => {
    let outputArray = [];
    //let jsonObj = json.data.data.results;
    let jsonObj = _.get(json, "data.data.results", []);

    jsonObj.forEach((item) => {
        outputArray.push({
            id: item.id.toString(),
            name: item.name,
            status: item.status,
            species: item.species,
            type: item.type,
            gender: item.gender,
            origin: item.origin.name,
            location: item.location.name,
            ImageURL: item.image
        });
    });
    return { HEADERS, outputArray };
};

export default { 

    jsonOutputBuilder
}