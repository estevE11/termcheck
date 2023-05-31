import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';


import { useState } from 'react';

type formData = {
    date: string,
    time: string,
    name: string
};
        
const ModalTodo: React.FC<{ show: boolean, onClose: () => void }> = ({ show, onClose }) => {
    
    const [values, setValues] = useState({
        date: '',
        time: '',
        name: ''
    });

    const handleShow = () => { 
        setValues({
            date: '',
            time: '',
            name: ''
        });
    }

    const handleCreate = () => { 
        /*
        apiPOST('/matches', body).then((data) => { 
            onClose();
        });
        */
    }

    return (
        <Modal size="lg" show={show} onShow={handleShow} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>To Do</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Container>
                    <Row>
                        <Col sm={ 3 }>
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e: any) => {
                                    setValues({ ...values, date: e.target.value });
                                }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Time</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e: any) => {
                                    setValues({ ...values, time: e.target.value });
                                }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e: any) => {
                                    setValues({ ...values, name: e.target.value });
                                }}
                            />
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>

            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalTodo;