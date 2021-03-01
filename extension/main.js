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
    const layout = `
    <p style="font-size:1.25rem; margin-top: 15px;">    
        <img src="/build/images/building-light.svg" width="24" height="24" class="headline-icon">    
        Today in the office:
    </p>
    <div style="height: 200px; width: auto; background: white; bottom: 0px; right: 0px; z-index: 100; overflow-y: auto; padding: 5px; font-family: PT Sans,sans-serif;">
        
    </div>
    `;
    const createPreviewContainer = () => {
        let preview = document.createElement("div");
        return preview;
    };
    let preview = createPreviewContainer();
    preview.insertAdjacentHTML('beforeend', layout);
    getBookings()
        .then((bookingsAPIResponse) => {
        let bookings = bookingsAPIResponse["hydra:member"];
        const floorSelectorBlock = document.querySelector("#app > div > div > div:nth-child(1) > div.row.ml-0.mr-0.mb-5.text-center.content-wrapper > div:nth-child(2)");
        floorSelectorBlock.appendChild(preview);
        bookings.forEach(booking => {
            if (new Date(booking.from).toDateString() === new Date().toDateString()) {
                roomsAPIResponse["hydra:member"].forEach(room => {
                    room.seats.forEach(seat => {
                        if (booking.seat.id === seat.id) {
                            var bookingElement = document.createElement("p");
                            var bookingInfo = document.createTextNode(room.name + ' : ' + booking.user.lastName);
                            //preview.querySelector("div:nth-child(3) > p > img").style.background = booking.user.lastName == "Noel" && "red";
                            bookingElement.appendChild(bookingInfo);
                            preview.querySelector("div:nth-child(3) > div").appendChild(bookingElement);
                        }
                    });
                });
            }
        });
        console.log("full response: ", bookingsAPIResponse);
    });
});
showWhosThere();
//# sourceMappingURL=main.js.map