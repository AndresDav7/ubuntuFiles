import React from 'react';
import { Row, Col, Card } from 'antd';

class Lista extends React.Component {
    render() {
        return (

            <Row gutter={16}>
                {this.props.items.map(item => (

                    <Col className="mt-2" span={8}>
                        <Card title={item.title} bordered={false}>
                            {item.text}
                        </Card>
                    </Col>

                ))}

            </Row>

        );
    }
}

export default Lista;