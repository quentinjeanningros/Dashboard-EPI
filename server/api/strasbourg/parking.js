let axios = require('axios');
let errors = require('../../utils/errors');

const desc = {
    name: "parkings",
    description: "Display actual status for a strasbourg parking",
    params: [{
        name: "parking",
        type: "string"
    }]
};

const parkings_nick = [
    ['1', 'zenith'],
    ['2', 'bateliers'],
    ['3', 'broglie'],
    ['4', 'baggersee'],
    ['5', 'ducs'],
    ['6', 'elsau'],
    ['7', 'rotonde'],
    ['8', 'gare'],
    ['9', 'aurelie'],
    ['10', 'wodli'],
    ['11', 'gutemberg'],
    ['12', 'kleber'],
    ['13', 'marais'],
    ['14', 'sebastopol'],
    ['15', 'robertsau'],
    ['16', 'meinau'],
    ['17', 'petite'],
    ['18', 'aar'],
    ['19', 'nicolas'],
    ['20', 'tanneurs'],
    ['21', 'austerlitz'],
    ['22', 'wilson'],
    ['23', 'rivetoile'],
    ['24', 'hoenheim'],
    ['25', 'poteries'],
    ['26', 'europeen'],
    ['27', 'esplanade'],
    ['28', 'hautepierre']
];

function isValidParking(tag) {
    for (let i = 0; i < parkings_nick.length; ++i) {
        if (tag == parkings_nick[i][1])
            return true;
    }
    return false;
}

function getTargetedParking(res, parkings, tag) {
    let ident = null;
    for (let i = 0; i < parkings_nick.length; ++i)
        if (tag == parkings_nick[i][1])
            ident = parkings_nick[i][0];
    for (let j = 0; j < parkings_nick.length; ++j) {
        if (parkings[j] != undefined)
            if (parkings[j].fields.ident == ident) {
                res.status(200);
                res.json({
                    state: parkings[j].fields.etat_descriptif,
                    empty: parkings[j].fields.libre,
                    total: parkings[j].fields.total
                });
            }
    }
}

function searchParking(req, res) {
    if (!isValidParking(req.params.parking)) {
        errors.badRequest(res, 400, "Parking doesn't exist.");
        return;
    }
    axios.get('https://data.strasbourg.eu/api/records/1.0/search/?dataset=occupation-parkings-temps-reel&rows=30&facet=etat_descriptif')
        .then(function(response) {
            getTargetedParking(res, response.data.records, req.params.parking)
        })
        .catch(function(error) {
            console.log(error);
            errors.badRequest(res, 400, "Error in parking request.");
        })
}

module.exports = {
    desc: desc,
    searchParking: searchParking
};