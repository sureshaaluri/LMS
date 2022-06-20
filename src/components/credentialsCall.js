
export async function credentialsCall(UserDetails, resp, Credentials) {
    UserDetails.username = resp.firstName + resp.lastName;
    UserDetails.role = "Doctor";
    Credentials.entityDigitalAddress = resp.entityDigitalAddress;
    Credentials.schemaName = "dtx-Doctor";
    Credentials.attributes = [
        {
            "name": "issuerId",
            "value": resp.issuerId
        },
        {
            "name": "issuerDigitalAddr",
            "value": resp.issuerDigitalAddress
        },
        {
            "name": "issued",
            "value": resp.createdDate
        },
        {
            "name": "firstname",
            "value": resp.firstName
        },
        {
            "name": "lastname",
            "value": resp.lastName
        },
        // {
        //     "name": "licenseID",
        //     "value": UserDetails.licenseId
        // },
        {
            "name": "dateOfBirth",
            "value": resp.dateOfBirth
        },
        {
            "name": "gender",
            "value": UserDetails.gender
        },
        {
            "name": "address",
            "value": UserDetails.address
        },
        {
            "name": "contact",
            "value": UserDetails.contact
        },
        {
            "name": "digitalAddress",
            "value": resp.entityDigitalAddress
        },
        {
            "name": "did",
            "value": resp.entityId
        },
        {
            "name": "email",
            "value": UserDetails.email
        },
        {
            "name": "yearOfBirth",
            "value": new Date(UserDetails.dob).getFullYear()
        },
        // {
        //     "name" : "virus",
        //     "value" : ""
        // },
        // {
        //     "name" : "checkTime",
        //     "value" : ""
        // },
        // {
        //     "name" : "checkLocation",
        //     "value" : ""
        // },
        // {
        //     "name" : "checkedBy",
        //     "value" : ""
        // },
        // {
        //     "name" : "checkFacility",
        //     "value" : ""
        // },
        // {
        //     "name" : "diagnosisMethods",
        //     "value" : ""
        // },
    ]

    Credentials.entityId = resp.entityId;
    // const decodedToken = jwt_decode(userToken);
    // Credentials.attributes[0].value = resp.issuerId;
    UserDetails.did = Credentials.entityId;
}