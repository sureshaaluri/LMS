
    function validateForm() {
        var firstname = document.forms["Form"]["firstname"].value;
        var lastname = document.forms["Form"]["lastname"].value;
        var cor = document.forms["Form"]["cor"].value;
        var dob = document.forms["Form"]["dob"].value;
        if (firstname == "" || lastname == "" || cor == "" || dob=="") {
          alert("Please Fill All Required Field");
          return false;
        }
      }
  