



function errorOther(){
    const randomNumber = Math.random() * 1000000;
    throw new Error (`Random Error : Random number ${randomNumber}`);
}

module.exports = errorOther;