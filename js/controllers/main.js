var callAPI = new CallAPI();
var validation = new Validation();

function get(id) {
  return document.getElementById(id);
}

function getEmployee() {
  callAPI
    .layDanhSachNhanVien()
    .then(function (result) {
      renderNV(result.data);
    })
    .catch(function (error) {
      console.error(error);
    });
}

getEmployee();

function renderNV(data) {
  var content = "";
  data.forEach(function (nv) {
    content += `<tr>
      <td>${nv.maNhanVien}</td>
      <td>${nv.tenNhanVien}</td>
      <td>${nv.chucVu}</td>
      <td>${nv.heSoChucVu}</td>
      <td>${nv.luongCoBan}</td>
      <td>${nv.soGioLamTrongThang}</td>
      <td>
        <button class="btn btn-success" onclick="btnSua('${nv.maNhanVien}')">Sửa</button>
        <button class="btn btn-danger" onclick="btnXoa('${nv.maNhanVien}')">Xóa</button>
      </td>
    </tr>`;
  });
  get("danhSach").innerHTML = content;
}

function btnXoa(id) {
  callAPI
    .xoaNhanVien(id)
    .then(function () {
      getEmployee();
    })
    .catch(function (error) {
      console.error(error);
    });
}

function btnSua(id) {
  get(
    "button"
  ).innerHTML = `<button class="btn btn-outline-primary" onclick="btnCapNhat(${id})">Cập nhật</button>`;
  callAPI
    .layThongTinNhanVien(id)
    .then(function (result) {
      var employee = result.data;
      get("maNV").disabled = true;
      get("maNV").value = employee.maNhanVien;
      get("tenNV").value = employee.tenNhanVien;
      get("chucVu").value = employee.chucVu;
      get("heSo").value = employee.heSoChucVu;
      get("luong").value = employee.luongCoBan;
      get("gio").value = employee.soGioLamTrongThang;
    })
    .catch(function (error) {
      console.error(error);
    });
}

function btnCapNhat(id) {
  var tenNV = get("tenNV").value;
  var chucVu = get("chucVu").value;
  var heSo = get("heSo").value;
  var luong = get("luong").value;
  var gio = get("gio").value;
  var isValid = true;
  isValid &=
    validation.kiemTraRong(tenNV, "tbTenNV", "Yêu cầu nhập tên") &&
    validation.kiemTraChu(tenNV, "tbTenNV", "Tên nhân viên phải là chữ");
  isValid &= validation.kiemTraChucVu(
    "chucVu",
    "tbChucVu",
    "Yêu cầu chọn chức vụ"
  );
  isValid &= validation.kiemTraRong(heSo, "tbHeSo", "Yêu cầu nhập hệ số");
  isValid &=
    validation.kiemTraRong(luong, "tbLuong", "Yêu cầu nhập lương") &&
    validation.kiemTraSo(
      luong,
      "tbLuong",
      "Lương không hợp lệ",
      1000000,
      20000000
    );
  isValid &=
    validation.kiemTraRong(gio, "tbGio", "Yêu cầu nhập giờ") &&
    validation.kiemTraSo(gio, "tbGio", "Giờ không hợp lệ", 50, 150);
  if (!isValid) return null;
  var nv = new Employee(id, tenNV, chucVu, heSo, luong, gio);
  callAPI
    .capNhatThongTinNhanVien(nv)
    .then(function () {
      getEmployee();
    })
    .catch(function (error) {
      console.error(error);
    });
  get("button").innerHTML =
    "<button class='btn btn-outline-primary' onclick='btnThem()'>Thêm nhân viên</button>";
  get("maNV").disabled = false;
  get("maNV").value = "";
  get("tenNV").value = "";
  get("chucVu").value = "Chọn chức vụ";
  get("heSo").value = "";
  get("luong").value = "";
  get("gio").value = "";
}

function btnThem() {
  var maNV = get("maNV").value;
  var tenNV = get("tenNV").value;
  var chucVu = get("chucVu").value;
  var heSo = get("heSo").value;
  var luong = get("luong").value;
  var gio = get("gio").value;
  var isValid = true;
  isValid &=
    validation.kiemTraRong(maNV, "tbMaNV", "Yêu cầu nhập mã") &&
    validation.kiemTraDoDai(
      maNV,
      "tbMaNV",
      "Độ dài ký tự phải từ 4 đến 6",
      4,
      6
    )
  //&& validation.kiemTraTonTai(maNV, "tbMaNV", "Mã nhân viên đã tồn tại", getEmployee());
  isValid &=
    validation.kiemTraRong(tenNV, "tbTenNV", "Yêu cầu nhập tên") &&
    validation.kiemTraChu(tenNV, "tbTenNV", "Tên nhân viên phải là chữ");
  isValid &= validation.kiemTraChucVu(
    "chucVu",
    "tbChucVu",
    "Yêu cầu chọn chức vụ"
  );
  isValid &= validation.kiemTraRong(heSo, "tbHeSo", "Yêu cầu nhập hệ số");
  isValid &=
    validation.kiemTraRong(luong, "tbLuong", "Yêu cầu nhập lương") &&
    validation.kiemTraSo(
      luong,
      "tbLuong",
      "Lương không hợp lệ",
      1000000,
      20000000
    );
  isValid &=
    validation.kiemTraRong(gio, "tbGio", "Yêu cầu nhập giờ") &&
    validation.kiemTraSo(gio, "tbGio", "Giờ không hợp lệ", 50, 150);
  if (!isValid) return null;
  var nv = new Employee(maNV, tenNV, chucVu, heSo, luong, gio);
  callAPI
    .themNhanVien(nv)
    .then(function () {
      getEmployee();
    })
    .catch(function (error) {
      console.error(error);
    });
  get("maNV").value = "";
  get("tenNV").value = "";
  get("chucVu").value = "Chọn chức vụ";
  get("heSo").value = "";
  get("luong").value = "";
  get("gio").value = "";
}
