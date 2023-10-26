// ctrl + p: tìm tên file trong dự án.
import React, { Component, } from "react";
import FormSinhvien from "./student-form/form-student";
import ListSinhVien from "./list-student/student-list";

export default class ReactForm extends Component {
  render() {
    return (
      <div className="container">
        <FormSinhvien />
        <ListSinhVien />
      </div>
    );
  }
}
