import React, { Component } from "react";
import { flushSync } from "react-dom";
import { connect } from "react-redux";
import {submitCreator,updateCreator} from "../../../redux/reducers/react-form/react-form.action";

class FormSinhvien extends Component {
  state = {
    value: {
      Id: "",
      Name: "",
      Phone: "",
      Email: ""
    },
    error: {
      Id: "",
      Name: "",
      Phone: "",
      Email: ""
    },

    touch: {
      Id: false,
      Name: false,
      Phone: false,
      Email: false
    },
  };

  handleValidate = () => {
    const newError = { ...this.state.error };
    const { value } = this.state;

    for (let prop in value) {
      switch (prop) {
        case "Phone": {
          newError[prop] = "";
          const REGEX_NUMBER = /^\d+$/;
          if (!REGEX_NUMBER.test(value[prop])) {
            newError[prop] = "Phải là số";
          }
          if (value[prop].length === 0) {
            newError[prop] = "Vui lòng nhập số điện thoại";
          }
          break;
        }
        case "Id": {

          newError[prop] = "";
          if (!(Number(value[prop]) <= 999 && Number(value[prop]) >= 1)) {
            newError[prop] = "Mã sinh viên phải nằm trong khoảng từ 1 đến 99";
          }
          const REGEX_NUMBER = /^\d+$/;
          if (!REGEX_NUMBER.test(value[prop])) {
            newError[prop] = "Vui lòng chỉ nhập số";
          }
          if (value[prop].length === 0) {
            newError[prop] = "Vui lòng nhập mã sinh viên";
          }
          break;
        }
        case "Email": {
          newError[prop] = "";
          const REGEX_EMAIL = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
          if (!REGEX_EMAIL.test(value[prop])) {
            newError[prop] = "Email không hợp lệ.";
          }
          if (value[prop].length === 0) {
            newError[prop] = "Vui lòng nhập Email";
          }
          break;
        }
        case "Name": {
          newError[prop] = "";
          if (value[prop].length === 0) {
            newError[prop] = "Vui lòng nhập tên";
          }
          break;
        }
        default:
          break;
      }
    }

    this.setState(prevState => ({
      ...prevState,
      error: newError
    }));

    return newError;
  };
  handleChange = (event) => {
    const { target } = event;
    const { value, name } = target;
    flushSync(() => {
      this.setState({
        value: {
          ...this.state.value,
          [name]: value,
        },
      });
    });
    this.handleValidate();
  };
  handleBlur = (event) => {
    const { name } = event.target;
    this.setState({
      touch: {
        ...this.state.touch,
        [name]: true,
      },
    });
    this.handleValidate();
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      touch: {
        Id: false,
        Name: false,
        Phone: false,
        Email: false
      },
    });
    const newError = this.handleValidate();
    const ready = Object.values(newError).every((i) => i.length === 0);
    if (ready === false) return;
    const action = this.props.editStudent
      ? updateCreator(this.state.value)
      : submitCreator(this.state.value);
    this.props.dispatch(action);
    this.setState({
      value: {
        Id: "",
        Name: "",
        Phone: "",
        Email: ""
      },
      touch: {
        Id: false,
        Name: false,
        Phone: false,
        Email: false
      },
    });
  };
  static getDerivedStateFromProps(newProps, currentState) {
    if (newProps.editStudent !== null) {
      if (newProps.editStudent.Id !== currentState.value.Id)
        return {
          value: newProps.editStudent,
        };
    }
    return null;
  }
  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className="mt-4 p-4"
        style={{
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        }}
      >
        <h2  style={{
          textAlign: "center",
        }} >THÔNG TIN SINH VIÊN</h2>
        <div style={{ borderBottom: "1px solid black", margin: "10px 0" }}></div>
        <div className="row">
          <div className="col-6">
            <div className="mb-3">
              <label htmlFor="Id" className="form-label">
                Mã SV
              </label>
              <input
                onBlur={this.handleBlur}
                value={this.state.value.Id}
                onChange={this.handleChange}
                disabled={this.props.editStudent}
                name="Id"
                className="form-control"
                id="stu_id"
              />
              {this.state.touch.Id && this.state.error.Id && (
                <p className="text-danger">{this.state.error.Id}</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="Phone" className="form-label">
                Số điện thoại
              </label>
              <input
                onBlur={this.handleBlur}
                value={this.state.value.Phone}
                name="Phone"
                onChange={this.handleChange}
                className="form-control"
                id="phone"
              />
              {this.state.touch.Phone && this.state.error.Phone && (
                <p className="text-danger">{this.state.error.Phone}</p>
              )}
            </div>
          </div>
          <div className="col-6">
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Họ và tên
              </label>
              <input
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                value={this.state.value.Name}
                name="Name"
                type="text"
                className="form-control"
                id="name"
              />

              {this.state.touch.Name && this.state.error.Name && (
                <p className="text-danger">{this.state.error.Name}</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                Email
              </label>
              <input
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                value={this.state.value.Email}
                name="Email"
                type="text"
                className="form-control"
                id="email"
              />

              {this.state.touch.Email && this.state.error.Email && (
                <p className="text-danger">{this.state.error.Email}</p>
              )}
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-success">
          {this.props.editStudent ? "Cập nhật" : "Thêm sinh viên"}
        </button>
      </form>
    );
  }
}

const mapStateToProps = (rootReducer) => {
  return {
    listStudent: rootReducer.reactFormReducer.listStudent,
    editStudent: rootReducer.reactFormReducer.editStudent,
  };
};

export default connect(mapStateToProps)(FormSinhvien);
