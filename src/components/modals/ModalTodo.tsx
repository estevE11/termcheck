import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';


import { useState } from 'react';
import { CreateTodoBody, createTodo, isValidDate, isValidTime } from '@/utils/utils';
import useEventListener from '@/hooks/useEventListener';
import Todo from '@/interfaces/interfaces';

type ItemFormData = {
    date: string,
    time: string,
    name: string
};
        
const ModalTodo: React.FC<{ show: boolean, onClose: () => void, onFinish?: (todo: Todo) => void }> = ({ show, onClose, onFinish }) => {
    
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
        if (!validateData(values)) return;
        const body = parseFormData(values);
        createTodo(body).then(() => {
            onClose();
        })
    }

    const parseFormData = (data: ItemFormData): CreateTodoBody => {
        const param_date = data.date.split("/");
        const param_time = data.time.split(":");
        const now: Date = new Date();

        const d = param_date[0];
        const m = param_date[1];
        const y = now.getFullYear() + ((parseInt(m) < now.getMonth()+1) ? 1 : 0);

        const h = param_time[0];
        const min = param_time[1];

        const date: string = `${y}-${m}-${d} ${h}:${min}:00`;

        return {
            name: data.name,
            date: date
        }
    }

    const validateData = (data: ItemFormData): boolean => {
        if (data.name.length < 1) {
            console.error("Name is empty")
            return false;
        }
        if (!isValidDate(data.date)) {
            console.error("Date is invalid")
            return false;
        }
        if (!isValidTime(data.time)) {
            console.error("Time is invalid");
            return false;
        }
        return true;
    }

    useEventListener('keydown', (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleCreate();
        }
    });

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