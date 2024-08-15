db.getCollection("Sales").aggregate(

    // Pipeline
    [
        // Stage 1
        {
            $group: {
                _id: "$product_id", avgSales: { $avg: "$amount"}
            }
        },

        // Stage 2
        {
            $sort: { 
                avgSales: -1    
            }
        },

        // Stage 3
        {
            $limit: 5
        }
    ],

    // Options
    {

    }

    // Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

);