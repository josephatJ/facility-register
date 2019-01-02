import * as _ from 'lodash';


export function createFacilityInfoObject(model, parentInfo, systemId) {
  const facilityInfo = {
    'code': model.code,
    'name': model.name,
    'id': systemId,
    'shortName': model.shortName,
    'path': parentInfo.path + '/' + systemId,
    'featureType': 'NONE',
    'openingDate': '1899-12-30T23:27:16.000',
    'parent': {
      'id': parentInfo.id
    },
    'user': {
      'id': 'ELelSS7HfqW'
    },
    'attributeValues': [],
    'translations': []
  };
  return facilityInfo;
}


export function createFullInfoFacilityObject(orgUnits, systemId, parentInfo, model, typeOfAction, userInformation) {
  const facilityObj = {
    'id': '',
    'href': '',
    'level': 4,
    'created': '',
    'name': '',
    'shortName': '',
    'code': '',
    'parent': {
      'id': ''
    },
    'leaf': true,
    'path': '',
    'favorite': false,
    'dimensionItemType': 'ORGANISATION_UNIT',
    'externalAccess': false,
    'featureType': 'NONE',
    'openingDate': '',
    'access': {
      'read': true,
      'update': true,
      'externalize': true,
      'delete': true,
      'write': true,
      'manage': true
    },
    'user': {
      'id': ''
    },
    'translations': [],
    'ancestors': [],
    'legendSets': [],
    'programs': [],
    'organisationUnitGroups': [],
    'dataSets': [],
    'favorites': []
  }

  const unConfirmedOrgUnits = {
    'organisationUnits': []
  };

  facilityObj.id = systemId;
  facilityObj.parent.id = parentInfo.id;
  facilityObj.path = parentInfo.path + '/' + systemId;
  facilityObj.name = model.name;
  facilityObj.shortName = model.shortName;
  facilityObj.code = model.code;
  facilityObj.user.id = userInformation.id;

  model.dataSets.forEach((dataSetObj) => {
    const dataSetObject = {
      'id': dataSetObj.id
    };
    facilityObj.dataSets.push(dataSetObject);
  });

  const newOrgObj = {
    'action': typeOfAction,
    'object': facilityObj,
    'path': parentInfo.path + '/' + systemId['codes'][0]
  };
  orgUnits.organisationUnits.forEach((org) => {
    unConfirmedOrgUnits.organisationUnits.push(org);
  });
  unConfirmedOrgUnits.organisationUnits.push(newOrgObj);

  return unConfirmedOrgUnits;
}

export function getGroupSetInfoBySelectedOrgUnit(selectedOrgUnit, orgUnitGroupSet, allLevelFourOrgUnits) {
  const dataForTable = []; let totalOrgUnits = 0;
  orgUnitGroupSet['organisationUnitGroups'].forEach((group) => {
    totalOrgUnits += getGroupLevelCount(selectedOrgUnit, group.organisationUnits);
  });


  const countsOfOusIngroup = getGroupLevelCount(selectedOrgUnit, allLevelFourOrgUnits);
  orgUnitGroupSet['organisationUnitGroups'].forEach((group) => {
    let denominator = 0;
    if (totalOrgUnits > countsOfOusIngroup) {
      denominator = totalOrgUnits;
    } else {
      denominator = countsOfOusIngroup;
    }
    const obj = {
      'name': group.name,
      'numberOfOrgUnitsLevelFour': getGroupLevelCount(selectedOrgUnit, group.organisationUnits),
      'percentage': _.round((getGroupLevelCount(selectedOrgUnit, group.organisationUnits) / denominator) * 100, 1)
    };
    dataForTable.push(obj);
  });
  return {dataForTable: dataForTable, totalOrgUnitsInGroup: totalOrgUnits, overAllTotal: countsOfOusIngroup};
}

export function getGroupSetInfoForChart(selectedOrgUnit, orgUnitGroupSet, allLevelFourOrgUnits) {
  const data = [];
  let totalOrgUnits = 0;
  orgUnitGroupSet['organisationUnitGroups'].forEach((group) => {
    const obj = {
      'name': group.name,
      'y': getGroupLevelCount(selectedOrgUnit, group.organisationUnits)
    };
    totalOrgUnits += getGroupLevelCount(selectedOrgUnit, group.organisationUnits);
    data.push(obj);
  });
  data.sort((a, b) => {
    const first = a.name.toLowerCase();
    const next = b.name.toLowerCase();
    if (first < next) {return -1; }
    if (first > next) {return 1; }
    return 0;
  });
  if (getGroupLevelCount(selectedOrgUnit, allLevelFourOrgUnits) > totalOrgUnits) {
    data.push({'name': 'Others', 'y': getGroupLevelCount(selectedOrgUnit, allLevelFourOrgUnits) - totalOrgUnits});
  }
  return data;
}


function getGroupLevelCount(selectedOrgUnit, organisationUnits) {
  let count = 0;
  organisationUnits.forEach((orgUnit) => {
    if (orgUnit.path.indexOf(selectedOrgUnit) >= 0) {
      count ++;
    }
  });

  return count;
}

