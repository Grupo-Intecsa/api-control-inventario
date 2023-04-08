const viewDocumentsCanceled = (id) => {
  return [
    {
      '$match': {
        '_id': id
      }
    }, 
    {
      '$lookup': {
        'from': 'fletes', 
        'let': { 'bussinessCostId': '$_id' },
        'pipeline': [
          {
            '$unwind': '$bussiness_cost'
          },
          {
            '$match': {
              '$expr': {
                '$and': [
                  { '$eq': ['$bussiness_cost', '$$bussinessCostId'] },
                  { '$ne': ['$isCancel_status', null] }
                ]
              }
            }
          }
        ],
        'as': 'fletes'
      }
    }, 
    {
      '$lookup': {
        'from': 'traslados', 
        'let': { 'bussinessCostId': '$_id' },
        'pipeline': [
          {
            '$match': {
              '$expr': {
                '$and': [
                  { '$eq': ['$bussiness_cost', '$$bussinessCostId'] },
                  { '$ne': ['$isCancel_status', null] }
                ]
              }
            }
          }
        ],
        'as': 'traslado'
      }
    }, 
    {
      '$lookup': {
        'from': 'rentas',
        'let': { 'bussinessCostId': '$_id' },
        'pipeline': [
          {
            '$match': {
              '$expr': {
                '$and': [
                  { '$eq': ['$bussiness_cost', '$$bussinessCostId'] },
                  { '$ne': ['$isCancel_status', null] }
                ]
              }
            }
          }
        ],
        'as': 'rentas'
      }
    }
  ]
  
}


const viewDocumentsNormal = (id) => {
  return [
    {
      '$match': {
        '_id': id
      }
    }, 
    {
      '$lookup': {
        'from': 'fletes', 
        'let': { 'bussinessCostId': '$_id' },
        'pipeline': [
          {
            '$unwind': '$bussiness_cost'
          },
          {
            '$match': {
              '$expr': {
                '$and': [
                  { '$eq': ['$bussiness_cost', '$$bussinessCostId'] },
                  { '$eq': ['$isCancel_status', null] }
                ]
              }
            }
          }
        ],
        'as': 'fletes'
      }
    }, 
    {
      '$lookup': {
        'from': 'traslados', 
        'let': { 'bussinessCostId': '$_id' },
        'pipeline': [
          {
            '$match': {
              '$expr': {
                '$and': [
                  { '$eq': ['$bussiness_cost', '$$bussinessCostId'] },
                  { '$eq': ['$isCancel_status', null] }
                ]
              }
            }
          }
        ],
        'as': 'traslado'
      }
    }, 
    {
      '$lookup': {
        'from': 'rentas',
        'let': { 'bussinessCostId': '$_id' },
        'pipeline': [
          {
            '$match': {
              '$expr': {
                '$and': [
                  { '$eq': ['$bussiness_cost', '$$bussinessCostId'] },
                  { '$eq': ['$isCancel_status', null] }
                ]
              }
            }
          }
        ],
        'as': 'rentas'
      }
    }
  ]
  
}


const viewAllDocuments = (id) => {
  return [
    [
      {
        '$match': {
          '_id': id
        }
      }, {
        '$lookup': {
          'from': 'fletes', 
          'localField': '_id', 
          'foreignField': 'bussiness_cost', 
          'as': 'fletes'
        }
      }, {
        '$lookup': {
          'from': 'traslados', 
          'localField': '_id', 
          'foreignField': 'bussiness_cost', 
          'as': 'traslado'
        }
      }, {
        '$lookup': {
          'from': 'rentas',
          'localField': '_id',
          'foreignField': 'bussiness_cost',
          'as': 'rentas'
        }
      }
    ]
  ]
}

module.exports = {
  viewDocumentsCanceled,
  viewAllDocuments,
  viewDocumentsNormal
}