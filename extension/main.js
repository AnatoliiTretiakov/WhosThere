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
    const onlyUnique = (value, index, self) => {
        return self.indexOf(value) === index;
    };
    let bookingsAPIResponse = yield getBookings();
    let roomsAPIResponse = yield getRooms();
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
});
showWhosThere();
//# sourceMappingURL=main.js.map