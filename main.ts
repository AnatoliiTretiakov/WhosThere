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
    let roomsAPIResponse = await getRooms();

    const createPreviewContainer = () => {
        let preview = document.createElement("div");
        preview.style.height = "200px";
        preview.style.width = "400px";
        preview.style.background = "white";
        preview.style.position = "fixed";
        preview.style.bottom = "0";
        preview.style.right = "0"; 
        preview.style.zIndex = "100";
        preview.style.overflowY = "auto";
        return preview;
    };
    let preview = createPreviewContainer();
    
    getBookings()
    .then((bookingsAPIResponse) => {
        let bookings = bookingsAPIResponse["hydra:member"];
        bookings.forEach(booking => {
            if (new Date(booking.from).toDateString() === new Date().toDateString()) {
                roomsAPIResponse["hydra:member"].forEach(room => {
                    room.seats.forEach(seat => {
                        if (booking.seat.id === seat.id) {
                            var bookingElement = document.createElement("p");
                            var bookingInfo = document.createTextNode(room.name + ' : ' + booking.user.lastName);
                            bookingElement.appendChild(bookingInfo);
                            preview.appendChild(bookingElement) ; 
                        }
                    });
                });  
            } 
        });
        document.body.appendChild(preview);
        console.log("full response: ", bookingsAPIResponse);
    })  
}

showWhosThere();