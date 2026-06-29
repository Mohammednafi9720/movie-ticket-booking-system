class Node {
constructor(data){
this.data=data;
this.next=null;
}
}

let head=null;
let bookingCounter=0;

// MOVIES
const movies=[
{id:1,title:"Avengers Endgame",rating:"4.9",price:250,image:"https://m.media-amazon.com/images/I/81ExhpBEbHL._AC_SL1500_.jpg"},
{id:2,title:"Interstellar",rating:"4.8",price:220,image:"https://m.media-amazon.com/images/I/91kFYg4fX3L._AC_SL1500_.jpg"},
{id:3,title:"Oppenheimer",rating:"4.8",price:280,image:"https://m.media-amazon.com/images/I/71lqDylcvGL._AC_SL1500_.jpg"},
{id:4,title:"Batman",rating:"4.7",price:200,image:"https://m.media-amazon.com/images/I/71xbl9aQyHL._AC_SL1178_.jpg"},
{id:5,title:"Joker",rating:"4.7",price:180,image:"https://m.media-amazon.com/images/I/81m1S6gq1EL._AC_SL1500_.jpg"},
{id:6,title:"Avatar 2",rating:"4.8",price:300,image:"https://m.media-amazon.com/images/I/71niXI3lxlL._AC_SL1200_.jpg"}
];

// LINKED LIST
function addBookingToHistory(data){

const node=new Node(data);

if(!head){
head=node;
}
else{

let temp=head;

while(temp.next){
temp=temp.next;
}

temp.next=node;

}

}

// DISPLAY
const movieContainer=document.getElementById("movieContainer");

function displayMovies(list=movies){

movieContainer.innerHTML="";

list.forEach(m=>{

movieContainer.innerHTML+=`
<div class="movie-card">

<img src="${m.image}">

<h3>${m.title}</h3>

<p>⭐ ${m.rating}</p>

<h4>₹${m.price}</h4>

<button onclick="bookMovie(${m.id})">
Book Now
</button>

</div>
`;

});

}

displayMovies();

// SEARCH
function searchMovie(){

const val=
document
.getElementById("searchMovie")
.value
.toLowerCase();

displayMovies(
movies.filter(
m=>
m.title
.toLowerCase()
.includes(val)
)
);

}

// SEATS
const seats=[
["A1","A2","A3"],
["B1","B2","B3"]
];

let selectedSeats=[];

let bookedSeats=["A2"];

function generateSeats(){

const layout=
document.getElementById("seatLayout");

layout.innerHTML="";

seats.forEach(row=>{

row.forEach(seat=>{

const div=
document.createElement("div");

div.classList.add("seat");

div.innerText=seat;

if(
bookedSeats.includes(seat)
){

div.classList.add("booked");

}

else{

div.classList.add("available");

div.onclick=()=>{

if(
selectedSeats.includes(seat)
){

selectedSeats=
selectedSeats.filter(
s=>s!==seat
);

div.classList.remove(
"selected"
);

}

else{

selectedSeats.push(
seat
);

div.classList.add(
"selected"
);

}

};

}

layout.appendChild(div);

});

});

}

// BOOK
let selectedMovie=null;

function bookMovie(id){

selectedMovie=
movies.find(
m=>m.id===id
);

document
.getElementById("movieName")
.value=
selectedMovie.title;

selectedSeats=[];

generateSeats();

document
.getElementById("bookingModal")
.style.display=
"flex";

}

function closeModal(){

document
.getElementById("bookingModal")
.style.display=
"none";

}

// FORM
document
.getElementById(
"bookingForm"
)
.addEventListener(
"submit",
function(e){

e.preventDefault();

const name=
document
.getElementById(
"userName"
)
.value;

const seatCount=
Number(
document
.getElementById(
"seatCount"
)
.value
);

if(
selectedSeats.length
!==seatCount
){

alert(
"Select correct seats"
);

return;

}

bookedSeats.push(
...selectedSeats
);

const bookingId=
"BK"+
Math.floor(
Math.random()*99999
);

bookingCounter++;

document
.getElementById(
"bookingCount"
)
.innerText=
bookingCounter;

addBookingToHistory({

id:bookingId,

name,

movie:
selectedMovie.title,

seats:
selectedSeats.join(", ")

});

alert(
"Booking Successful: "+
bookingId
);

closeModal();

this.reset();

}
);

// HISTORY
function showBookingHistory(){

const history=
document
.getElementById(
"history"
);

history.innerHTML=
"<h3>Booking History</h3>";

if(!head){

history.innerHTML+=
"<p>No bookings yet</p>";

return;

}

let temp=head;

while(temp){

history.innerHTML+=`

<div class="admin-card">

<h4>
${temp.data.name}
</h4>

<p>
${temp.data.movie}
</p>

<p>
Seats:
${temp.data.seats}
</p>

</div>

`;

temp=temp.next;

}

}

// DELETE
function deleteFirstBooking(){

if(head){

head=head.next;

bookingCounter=
Math.max(
0,
bookingCounter-1
);

document
.getElementById(
"bookingCount"
)
.innerText=
bookingCounter;

showBookingHistory();

alert(
"First booking deleted"
);

}

}
