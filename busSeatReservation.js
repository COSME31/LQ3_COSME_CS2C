// User data structure
const users = {}; // This will hold username-password pairs

// Function to authenticate user
function authenticate(username, password) {
    return users[username] === password;
}

// Function to register a new user
function registerUser (username, password) {
    if (users[username]) {
        console.log("Username already exists. Please choose a different username.");
    } else {
        users[username] = password;
        console.log("User  registered successfully.");
    }
}

// Bus data structure
const buses = [
    { name: 'Bus A', destination: 'Cubao', seats: Array(30).fill(null) },
    { name: 'Bus B', destination: 'Baguio', seats: Array(30).fill(null) },
    { name: 'Bus C', destination: 'Pasay', seats: Array(30).fill(null) },
];

// Function to display bus information
function displayBus(bus) {
    console.log(`Bus Name: ${bus.name}, Destination: ${bus.destination}`);
    bus.seats.forEach((passenger, index) => {
        console.log(`Seat ${index + 1}: ${passenger ? passenger : "AVAILABLE"}`);
    });
}

// Function to display available seats
function displayAvailableSeats(bus) {
    const availableSeats = bus.seats.map((passenger, index) => ({
        seat: index + 1,
        name: passenger
    })).filter(seat => seat.name === null);

    if (availableSeats.length === 0) {
        console.log("Fully Booked");
    } else {
        console.log("Available Seats:");
        availableSeats.forEach(seat => console.log(`Seat ${seat.seat}`));
    }
}

// Function to sort passengers by name
function sortPassengers(bus) {
    return bus.seats.map((passenger, index) => ({ seat: index + 1, name: passenger }))
        .filter(seat => seat.name !== null)
        .sort((a, b) => a.name.localeCompare(b.name));
}

// Main program
function busSeatReservation() {
    let isLoggedIn = false;
    let currentUser  = '';

    while (true) {
        const userType = prompt("Enter your choice\n1 for TICKET PERSON\n2 for CUSTOMER\n3. Exit");
        if (userType === '1') {
            // User authentication
            const action = prompt("Enter 'a' to log in or 'b' to create a new account").toUpperCase();
            if (action === 'B') {
                let username = prompt("Enter a username:");
                let password = prompt("Enter a password:");
                registerUser (username, password);
            } else if (action === 'A') {
                let username = prompt("Enter username:");
                let password = prompt("Enter password:");

                if (authenticate(username, password)) {
                    isLoggedIn = true;
                    currentUser  = username;

                    while (isLoggedIn) {
                        const action = prompt("Choose an action: LOGOUT, VIEW, MANAGE").toUpperCase();

                        if (action === 'LOGOUT') {
                            isLoggedIn = false;
                            console.log("Logged out successfully.");
                        } else if (action === 'VIEW') {
                            buses.forEach(displayBus);
                            prompt("Press ENTER to continue.");
                        } else if (action === 'MANAGE') {
                            const busIndex = prompt("Which bus to manage? (Enter 1 for Bus A, 2 for Bus B, 3 for Bus C)") - 1;
                            if (busIndex < 0 || busIndex >= buses.length) {
                                console.log("Invalid bus selection.");
                                continue;
                            }
                            const manageAction = prompt("Choose to ADD or REMOVE a reservation (A/R):").toUpperCase();
                            if (manageAction === 'A') {
                                displayAvailableSeats(buses[busIndex]);
                                const seatNumber = prompt("Enter seat number to reserve (1-30):") - 1;
                                if (buses[busIndex].seats[seatNumber] === null) {
                                    const customerName = prompt("Enter customer name:");
                                    buses[busIndex].seats[seatNumber] = customerName;
                                    console.log(`Seat ${seatNumber + 1} reserved for ${customerName}.`);
                                } else {
                                    console.log("Seat is already taken.");
                                }
                            } else if (manageAction === 'R') {
                                const customerName = prompt("Enter customer name to remove reservation:");
                                const seatIndex = buses[busIndex].seats.findIndex(seat => seat === customerName);
                                if (seatIndex !== -1) {
                                    const confirmCancel = prompt(`Are you sure you want to cancel the reservation for seat ${seatIndex + 1}? (yes/no)`);
                                    if (confirmCancel.toLowerCase() === 'yes') {
                                        buses[busIndex].seats[seatIndex] = null;
                                        console.log(`Reservation for seat ${seatIndex + 1} has been canceled.`);
                                    } else {
                                        console.log("Cancellation aborted.");
                                    }
                                } else {
                                    console.log("No reservation found under that name.");
                                }
                            } else {
                                console.log("Invalid action. Please try again.");
                            }
                        } else {
                            console.log("Invalid action. Please try again.");
                        }
                    }
                } else {
                    console.log("Invalid username or password.");
                }
            } else {
                console.log("Invalid action. Please try again.");
            }
        } else if (userType === '2') {
            while (true) {
                console.log("Available Buses:");
                buses.forEach(bus => console.log("Bus Name: ",bus.name, "Destination:", bus.destination));

                const customerAction = prompt("Choose an action:\nA. RESERVE\nB. CANCEL RESERVATION\nC. CANCEL");
                
                if (customerAction.toUpperCase() === 'A') {
                    const busIndex = prompt("Choose a bus to reserve (Enter 1 for Bus A, 2 for Bus B, 3 for Bus C)") - 1;
                    if (busIndex < 0 || busIndex >= buses.length) {
                        console.log("Invalid bus selection.");
                        continue;
                    }

                    displayAvailableSeats(buses);
                    const seatNumber = prompt("Enter seat number to reserve (1-30):") - 1;
                    if (buses[busIndex].seats[seatNumber] === null) {
                        const customerName = prompt("Enter your name:");
                        buses[busIndex].seats[seatNumber] = customerName;
                        console.log("Congratulations! Seat", seatNumber + 1, "reserved for ", customerName,'.');
                    } else {
                        console.log("Seat is already taken.");
                    }
                } else if (customerAction.toUpperCase() === 'B') {
                    const busIndex = prompt("Which bus did you reserve? (Enter 1 for Bus A, 2 for Bus B, 3 for Bus C)") - 1;
                    if (busIndex < 0 || busIndex >= buses.length) {
                        console.log("Invalid bus selection.");
                        continue;
                    }

                    const customerName = prompt("Enter your name:");
                    const seatIndex = buses[busIndex].seats.findIndex(seat => seat === customerName);

                    if (seatIndex !== -1) {
                        const confirmCancel = prompt(`Are you sure you want to cancel your reservation for seat ${seatIndex + 1}? (yes/no)`);
                        if (confirmCancel.toLowerCase() === 'yes') {
                            buses[busIndex].seats[seatIndex] = null;
                            console.log(`Reservation for seat ${seatIndex + 1} has been canceled.`);
                        } else {
                            console.log("Cancellation aborted.");
                        }
                    } else {
                        console.log("No reservation found under that name.");
                    }
                } else if (customerAction.toUpperCase() === 'C') {
                    console.log("Returning to main menu.");
                    break;
                } else {
                    console.log("Invalid action.");
                }
            }
        } else if (userType === "3") {
            console.log("Thank you for using the bus seat reservation system.");
            break;
        } else {
            console.log("Invalid user type.");
        }
    }
}

// Start the program
busSeatReservation();