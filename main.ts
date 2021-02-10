
let showWhosThere = async() => {
    let urlBookings : string = "https://app.1-50-office.de/api/bookings";
    let urlLocations : string = "https://app.1-50-office.de/api/locations";
    let urlFloors : string = "https://app.1-50-office.de/api/floors";
    let urlRooms : string = "https://app.1-50-office.de/api/rooms";

    const  getBookings = async () => {
        return fetch(urlBookings).then(
            res => res.json()
        ) 
    }

    const  getRooms = async () => {
        return fetch(urlRooms).then(
            res => res.json()
        ) 
    }

    const onlyUnique = (value, index, self) => {
        return self.indexOf(value) === index;
    };

    let bookingsAPIResponse = await getBookings();
    let roomsAPIResponse = await getRooms();
   
    console.log("full response: ", bookingsAPIResponse);
    let bookingInfo = [];
    bookingsAPIResponse["hydra:member"].forEach(booking => {
        if (new Date(booking.from).toDateString() === new Date().toDateString()) {
            roomsAPIResponse["hydra:member"].forEach(room => {
                room.seats.forEach(seat => {
                    if (booking.seat.id === seat.id) {
                        bookingInfo[booking.user.lastName] = room.name;
                    }
                });
            });
        }
    });

    console.log("bookingInfo: ", bookingInfo);
}

showWhosThere();
