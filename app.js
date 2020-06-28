/**
 * //This is for the basic basic understanding how the things work between modules
 * 
var budgetController = (function() { //this line gets immidiatly invoked due to () operator 

    var x = 23;  // variables declared here are private and cannot be accesed from outside
    var add = function(a) {
        return x + a;  
    }               // till here the variables are decalred in scope and returned a object ie below one
    return {// this is the returned object from above IIFE; this object contains method publicTest and a lots of methods just not this one only

        publicTest: function(b) {
            return add(b);
        }
    }       // object is what gets assigned to the budgetController variable
            //but as you know this method can accesss the variable to its predessor ie the closures 

})();

var UIController = (function() {

    //some code

}) ();

//saperation of concerns 
//but we need some way to connect these two

var controller = (function (budgetCtrl, UICtrl) {
    //budgetController.publicTest() we could use it like this bc they are accessible
    var z = budgetCtrl.publicTest(5);

    return {    //as you can see this return is for the iife which returns object so we are just adding another method to it
        anotherPublic: function() {
            console.log(z);  // so that z can be accessed by ouside this block
        }
    }
}) (budgetController,UIController); //so we will pass two parameter ie the above ones bc i want them to know about the other two

 * 
 */

 // real code starts here

 //BUDGET CONTROLLER
 var budgetController = (function () {

    // write your code here

 }) ();

 

 //UI CONTROLLER
 var UIController = (function () {

    //so we have all these strings of query selector so have to make it clean to do that
    var DOMstrings = {
        inputType :'.add__type', //now i only have to change stings here one and do not touch the code
        inputDescription : '.add__description',
        inputValue : '.add__value',
        inputBtn : '.add__btn',

    };

    return {
        getinput: function() {
            return {
            type : document.querySelector(DOMstrings.inputType).value, //will be inc or exp
            description : document.querySelector(DOMstrings.inputDescription).value,
            value : document.querySelector(DOMstrings.inputValue).value 
            };
            
            
            /**
             * recieve these values, so we need to return these value  to the other modules so one way is to use return like above
            var type = document.querySelector('.add__type').value; //will be inc or exp
            var description = document.querySelector('.add__description').value;
            var value = document.querySelector('.add__value').value; 
            but inorder to do we have to make few changes like how we define properties
             */
        },

        getDOMstrings: function() {
            return DOMstrings; // exposing DOMstrings to the other modules so that we do not have to make a copy there DRY do not repeat youself
        }
    }
 }) ();



 //GLOBAL APP CONTROLLER
 var controller = (function (budgetCtrl,UICtrl) {

    //lets create a funtion that removes some clutter and make our code a little bit organized and asthetic
    var setupEventListeners = function() {

        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem );

        document.addEventListener('keypress' , function(event) {
            if(event.keyCode === 13  || event.which === 13) {
                ctrlAddItem();


        }

    });

    }

    

    var ctrlAddItem = function() {

        //1. get the field input data
        var input = UICtrl.getinput();

        //2. add the item to the budget controller

        //3.add the item to the UI 

        //4. calculate the budget

        //5. display the budget on the UI
        
    }

    //setupEventListeners(); why isnt he calling this function inside  the IIFE
    
    //since we want it public we want to return a object
    return {
        init : function() {
            console.log('Application has started.');
            setupEventListeners();
        }
    };

 }) (budgetController,UIController);

 controller.init();