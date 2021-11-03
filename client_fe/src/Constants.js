class Constants{
    constructor(userType, typeId){
         this.userType = userType;
         this.typeId = typeId;
    }
    allConstants(){
        Constants("ADMIN" , 1);
        Constants("BUYER" , 2);
        Constants("SUPPLIER" , 3);
        Constants("BANK" , 4);
    }
 }
 
 module.exports =  Constants