import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { zip } from "lodash";

class ParametersForm extends Component {
  state = { inputs: "0,0\n0,1\n1,0\n1,1", outputs: "0\n0\n0\n1" };
  handleChange = this.handleChange.bind(this);
  submit = this.submit.bind(this);
  splitData(text) {
    return text.split("\n").map((line) => line.split(",").map((x) => +x));
  }
  submit() {
    let { inputs, outputs } = this.state;
    inputs = this.splitData(inputs);
    outputs = this.splitData(outputs);

    const rules = zip(inputs, outputs);
    this.props.onChange(rules);
  }

  handleChange(event) {
    event.stopPropagation();
    this.setState({ [event.target.name]: event.target.value }, () => {});
  }

  render() {
    return (
      <Form>
        <Form.Label>
          Entradas:
          <Form.Control
            as="textarea"
            type="text"
            name="inputs"
            rows={4}
            value={this.state.inputs}
            onChange={this.handleChange}
          />
        </Form.Label>
        <Form.Label>
          Salidas:
          <Form.Control
            as="textarea"
            type="text"
            name="outputs"
            rows={4}
            value={this.state.outputs}
            onChange={this.handleChange}
          />
        </Form.Label>
        <br />
        <Button onClick={this.submit}>Calcular</Button>
      </Form>
    );
  }
}

export default ParametersForm;
