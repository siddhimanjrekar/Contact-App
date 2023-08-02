const Contact = require("./Contact")

class User {
    static allUsers = []
    static userID = 0
    constructor(fullname, isAdmin, gender,age){
        this.ID = User.userID++
        this.fullname = fullname
        this.gender = gender
        this.isAdmin = isAdmin
        this.age=age
        this.contacts = []
    }

    static newAdmin(fname, lname, gender,age){
        if (typeof(fname) != 'string'){
            return "Invalid First Name"
        }
        if (typeof(lname) != 'string'){
            return "Invalid Last Name"
        }
        if (gender != 'M' && gender != 'F' && gender.toUpperCase() != 'MALE' && gender.toUpperCase() != 'FEMALE'){
            return "Invalid Gender"
        }
        if (typeof age != "number") {
            return "Invalid age"
        }

        let fullname = fname + " " + lname
        return new User(fullname, true, gender,age)
    }

    newUser(fname, lname, gender,age){
        if (typeof(fname) != 'string'){
            return "Invalid First Name"
        }
        if (typeof(lname) != 'string'){
            return "Invalid Last Name"
        }
        if (gender != 'M' && gender != 'F' && gender.toUpperCase() != 'MALE' && gender.toUpperCase() != 'FEMALE'){
            return "Invalid Gender"
        }
        if (!this.isAdmin){
            return "Not Admin"
        }
        if (typeof age != "number") {
            return "Invalid age"
        }

        let fullname = fname + " " + lname
        let user = new User(fullname, false, gender,age)
        User.allUsers.push(user)
        return user
    }

    getAllUsers(){
        if (!this.isAdmin){
            return "Accesible to Administrators Only"
        }
        return User.allUsers
    }

    findUser(ID){
        // if (!this.isAdmin){
        //     return "Accessible to Administrators Only"
        // }
        for (let i=0; i < User.allUsers.length; i++) {
            if (User.allUsers[i].ID == ID){
                return [i, true]
            }
        }
        return [-1, false]
    }

    updateUser(ID, parameter, newValue){
        if (!this.isAdmin){
            return "Accessible to Administrators Only"
        }
        let [index, result] = this.findUser(ID)
        if (!result){
            return "User Not Found"
        }

        switch (parameter){
            case "fullname":
                if (typeof(newValue) != 'string'){
                    return "Invalid Name"
                }
                User.allUsers[index].fullname = newValue
                return User.allUsers[index]
            case "gender":
                if (newValue != 'M' && newValue != 'F' && newValue.toUpperCase() != 'MALE' && newValue.toUpperCase() != 'FEMALE'){
                    return "Invalid Gender"
                }
                User.allUsers[index].gender = newValue
                return User.allUsers[index]
            default:
                return "Invalid Parameter"
        }
        // return User.allUsers[index]
    }

    deleteUser(ID){
        if (!this.isAdmin){
            return "Accessible to Administrators Only"
        }
        let [index, result] = this.findUser(ID)
        if (!result){
            return "User Not Found"
        }

        User.allUsers.splice(index, 1)
        return "User Details Deleted Successfully"
    }

    newContact(fullname, country){
        if (typeof(fullname) != 'string'){
            return "Invalid Fullname"
        }
        if (typeof(country) != 'string'){
            return "Invalid Country"
        }
        if (this.isAdmin){
            return "Only Users can create new contacts"
        }

        let userContact = new Contact(fullname, country)
        this.contacts.push(userContact)
        return userContact
    }

    readContacts(){
        if (this.isAdmin){
            return "Only Users can access contacts"
        }
        return this.contacts
    }

    findContact(ID){
        for (let i=0; i < this.contacts.length; i++) {
            if (this.contacts[i].ID == ID){
                return [i, true]
            }
        }
        return [-1, false]
    }

    updateContact(ID, parameter, newValue){
        if (this.isAdmin){
            return "Only Users can access contacts"
        }

        let [index, result] = this.findContact(ID)

        if (!result){
            return "Contact Not Found"
        }

        let modifiedContact = this.contacts[index].updateContact(parameter, newValue)
        return modifiedContact
    }

    deleteContact(ID){
        if (this.isAdmin){
            return "Only Users can access contacts"
        }
        let [index, result] = this.findContact(ID)
        if (!result){
            return "Contact Not Found"
        }

        this.contacts.splice(index, 1)
        return "Contact Deleted Successfully"
    }

