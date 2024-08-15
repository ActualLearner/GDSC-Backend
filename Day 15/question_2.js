db.getCollection("Persons").aggregate(

    // Pipeline
    [
        // Stage 1
        {
            $group: {
                _id: "$favoriteFruit", popularity: { $sum: 1}
            }
        },

        // Stage 2
        {
            $sort: {
                popularity: -1   
            }
        }
    ],

    // Options
    {

    }

    // Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

);