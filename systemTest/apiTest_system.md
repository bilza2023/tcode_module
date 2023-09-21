
The system:

I have a SuperRputer which takes in an options object and based on that create a router with CRRUD mthods.
    The main features
        - Options : The option object which contains all the options
        - Data : The incomming data that is to be passed to the CRRUD method.
        - CRRUD Methods: Totally independent we can us them with out SuperRouter as well.
        - SuperRouter : This is the http handler and call the desired route and finally send errors.
Testing Errors:
Upto SuperRouter the errors should just bubble up and here in catchFn we decide what to do with them.

Testing the system is actually testing it with different option objects
