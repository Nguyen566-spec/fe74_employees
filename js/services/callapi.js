function CallAPI() {
  this.layDanhSachNhanVien = function () {
    return axios({
      url: "http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien",
      method: "GET",
    });
  };
  this.layThongTinNhanVien = function (id) {
    return axios({
      url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=${id}`,
      method: "GET",
    });
  };
  this.capNhatThongTinNhanVien = function (employee) {
    return axios({
      url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien=${employee.maNhanVien}`,
      method: "PUT",
      data: employee,
    });
  };
  this.themNhanVien = function (employee) {
    return axios({
      url: "http://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien",
      method: "POST",
      data: employee,
    });
  };
  this.xoaNhanVien = function (id) {
    return axios({
      url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien=${id}`,
      method: "DELETE",
    });
  };
}
