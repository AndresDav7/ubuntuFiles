import React from 'react';
import Lista from './Lista';
import './Notas.css';
import {Button, Input, Form, Icon} from 'antd';

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}


class Notas extends React.Component {
    componentDidMount() {
        // To disable submit button at the beginning.
        this.props.form.validateFields();
    }

    constructor(props) {
        super(props);
        this.state = { items: [], title: '', text:'' };
        this.handleChange = this.handleChange.bind(this);
        this.handleChange2= this.handleChange2.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        // Only show error after a field is touched.
        const usernameError = isFieldTouched('username') && getFieldError('username');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        return (
            <div id="bloque" className="container text-center">
                <h3 >Crear Notas</h3>

                <form onSubmit={this.handleSubmit}>

                    <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Porfavor ingres título!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Título" size="small" onChange={this.handleChange}
                                value={this.state.title}
                            />,
                        )}
                    </Form.Item>

                    <br/>

                    <Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Porfavor ingres contenido!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Contenido" size="small"  onChange={this.handleChange2}
                                value={this.state.text}
                            />,
                        )}
                    </Form.Item>

                    <br/>


                    <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                        Crear Nota
                    </Button>

                </form>

                <Lista items={this.state.items} />
            </div>
        );
    }

    handleChange(e) {
        this.setState({ title: e.target.value });
    }

    handleChange2(e) {
        this.setState({ text: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.title.length) {
            return;
        }

        const newItem = {
            title: this.state.title,
            text: this.state.text,
            id: Date.now()
        };
        this.setState(state => ({
            items: state.items.concat(newItem),
            title:'',
            text: '',
        }));
    }

}

Notas = Form.create({ name: 'Notas' })(Notas);

export default Notas;
