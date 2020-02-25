import React from 'react'
import { Form, Icon, Input, Button, Checkbox, Row, Col, Card } from 'antd';
import { Redirect } from 'react-router-dom';

const URL = 'http://localhost:5000/'
const ReactURL = 'https://localhost:3000/'

class NormalLoginForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let { username, password } = values;
                // API check for login
                fetch(URL + 'login', {
                    method: 'post',
                    body: JSON.stringify({ "email": username, "password": password }),
                    headers: { "Content-Type": "application/json" }
                })
                    .then(response => response.json())
                    .then((resp) => {
                        this.props.loginFunction(resp, username);
                    })
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { loginFunction } = this.props;
        if (this.props.loggedIn)
            return (<Redirect to='/RecipeHome' />)
        else {
            return (
                <Row type="flex" justify="center" align="middle" style={{ minHeight: '100vh' }}>
                    <Col>
                        <Card>
                            <Form onSubmit={this.handleSubmit} className="login-form">
                                <Form.Item>
                                    {getFieldDecorator('username', {
                                        rules: [{ required: true, message: 'Please input your username!' }],
                                    })(
                                        <Input
                                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            placeholder="Username"
                                        />,
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('password', {
                                        rules: [{ required: true, message: 'Please input your Password!' }],
                                    })(
                                        <Input
                                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            type="password"
                                            placeholder="Password"
                                        />,
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('remember', {
                                        valuePropName: 'checked',
                                        initialValue: true,
                                    })(<Checkbox>Remember me</Checkbox>)}
                                    <a className="login-form-forgot" href="">
                                        Forgot password
          </a>
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        Log in
          </Button>
                                    Or <a href={ReactURL+'register'}>Register now!</a>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            );
        }
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default WrappedNormalLoginForm;