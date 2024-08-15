db.getCollection("Persons").aggregate(

    // Pipeline
    [
        // Stage 1
        {
            $group: {
                _id: "$gender", 
                active: { 
                    $sum: { 
                        $cond: [{ $eq: ["$isActive", true]}, 1, 0]  
                        }  
                    },
                inactive: { 
                    $sum: { 
                        $cond: [{ $eq: ["$isActive", false]}, 1, 0]  
                        }  
                    }
            }
        }
    ],

    // Options
    {

    }

    // Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

);