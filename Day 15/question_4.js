db.getCollection("Persons").aggregate(

    // Pipeline
    [
        // Stage 1
        {
            $group: {
                _id: "$company.location.country", avgAge: { $avg: "$age"}
            }
        },

        // Stage 2
        {
            $sort: {
                avgAge: -1
            }
        }
    ],

    // Options
    {

    }

    // Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

);