
    function validateForm() {
      var username = document.forms["Form"]["username"].value;
      var pswd = document.forms["Form"]["pswd"].value;
      if (username == "" || pswd == "") {
        alert("Please Fill All Required Field");
        return false;
     }
    }
