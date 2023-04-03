const validarLogin = () => {
  alert("Teste");
};

let listUser = JSON.parse(localStorage.getItem("listUser"));
function signUpButton(e) {
  e.preventDefault();
  localStorage.setItem("flag", 0);
  let usernameInput = document.getElementById("username").value;
  let emailInput = document.getElementById("email").value;
  let passwordInput = document.getElementById("password").value;
  let infoUser = {
    username: usernameInput,
    password: passwordInput,
    email: emailInput,
    status: "Available",
  };
  if (listUser == null) {
    listUser = [];
    listUser.push(infoUser);
    localStorage.setItem("listUser", JSON.stringify(listUser));
  } else {
    let duplicateUser = listUser.find((user) => user.email === emailInput);
    if (duplicateUser) {
      alert("Email đã được sử dụng. Vui lòng nhập email khác.");
    } else {
      listUser.push(infoUser);
      localStorage.setItem("listUser", JSON.stringify(listUser));
      result.innerHTML = `<div class="toast1" style="position: absolute; bottom: 700px;">
      <div class="toast-header">
          <strong class="mr-auto" style="font-size:18px">Đăng ký thành công</strong>
      </div>
      <div class="toast-body" style="font-size:18px">
      Xin chào !
      </div>  
      </div>`;
    }
  }
}
function signInButton(e) {
  e.preventDefault();
  let userInput = document.getElementById("userEmail").value;
  let passwordInput = document.getElementById("userPassword").value;
  localStorage.setItem("flag", 1);
  let registeredUser = listUser.find(
    (user) => user.email === userInput && user.password === passwordInput
  );

  if (registeredUser) {
    localStorage.setItem("flag", 1);
    if (registeredUser.status === "Unavailable") {
      result.innerHTML = `<div class="toast1" style="position: absolute; bottom: 100px;">
      <div class="toast-header">
          <strong class="mr-auto" style="font-size:18px">Tài khoản đã bị khóa</strong>
      </div>
      <div class="toast-body" style="font-size:18px">
      Liên hệ với quản trị viên để biết thêm chi tiết.
      </div>  
      </div>`;
    } else if (
      userInput === "fishyshynn@admin.com" &&
      passwordInput === "123123"
    ) {
      result.innerHTML = `<div class="toast1" style="position: absolute; bottom: 100px;">
      <div class="toast-header">
          <strong class="mr-auto" style="font-size:18px">Đăng nhập thành công</strong>
      </div>
      <div class="toast-body" style="font-size:18px">
      Xin chào, ADMIN!
      </div>  
      </div>`;
      setTimeout(() => {
        window.location.href = "adminProductne.html";
      }, 2000);
    } else {
      localStorage.setItem("flaguser", userInput);
      result.innerHTML = `<div class="toast1" style="position: absolute; bottom: 100px;">
      <div class="toast-header">
          <strong class="mr-auto" style="font-size:18px">Đăng nhập thành công</strong>
      </div>
      <div class="toast-body" style="font-size:18px">
      Xin chào, ${userInput}!
      </div>  
      </div>`;
      setTimeout(() => {
        window.location.href = "../index.html";
      }, 2000);
    }
  } else {
    document.getElementById("result").innerHTML =
      "Email hoặc mật khẩu không đúng.";
    localStorage.setItem("flag", 0);
  }
}
let flag = localStorage.getItem("flag");
if (flag == 1) {
  // let test = JSON.parse(localStorage.getItem("listUser"));
  // let userNameLocal = test[0].username;

  // document.getElementById("changeIndex").innerHTML = `Hi, ${userNameLocal}`;
  // document.getElementById(
  //   "logOutButton"
  // ).innerHTML = `<button class="logOutInd" onclick="logout()">Đăng xuất</button>`;
  // document
  //   .getElementById("changeIndex")
  //   .addEventListener("click", function (event) {
  //     event.preventDefault(); // Ngăn chặn hành động mặc định của thẻ a
  //     this.disabled = true; // Thiết lập thuộc tính disabled của thẻ a là true
  //   });
  let listUser = JSON.parse(localStorage.getItem("listUser"));
  for (let i = 0; i < listUser.length; i++) {
    let flaguser = localStorage.getItem("flaguser");
    sessionStorage.setItem("currentUser", flaguser);
    document.getElementById("changeIndex").innerHTML = `Hi, ${flaguser}`;
    document.getElementById(
      "logOutButton"
    ).innerHTML = `<button class="logOutInd" onclick="logout()">Đăng xuất</button>`;
    document
      .getElementById("changeIndex")
      .addEventListener("click", function (event) {
        event.preventDefault(); // Ngăn chặn hành động mặc định của thẻ a
        this.disabled = true; // Thiết lập thuộc tính disabled của thẻ a là true
      });
  }
}
function logout() {
  flag = 0;
  localStorage.removeItem("flag");
  localStorage.removeItem("flaguser");
  sessionStorage.removeItem("currentUser");
  localStorage.removeItem("numberCart");
  window.location.href = "index.html";
}
const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});
function renderProduct() {
  let listProduct = JSON.parse(localStorage.getItem("listProduct"));
  let productAdded = document.getElementById("product");

  for (let i = 0; i < listProduct.length; i++) {
    let result =
      // `
      //     <div class="element card col-5 col-lg-3 col-xl-3">
      //       <div class="box_img">
      //         <img src="${listProduct[i].img}" alt="${
      //   listProduct[i].ten
      // }" width="100%"/>
      //       </div>
      //       <p class="nameproduct">${listProduct[i].ten}</p>
      //       <span class="price" style="color: #1939bc">${
      //         listProduct[i].gia + `VNĐ`
      //       }</span>
      //       <button id="addCart" class="addCart" onclick="addToCart(${
      //         listProduct[i].ID
      //       })">
      //         Thêm vào giỏ hàng
      //       </button>
      //     </div>
      //   `;
      `
          <div class="card box_img element" style="width: 18rem;">
            <img src="${
              listProduct[i].img
            }" class="card-img-top" alt="..." style="margin-left: -25px;border: 2px solid lightpink;">
            <div class="card-body">
              
              <p class="card-text price">${listProduct[i].ten}</p>
              <p class="card-text price">${listProduct[i].gia + `VNĐ`}</p>
              <button class="btn btn-primary addCart" onclick="addToCart(${
                listProduct[i].ID
              })">Thêm vào giỏ hàng</button>
            </div>
          </div>
      `;

    productAdded.innerHTML += result;
  }
}
renderProduct();

