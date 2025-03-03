let buttons = document.querySelectorAll(".btn");
let display = document.querySelector(".display");
let operators = document.querySelectorAll(".op");
let equalbtn = document.getElementById("equalbtn");
let resetbtn = document.getElementById("clearbtn");
let signchangebtn = document.getElementById("reversebtn");
let sqrbtn = document.getElementById("sqrbtn");
let loperand = "";
let roperand = "";
let curOp = "NONE";
let erasable = false;
let opSelected = false;
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (!isNaN(btn.textContent)) addString(btn.textContent);
  });
});
sqrbtn.addEventListener("click", () => {
  operate(loperand, loperand, "mul");
});
signchangebtn.addEventListener("click", () => {
  if (!opSelected) {
    loperand = (-1 * parseFloat(loperand)).toString();
    display.textContent = loperand;
  } else if (opSelected) {
    roperand = (-1 * parseFloat(loperand)).toString();
    display.textContent = roperand;
  }
});
equalbtn.addEventListener("click", () => {
  if (opSelected && roperand != "") operate(loperand, roperand, curOp);
});
resetbtn.addEventListener("click", () => {
  reset();
});
operators.forEach((opbtn) => {
  opbtn.addEventListener("click", () => {
    switch (opbtn.id) {
      case "dividebtn":
        operatorChecks(opbtn);
        curOp = "divide";
        break;
      case "mulbtn":
        operatorChecks(opbtn);
        curOp = "mul";
        break;
      case "minusbtn":
        operatorChecks(opbtn);
        curOp = "minus";
        break;
      case "plusbtn":
        operatorChecks(opbtn);
        curOp = "plus";
        break;
      default:
        alert("Opselection Error");
    }
  });
});

function addString(number) {
  if (loperand === "" && roperand === "" && number === "0") return;
  if (!opSelected) {
    loperand += number;
    display.textContent = loperand;
  } else if (opSelected) {
    if (erasable) {
      display.textContent = "0";
      erasable = false;
    }
    roperand += number;
    display.textContent = roperand;
  }
}

function operatorChecks(op) {
  if (!opSelected) {
    op.style.backgroundColor = "rgb(227, 152, 102)";
    opSelected = true;
    erasable = true;
  } else if (op.id != `${curOp}btn`) {
    operators.forEach((opbtn) => {
      opbtn.style.backgroundColor = "rgb(228, 125, 56)";
    });
    op.style.backgroundColor = "rgb(227, 152, 102)";
  } else {
    opSelected = false;
    erasable = false;
    op.style.backgroundColor = "rgb(228, 125, 56)";
    operate(loperand, roperand, curOp);
  }
}

function operate(left, right, op) {
  left = parseFloat(left);
  right = parseFloat(right);
  let res = 0;

  switch (op) {
    case "divide":
      if (right === 0) {
        alert("Don't divide by Zero!");
        res = divide(left, 1);
        break;
      }
      res = divide(left, right);
      break;
    case "minus":
      res = sub(left, right);
      break;
    case "plus":
      res = plus(left, right);
      break;
    case "mul":
      res = mul(left, right);
      break;
  }

  // Format result: If integer, show without decimals; else, show up to 2 decimals
  display.textContent = Number.isInteger(res)
    ? res
    : parseFloat(res.toFixed(2));

  loperand = res;
  roperand = "";
  opSelected = false;
  operators.forEach((opbtn) => {
    opbtn.style.backgroundColor = "rgb(228, 125, 56)";
  });
}

function divide(l, r) {
  return l / r;
}
function sub(l, r) {
  return l - r;
}
function plus(l, r) {
  return l + r;
}
function mul(l, r) {
  return l * r;
}

function reset() {
  operators.forEach((opbtn) => {
    opbtn.style.backgroundColor = "rgb(228, 125, 56)";
  });
  loperand = "";
  roperand = "";
  display.textContent = "0";
  curOp = "NONE";
  erasable = false;
  opSelected = false;
}
