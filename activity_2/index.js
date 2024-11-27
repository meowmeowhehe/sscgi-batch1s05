/*
  Users:
  {
    number: "",
    password: "",
    current_load: "",
    history_load: ""
  }
*/
var users = [
  {
    number: "09260920542",
    password: "123",
    current_load: 0,
    history_load: [],
  },
  {
    number: "09350567898",
    password: "123",
    current_load: 0,
    history_load: [],
  },
];
var currentUser = {};

var registerForm = document.getElementById("registerForm");
var loginForm = document.getElementById("loginForm");
var loginRegister = document.getElementById("loginRegister");
var pasaLoad = document.getElementById("pasaLoad");

function noAccount() {
  registerForm.classList.remove("visually-hidden");
  loginForm.classList.add("visually-hidden");
}

function hasAccount() {
  registerForm.classList.add("visually-hidden");
  loginForm.classList.remove("visually-hidden");
}

function login(event) {
  event.preventDefault();

  let number = document.getElementById("login_number").value;
  let password = document.getElementById("login_password").value;

  let accountExist = false;
  for (const user of users) {
    if (user.number === number && user.password === password) {
      accountExist = true;
      currentUser = user;
    }
  }

  if (accountExist) {
    alert("Logged in successfully");

    document.getElementById("number").innerHTML = currentUser.number;
    document.getElementById("current_load").value = currentUser.current_load;
    loadHistoryLoad();

    loginRegister.classList.add("visually-hidden");
    pasaLoad.classList.remove("visually-hidden");

    // Reset
    document.getElementById("login_number").value = "";
    document.getElementById("login_password").value = "";
  } else {
    alert("No user found");

    // Reset
    document.getElementById("login_password").value = "";
  }
}

function register(event) {
  event.preventDefault();

  let number = document.getElementById("register_number").value;
  let password = document.getElementById("register_password").value;
  let confirm_password = document.getElementById("confirm_password").value;

  if (password === confirm_password) {
    let isRegistered = false;
    for (const user of users) {
      if (user.number === number) {
        isRegistered = true;
      }
    }

    if (isRegistered) {
      alert("Account is already registered");
    } else {
      alert("Account registered");

      users.push({
        number: number,
        password: password,
        current_load: 0,
        history_load: [],
      });

      // Reset
      document.getElementById("register_number").value = "";
      document.getElementById("register_password").value = "";
      document.getElementById("confirm_password").value = "";

      hasAccount();
    }
  } else {
    alert("Password doesn't match");

    // Reset
    document.getElementById("register_password").value = "";
    document.getElementById("confirm_password").value = "";
  }
}

function logout() {
  currentUser = {};

  loginRegister.classList.remove("visually-hidden");
  pasaLoad.classList.add("visually-hidden");
}

function addLoad(event) {
  event.preventDefault();

  let current_load = Number(document.getElementById("current_load").value);
  let add_load = Number(document.getElementById("add_load").value);

  if (add_load === 0) {
    alert("You can't reload 0!");
  } else if (add_load > 10000) {
    alert("Limit for adding load is 10,000 only!");

    // Reset
    document.getElementById("add_load").value = "";
  } else {
    alert("Loaded Successfully!");

    document.getElementById("current_load").value = current_load + add_load;
    for (const user of users) {
      if (user.number === currentUser.number) {
        user.current_load = current_load + add_load;

        break;
      }
    }

    // Reset
    document.getElementById("add_load").value = "";

    const modal = bootstrap.Modal.getInstance(
      document.getElementById("modalReload")
    );
    modal.hide();
  }
}

function loadHistoryLoad() {
  var tableOutput = "";
  var perLine = "";

  tableOutput += "<table class='table table-dark'>";

  perLine += "<tr>";
  perLine += "<th>Date & Time</th>";
  perLine += "<th>Number</th>";
  perLine += "<th>Load</th>";
  perLine += "<th>Balance</th>";
  perLine += "</tr>";

  for (const load of currentUser.history_load) {
    perLine += "<tr>";

    perLine += `<td>${load.date_and_time}</td>`;
    perLine += `<td>${load.mobile_number}</td>`;
    perLine += `<td>${load.load}</td>`;
    perLine += `<td>${load.balance}</td>`;

    perLine += "</tr>";
  }

  tableOutput += perLine;
  tableOutput += "</table>";

  document.getElementById("history_load").innerHTML = tableOutput;
}

function addHistoryLoad(newLoad) {
  for (const user of users) {
    if (user.number === currentUser.number) {
      user.history_load.unshift(newLoad);

      break;
    }
  }

  loadHistoryLoad();
}

function getFormattedDateTime() {
  const now = new Date();

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[now.getMonth()];
  const day = String(now.getDate()).padStart(2, "0");
  const year = now.getFullYear();

  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12; // Convert to 12-hour format

  return `${month} ${day}, ${year} ${hours}:${minutes} ${ampm}`;
}

function diminishLoad(event) {
  event.preventDefault();

  let mobile_number = document.getElementById("mobile_number").value;
  let current_load = Number(document.getElementById("current_load").value);
  let sub_load = Number(document.getElementById("sub_load").value);

  if (sub_load === 0) {
    alert("You can't pasaload 0!");

    // Reset
    document.getElementById("sub_load").value = "";
  } else if (sub_load > 10000) {
    alert("Limit for pasaloading is 10,000 only!");

    // Reset
    document.getElementById("sub_load").value = "";
  } else if (sub_load > current_load) {
    alert("Insufficient Load!");

    // Reset
    document.getElementById("mobile_number").value = "";
    document.getElementById("sub_load").value = "";
  } else {
    alert("Loaded Successfully!");

    document.getElementById("current_load").value = current_load - sub_load;

    for (const user of users) {
      if (user.number === currentUser.number) {
        user.current_load = current_load - sub_load;

        break;
      }
    }

    addHistoryLoad({
      date_and_time: getFormattedDateTime(),
      mobile_number: mobile_number,
      load: sub_load,
      balance: current_load - sub_load,
    });

    // Reset
    document.getElementById("mobile_number").value = "";
    document.getElementById("sub_load").value = "";
  }
}