function addToCart(id) {
  let flaguser = localStorage.getItem("flaguser");
  if (flaguser == null) {
    const snackbar = document.createElement("div");
    snackbar.classList.add("snackbar");
    snackbar.innerText = "Vui lòng đăng nhập.";
    document.body.appendChild(snackbar);

    setTimeout(() => {
      snackbar.remove();
    }, 2000);
    setTimeout(() => {
      window.location.href = "../html/signupsignin.html";
    }, 2000);
  } else {
    let listProductCart = JSON.parse(localStorage.getItem("listProductCart"));
    let listProduct = JSON.parse(localStorage.getItem("listProduct"));
    if (listProductCart == null) {
      listProductCart = [];
    }
    for (let index = 0; index < listProduct.length; index++) {
      if (listProduct[index].ID == id) {
        let flag = true;
        for (let i = 0; i < listProductCart.length; i++) {
          if (
            listProductCart[i].ID == id &&
            listProductCart[i].username == flaguser
          ) {
            flag = false;
            break;
          } else {
            flag = true;
          }
        }
        if (!flag) {
          const snackbar = document.createElement("div");
          snackbar.classList.add("snackbar");
          snackbar.innerText = "Sản phẩm đã có trong giỏ hàng.";
          document.body.appendChild(snackbar);

          setTimeout(() => {
            snackbar.remove();
          }, 3000);
        } else {
          listProductCart.push(listProduct[index]);
          listProductCart[listProductCart.length - 1].username = flaguser;
          localStorage.setItem(
            "listProductCart",
            JSON.stringify(listProductCart)
          );
          const snackbar = document.createElement("div");
          snackbar.classList.add("snackbar");
          snackbar.innerText = "Đã  thêm vào giỏ hàng";
          document.body.appendChild(snackbar);

          setTimeout(() => {
            snackbar.remove();
          }, 3000);
        }
        break;
      }
    }
    renderNumberCart();
  }
}

function renderNumberCart() {
  let flaguser = localStorage.getItem("flaguser");
  let listProductCart = JSON.parse(localStorage.getItem("listProductCart"));
  let numberCart = 0;
  if (listProductCart) {
    for (let i = 0; i < listProductCart.length; i++) {
      if (listProductCart[i].username == flaguser) {
        numberCart++;
      }
    }
  }
  localStorage.setItem("numberCart", numberCart);
  document.getElementById("numberCart").innerHTML = numberCart;
}
document.getElementById("numberCart").innerHTML =
  localStorage.getItem("numberCart");
