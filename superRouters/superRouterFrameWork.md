
# SUPER ROUTER FRAMEWORK

This is an ultra simple ultra light weight api-framework based on node.js express and mongoose.
The main idea is:
    - We create a copy of an object called SuperRouterOptions object. we can  fill the values in this object for the type of router we want to get.    
    - We create a mongoose model and give it to a function called getSuperRouter along with the SuperRouterOptions object. This spits out an express router.

    THE ROUTES
    =========== 
    - The  router (called SuperRouter) is an express router with 5 routes (create,read,readone, update,delete).

    UNIFORM FOR ALL ROUTES
    
    - DATA OBJECT :Every route expect the incooming data to be in an object called "data". This is uniform for all and will not be repeated again.
    - CHECKS FUNCTIONS :Every route in the SuperRouterOptions (opt) object can aSsign check functions (add them to checks array). These functions can just throw errors of some thing is wrong or can change some data in the "data" array.   

    EACH ROUTE INDIVIDUAL
    - Create Method:
        - Response :  will  have the data.item (singular)
        - In the SuperRouterOptions we assign a "get data for new object" function which will read the data provided and return a new object.
    - Read Method:
        - Response :  will  have the data.items (plural)
    - Readone Method:
        - Response :  will  have the data.item (singular)
    - Update Method:
        - Response :  will  have the data.item (singular)
    - Delete Method:
        - Response :  will  have the data.deleteObject

    ERROR HANDLING:
    - based on opt.debugMode = true/false the final error "catchFn" will send either {message: 'operation failed'} or a detailed / complete error.

    ADDITIONAL DETAILS
    ==================
    The methods (create, read,readone,update,delete) do not process "req" and res. THEY ARE DECOMUPLED.  This allow us to take these methods individually by just using SuperRouterOptions (opt) passing directly to a method.     