    newContactInfo(ID, infoType, infoValue){
        if (this.isAdmin){
            return "Only Users can access Contacts-Info"
        }

        let [index, result] = this.findContact(ID)
        if (!result){
            return "Contact Not Found"
        }

        let infoObj = this.contacts[index].newContactInfo(infoType, infoValue)
        return infoObj
    }

    getAllInfo(ID){
        if (this.isAdmin){
            return "Only Users can access Contacts-Info"
        }

        let [index, result] = this.findContact(ID)
        if (!result){
            return "Contact Not Found"
        }
        return this.contacts[index].contactInfo
    }

    updateContactInfo(ID, infoID, infoType, infoValue){
        if (this.isAdmin){
            return "Only Users can access Contacts-Info"
        }

        let [index, result] = this.findContact(ID)
        if (!result){
            return "Contact Not Found"
        }
        let info = this.contacts[index].updateContactInfo(infoID, infoType, infoValue)
        return info
    }

    deleteContactInfo(ID, infoID){
        if (this.isAdmin){
            return "Only Users can access Contacts-Info"
        }

        let [index, result] = this.findContact(ID)
        if (!result){
            return "Contact Not Found"
        }
        let info = this.contacts[index].deleteContactInfo(infoID)
        return info
    }

    getUserByID(userID){
        if (!this.isAdmin){
            return "Accessible to Administrators Only"
        }
        let [index, result] = this.findUser(userID)
        if (!result){
            return "User Not Found"
        }
        return User.allUsers[index]
    }

    getContactByID(contactID){
        if (this.isAdmin){
            return "Only Users can access contacts"
        }

        let [index, result] = this.findContact(contactID)

        if (!result){
            return "Contact Not Found"
        }
        return this.contacts[index]
    }

    getContactInfoByID(contactID, infoID){
        if (this.isAdmin){
            return "Only Users can access Contacts-Info"
        }

        let [index, result] = this.findContact(contactID)
        if (!result){
            return "Contact Not Found"
        }
        let info = this.contacts[index].getContactInfoByID(infoID)
        return info
    }
}

//New Admin
console.log("Create admin:");
let admin = User.newAdmin("Siddhi", "Manjrekar", "F",22)
console.log(admin);

//Create user
console.log("Create user:");
let user1 = admin.newUser("Suhas", "Manjrekar", "M",50)
console.log(user1);
let user2 = admin.newUser("Swati", "Manjrekar", "F",50)
console.log(user2);
let user3 = admin.newUser("abc", "xyz", "F",10)
console.log(user3);

//Read user
console.log("read user before updation: ");
console.log(admin.getAllUsers());

//update user
let updateuser3 = admin.updateUser(3, "fullname", "abc def")
console.log("read user after updation:");
console.log(admin.getAllUsers());

//delete user
let deleteuser3 = admin.deleteUser(3)
console.log("read user after deletion:");
console.log(admin.getAllUsers());

//Create Contact
console.log("Create Contact:");
console.log(user1.newContact("Siddhi Manjrekar contact", "India"));
console.log(user1.newContact("Suhas Manjrekar contact", "Australia"));
console.log(user1.newContact("Swati Manjrekar contact", "Srilanka"));

//Read contact
console.log("Read Contact before updation:");
console.log(user1.readContacts());

//Update contact
console.log("Read Contact after updation:");
console.log(user1.updateContact(1, "fullname", "zxcvb asdf")); 

//Delete contact
console.log(user1.deleteContact(2));
console.log("Read contact after deletion:");
console.log(user1.readContacts());

//Create contact info
console.log("Create contact info:");
console.log(user1.newContactInfo(0, "phone", 1234567890));
console.log(user1.newContactInfo(1, "email", "suhas@gmail.com"));

//Read contact info
console.log("Read contact info before updation:");
console.log(user1.getAllInfo(0));
console.log(user1.getAllInfo(1));

//Update contact info
console.log("Read contact info after updation:");
console.log(user1.updateContactInfo(0, 0, "infoValue", "0987654321"));
console.log(user1.updateContactInfo(1, 1, "infoValue", "suhasmanjrekar@gmail.com"));

//Delete contact info
console.log(user1.deleteContactInfo(0, 1));
console.log("Read contact info after deletion:");
console.log(user1.getAllInfo(0));

//Get user by ID
console.log("Get user by ID:");
console.log(admin.getUserByID(1));

//get contact by ID
console.log("Get contact by ID:");
console.log(user1.getContactByID(1));

//get contact info by ID
console.log("Get contact info by ID:");
console.log(user1.getContactInfoByID(0, 0));
