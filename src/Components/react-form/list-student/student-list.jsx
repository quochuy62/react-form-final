import React, { Component } from "react";
import { connect } from "react-redux";
import {deleteCreator,editCreator} from "../../../redux/reducers/react-form/react-form.action";
class ListSinhVien extends Component {
  render() {
    return (
      <div>
        <p className="text-danger">{this.props.errMsg ? this.props.errMsg : ""}</p>

<table className="table mt-4">
  <thead className="thead-dark">
    <tr>
      <th scope="col">Mã SV</th>
      <th scope="col">Họ và tên</th>
      <th scope="col">Số điện thoại</th>
      <th scope="col">Email</th>
      <th scope="col">Tùy chọn:</th>
    </tr>
  </thead>
  <tbody>
    {this.props.listStudent.map((p) => {
      return (
        <tr key={p.Id}>
          <th scope="row">{p.Id}</th>
          <td>{p.Name}</td>
          <td>{p.Phone}</td>
          <td>{p.Email}</td>
          <td>
            <button
              onClick={() => {
                this.props.dispatch(editCreator(p));
              }}
            >
              Sửa
            </button>
            <button
              onClick={() => {
                this.props.dispatch(deleteCreator(p.Id));
              }}
              className="mx-2"
            >
              Xóa
            </button>
          </td>
        </tr>
      );
    })}
  </tbody>
</table>
      </div>
    );
  }
}

const mapStateToProps = (rootReducer) => {
  return {
    listStudent: rootReducer.reactFormReducer.listStudent,
    errMsg: rootReducer.reactFormReducer.errMsg
  };
};

export default connect(mapStateToProps)(ListSinhVien);
