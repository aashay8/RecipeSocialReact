import React from 'react';
import { Form, Icon, Input, Button, Checkbox, Row, Col, Card } from 'antd';
const URL = 'http://localhost:5000/';

class MailAuthentication extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values)
                let { authenticationCode } = values;
                fetch(URL + 'accVerification/'+authenticationCode)
                    .then(response => response.json())
                    .then((resp) => {
                        // if(resp.message == 'User email successfully verified'){

                        // }
                        alert(resp.message)
                    })
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { loginFunction } = this.props;
        return (
            <Row type="flex" justify="center" align="middle" style={{ minHeight: '100vh' }}>
                <Col>
                    <Card>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <Form.Item>
                                {getFieldDecorator('authenticationCode', {
                                    rules: [{ required: true, message: 'Please enter authentication code!' }],
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Authentication Code"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Authenticate
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        );
    }
}

const WrappedNormalAuthenticationForm = Form.create({ name: 'normal_login' })(MailAuthentication);

export default WrappedNormalAuthenticationForm;
