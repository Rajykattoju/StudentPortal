var jpdbBaseURL = 'http://api.login2explore.com:5577';
var jpdbIRL = '/api/irl';
var jpbdIML = '/api/iml';
var studentDatabaseName = 'School-DB';
var studentRelationName = 'StudentRelation';
var connectionToken = '90933182|-31949319728299164|90951037';

$('#rollNo').focus();

//Function to validate and get data
function checkFormValidity() {
    var form = document.getElementById('student-enrollment');
    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return '';
    }
    var data = $('#student-enrollment').serializeArray().reduce(function (obj, item) {
        obj[item.name] = item.value;
        return obj;
    }, {});
    return JSON.stringify(data);;
}

//Function for return alter HTML code according to status of response
function alertHandlerHTML(status, message) {
    // 1--> Success , 0--> Warning

    if (status === 1) {
        return `<div class="alert  alert-success d-flex align-items-center alert-dismissible " role="alert">
                <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Info:"><use xlink:href="#info-fill"/></svg>
                <div>
                  <strong>Success!</strong> ${message}
                </div>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>`;
    } else {
        return `<div class="alert  alert-danger d-flex align-items-center alert-dismissible" role="alert">
        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"><use xlink:href="#exclamation-triangle-fill"/></svg>
        <div>
          <strong>Warning!</strong> ${message}
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
    }

}

////Function for append alter message into alter div
function alertHandler(status, message) {
    var alterHTML = alertHandlerHTML(status, message);
    let alertDiv = document.createElement('div');
    alertDiv.innerHTML = alterHTML;
    $('#disposalAlertContainer').append(alertDiv);
}

// Function for save record number into localstorage
function saveRecNoToLocalStorage(jsonObject) {
    var lvData = JSON.parse(jsonObject.data);
    localStorage.setItem('recordNo', lvData.rec_no);
}

// Function for disable all element on page except roll number input feild
function disableAllFeildExceptRollno() {
    $('#fullName').prop('disabled', true);
    $('#class').prop('disabled', true);
    $('#birthDate').prop('disabled', true);
    $('#inputAddress').prop('disabled', true);
    $('#enrollmentDate').prop('disabled', true);
    $('#resetBtn').prop('disabled', true);
    $('#saveBtn').prop('disabled', true);
    $('#updateBtn').prop('disabled', true);
}


//Function for reset form data and disable all other feild except roll number
function resetForm() {
    $('#rollNo').val("");
    $('#fullName').val("");
    $('#class').val("");
    $('#birthDate').val("");
    $('#inputAddress').val("");
    $('#enrollmentDate').val("");
    $('#rollNo').prop('disabled', false);
    disableAllFeildExceptRollno();
}

//Function for fill data if student already is present in database
function fillData(jsonObject) {
    if (jsonObject === "") {
        $('#fullName').val("");
        $('#class').val("");
        $('#birthDate').val("");
        $('#inputAddress').val("");
        $('#enrollmentDate').val("");
    } else {
        // student record number saved to localstorage
        saveRecNoToLocalStorage(jsonObject);

        // parse json object into JSON
        var data = JSON.parse(jsonObject.data).record;

        $('#fullName').val(data.name);
        $('#class').val(data.className);
        $('#birthDate').val(data.birthDate);
        $('#inputAddress').val(data.address);
        $('#enrollmentDate').val(data.enrollmentDate);
    }
}


//Function to check validity of Enrollment Number
function validateEnrollmentDate() {
    var inputBirthDate = $('#birthDate').val();
    var inputEnrollmentDate = $('#enrollmentDate').val();
    inputBirthDate = new Date(inputBirthDate);
    inputEnrollmentDate = new Date(inputEnrollmentDate);

    //Enrollment date should be greater than Birth date
    return inputBirthDate.getTime() < inputEnrollmentDate.getTime();

}


//Function to return stringified JSON object which contain roll number of student
function getStudentRollnoAsJsonObj() {
    var rollNO = $('#rollNo').val();
    var jsonStr = {
        rollNo: rollNO
    };
    return JSON.stringify(jsonStr);
}


// Function to query details of existing student
function getStudentData() {
    if ($('#rollNo').val() === "") { // if roll number is not given then disable all feild
        disableAllFeildExceptRollno();
    } else if ($('#rollNo').val() < 1) { // if roll number is not valid (i.e roll-no <1)
        disableAllFeildExceptRollno();
        alertHandler(0, 'Invalid Roll-No');
        $('#rollNo').focus();
    } else { // if roll number is valid
        var studentRollnoJsonObj = getStudentRollnoAsJsonObj();

        // create GET Request object
        var getRequest = createGET_BY_KEYRequest(connectionToken, studentDatabaseName, studentRelationName, studentRollnoJsonObj);

        jQuery.ajaxSetup({ async: false });
        // make GET request
        var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
        jQuery.ajaxSetup({ async: true });

        // Enable all feild
        $('#rollNo').prop('disabled', false);
        $('#fullName').prop('disabled', false);
        $('#class').prop('disabled', false);
        $('#birthDate').prop('disabled', false);
        $('#inputAddress').prop('disabled', false);
        $('#enrollmentDate').prop('disabled', false);


        if (resJsonObj.status === 400) { // if student is not exist already with same roll number then enable save and reset btn
            $('#resetBtn').prop('disabled', false);
            $('#saveBtn').prop('disabled', false);
            $('#updateBtn').prop('disabled', true);
            fillData("");
            $('#name').focus();
        } else if (resJsonObj.status === 200) {// if student is exist already with same roll number then enable update and reset btn
            $('#rollNO').prop('disabled', true);
            fillData(resJsonObj);
            $('#resetBtn').prop('disabled', false);
            $('#updateBtn').prop('disabled', false);
            $('#saveBtn').prop('disabled', true);
            $('#name').focus();
        }
    }



}

//Function to make PUT request to save data into database
function saveData() {
    var jsonStrObj = checkFormValidity()
    //var jsonStrObj = validateFormData();
    // // If form data is not valid
    if (jsonStrObj === '')
        return '';

    // create PUT Request object
    var putRequest = createPUTRequest(connectionToken, jsonStrObj, studentDatabaseName, studentRelationName);
    jQuery.ajaxSetup({ async: false });

    //Make PUT Request for saving data into database
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpbdIML);
    jQuery.ajaxSetup({ async: true });

    if (resJsonObj.status === 400) {// If data is not saved
        alertHandler(0, 'Data Is Not Saved ( Message: ' + resJsonObj.message + " )");
    } else if (resJsonObj.status === 200) {// If data is successfully saved
        alertHandler(1, 'Data Saved successfully');
    }
    //After saving to databse resent from data 
    resetForm();
}

//Function used to make UPDATE Request
function changeData() {
    $('#changeBtn').prop('disabled', true);
    var jsonChg = checkFormValidity(); // Before making UPDATE Request validate form data

    // Create UPDATE Request object
    var updateRequest = createUPDATERecordRequest(connectionToken, jsonChg, studentDatabaseName, studentRelationName, localStorage.getItem("recordNo"));
    jQuery.ajaxSetup({ async: false });

    //Make UPDATE Request
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpbdIML);
    jQuery.ajaxSetup({ async: true });

    if (resJsonObj.status === 400) {// If data is not saved
        alertHandler(0, 'Data Is Not Update ( Message: ' + resJsonObj.message + " )");
    } else if (resJsonObj.status === 200) {// If data is successfully saved
        alertHandler(1, 'Data Update successfully');
    }

    //After updating to databse resent from data
    resetForm();
    $('#empid').focus();
}


