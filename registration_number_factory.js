  module. exports = function (storage) {
    var registrationMap = {};
    var regisNum = "";
    var regPlates = ['CA', 'CY', 'CK', 'CAW', 'CJ']
    var validReg = /[A-Z]+ [0-9].*-[0-9]*|[A-Z]+ [0-9].*/;
    // This functions parameter takes in an object
    if (storage) {
      registrationMap = storage;
    }


    async function checkReg(reg) {
      if (reg !== "") {
        regisNum = reg.toUpperCase();


        for (var i = 0; i < regPlates.length; i++) {
          if (regisNum.startsWith(regPlates[i])) {
            if(regisNum.match(validReg)){

            if (registrationMap[regisNum] === undefined) {
              registrationMap[regisNum] = 0;
            }
            return true
          }

        }

      }
      return false
      }
      }



    async function filter(town, list) {
      list = Object.keys(registrationMap);
      var regNumbersFromTown = [];

      if (town === "All"){
        return list
      }

      // loop over all your reg numbers
      for (var i = 0; i < list.length; i++) {
        var regNumber = list[i];
        // look for the ones starting with town - keep them in a list

          if (regNumber.startsWith(town)) {
            // return regList;
            regNumbersFromTown.push(regNumber);
          }



      }
      // once done - return the list
      return regNumbersFromTown;
    }


    async function regMap() {
      return registrationMap
    }

    async function regMapKeys() {
      return Object.keys(registrationMap)
    }

    return {
      checkReg,
      regMap,
      regMapKeys,
      filter,
    }

  }
