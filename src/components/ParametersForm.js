import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { times, random } from "lodash";

class ParametersForm extends Component {
  state = { inputs: "0,0\n0,1\n1,0\n1,1", outputs: "0\n0\n0\n1" };
  handleChange = this.handleChange.bind(this);
  submit = this.submit.bind(this);
  splitData(text) {
    return text.split("\n").map((line) => line.split(",").map((x) => +x));
  }
  bodyMassIndex(weight, height) {
    return weight / (height * height);
  }
  generateRandomData(sampleSize) {
    return times(sampleSize, () => {
      const weight = random(10, 200, true);
      const height = random(1, 2.7, true);
      const isObese = this.bodyMassIndex(weight, height) > 30;
      return [[weight, height], [+isObese]];
    });
  }

  submit() {
    const rules = this.generateRandomData(50);

    this.props.onChange(rules);
  }

  handleChange(event) {
    event.stopPropagation();
    this.setState({ [event.target.name]: event.target.value }, () => {});
  }

  render() {
    return (
      <Form>
        <br />
        <Button onClick={this.submit}>Calcular</Button>
      </Form>
    );
  }
}

export default ParametersForm;
