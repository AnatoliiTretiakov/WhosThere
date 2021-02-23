var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let showWhosThere = () => __awaiter(this, void 0, void 0, function* () {
    let urlBookings = "https://app.1-50-office.de/api/bookings";
    let urlLocations = "https://app.1-50-office.de/api/locations";
    let urlFloors = "https://app.1-50-office.de/api/floors";
    let urlRooms = "https://app.1-50-office.de/api/rooms";
    const getBookings = () => __awaiter(this, void 0, void 0, function* () {
        return fetch(urlBookings).then(res => res.json());
    });
    const getRooms = () => __awaiter(this, void 0, void 0, function* () {
        return fetch(urlRooms).then(res => res.json());
    });
    let roomsAPIResponse = yield getRooms();
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
                            preview.appendChild(bookingElement);
                        }
                    });
                });
            }
        });
        document.body.appendChild(preview);
        console.log("full response: ", bookingsAPIResponse);
    });
});
showWhosThere();
//# sourceMappingURL=main.js.map