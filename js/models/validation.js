function Validation() {
  this.kiemTraRong = function (value, id, message) {
    if (!value) {
      get(id).style.display = "block";
      get(id).innerHTML = message;
      return false;
    }
    get(id).style.display = "none";
    get(id).innerHTML = "";
    return true;
  };
  this.kiemTraChucVu = function (select, id, message) {
    if (get(select).selectedIndex !== 0) {
      get(id).style.display = "none";
      get(id).innerHTML = "";
      return true;
    }
    get(id).style.display = "block";
    get(id).innerHTML = message;
    return false;
  };
  this.kiemTraDoDai = function (value, id, message, min, max) {
    if (value.length >= min && value.length <= max) {
      get(id).style.display = "none";
      get(id).innerHTML = "";
      return true;
    }
    get(id).style.display = "block";
    get(id).innerHTML = message;
    return false;
  };
  this.kiemTraChu = function (value, id, message) {
    var letter =
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
      "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
      "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
    if (value.match(letter)) {
      get(id).style.display = "none";
      get(id).innerHTML = "";
      return true;
    }
    get(id).style.display = "block";
    get(id).innerHTML = message;
    return false;
  };
  this.kiemTraSo = function (value, id, message, min, max) {
    if (value >= min && value <= max) {
      get(id).style.display = "none";
      get(id).innerHTML = "";
      return true;
    }
    get(id).style.display = "block";
    get(id).innerHTML = message;
    return false;
  };
  this.kiemTraTonTai = function (value, id, message, array) {
    var exist = false;
    for (var i = 0; i < array.length; i++) {
      var nv = array[i];
      if (nv.maNhanVien === value) {
        exist = true;
        break;
      }
    }
    if (exist) {
      get(id).style.display = "block";
      get(id).innerHTML = message;
      return false;
    }
    get(id).style.display = "none";
    get(id).innerHTML = "";
    return true;
  };
}
