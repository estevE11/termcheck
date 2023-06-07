import {
    Container,
    Row,
    Col
} from "react-bootstrap";


import { useState, useEffect } from "react";
import Todo from '../interfaces/interfaces';
import TodoComponent from '../components/TodoComponent';
import useEventListener from "@/hooks/useEventListener";
import { deleteTodo, updateTodo } from "@/utils/utils";
import ModalTodo from "@/components/modals/ModalTodo";
import CalendarComponent from '../components/CalendarComponent';

export default function Home() {
    
    const [list, setList] = useState([] as Todo[]);
    const [selected, setSelected] = useState(0);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        loadItems().then((data: any) => {
            setList(data as Todo[]);
        });
    }, []);

    const loadItems = async () => {
        return new Promise((resolve, reject) => {
            const response = fetch("http://localhost:3000/api/todo")
                .then(response => response.json())
                .then(data => resolve(data.rows.map(formatItem)));
        });
    }

    const formatItem = (item: Todo): Todo => {
        if(typeof item.date == "string")
            item.date = new Date(item.date);
        if(typeof item.done == "number")
            item.done = (item.done as number == 1);
        return item;
    }

    const addTodo = (item: Todo): void => {
        setList([...list, item]);
    }

    const selectedUp = () => {
        if (selected == 0) return;
        setSelected(selected - 1);
    }

    const selectedDown = () => {
        if (selected >= list.length - 1) return;
        setSelected(selected + 1);
    }

    useEventListener("keydown", (event: KeyboardEvent) => {
        if (modal) {
            if (event.key == 'Escape')
                setModal(false);
            return;
        }

        if (event.key == 'j' || event.key == 'ArrowDown') selectedDown();
        if (event.key == 'k' || event.key == 'ArrowUp') selectedUp();

        console.log(event.key);
        if (event.key == 'Enter' || event.key == 'd' || event.key == ' ') {
            event.preventDefault();
            todoToggle(selected);
        }

        if (!modal && event.key == 'n') {
            setModal(true);
        }

        if (event.key == 'Backspace' || event.key == 'Delete') {
            deleteTodo(list[selected].id);
            list.splice(selected, 1);
            setList([...list]);
        }
    });

    const todoToggle = (index: number) => {
        let item = list[index];
        item.done = !item.done;
        updateTodo({
            id: item.id,
            done: item.done ? 1 : 0
        }).then((data) => {
            let lst: Todo[] = [...list];
            lst[index] = { ...item };
            setList([...lst]);
        });
    }

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        {
                            list.map((item: Todo, index: number) => (
                                <Row>
                                    <Col>
                                        <TodoComponent todo={item} selected={index == selected}></TodoComponent>
                                    </Col>
                                </Row>
                            ))
                        }
                    </Col>
                    <Col>
                        <CalendarComponent></CalendarComponent>
                    </Col>
                </Row>
            </Container>
            <ModalTodo show={modal} onClose={() => setModal(false)} onFinish={addTodo}></ModalTodo>
        </>
    )
}
