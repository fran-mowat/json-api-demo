const apiURL = "https://jsonplaceholder.typicode.com/users"; //URL of the API

let displayData = []; 

//fetch data using async/await and arrow functions 
const fetchData = async() => {
    try{
        const response = await fetch(apiURL);
        const data = await response.json();

        //destructure data using map  
        displayData = data.map(({name, email, phone, website, company}) => ({
            name, 
            email,
            phone, 
            website, 
            company: company.name
        }));

        renderUsers(displayData);

        getEmail("Sincere@april.biz")
        .then(message => console.log(message))
        .catch(error => console.error(error));

        exampleArrayManipulation();
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
};

//render data in HTML
const renderUsers = (users) => {
    const userList = document.getElementById("user-list");
    userList.innerHTML = "";

    users.forEach(({name, email, phone, website, company}) => {
        const userCard = document.createElement("div");
        userCard.classList.add('user-card');
        userCard.innerHTML = `
        <strong>${name}</strong><br>
        Email: ${email}<br>
        Phone: ${phone}<br>
        Website: <a href="http://${website} target="_blank">${website}</a><br>
        Company: ${company}`;

        userList.append(userCard);
    });
};

const getEmail = (email) => { //promise function to get user details by email 
    return new Promise((resolve, reject) => {
    //find users with matching email using filter 
    const user = displayData.find(user => user.email === email);
    if (user){
        resolve(`User found: ${user.name}, company: ${user.company}`);
    } else {
        reject(`User not found`);
    }
});
};

//using spread operator spread operator to combine user data 
const getContactInfo = (...users) => {
    return users.map(({name, phone, email}) => ({
        name, 
        ContactInfo: `Phone: ${phone}, Email: ${email}`
    }));
};

const exampleArrayManipulation = () => {
    //filter users within company names containing 'Romaguera'
    const filteredUsers = displayData.filter(user => 
        user.company.includes("Romaguera"));
    
    //obtain user names using map 
    const userNames = filteredUsers.map(user => user.name);

    //count total users in filtered list with reduce 
    const totalUsers = filteredUsers.reduce((count) => count + 1, 0);

    console.log(`Filtered user names: ${userNames.join(", ")}`);
    console.log(`Total users in filtered list: ${totalUsers}`);
};

fetchData();
