import {
    Container,
    Row,
    Col
} from "react-bootstrap";


import { useState, useEffect } from "react";
import Todo from '../interfaces/interfaces';
import TodoComponent from '../components/TodoComponent';

export default function Home() {
    
    const [list, setList] = useState([] as Todo[]);

    useEffect(() => {
        loadItems().then((data: any) => {
            console.log(data);
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

    return (
        <>
            <Container>
                {
                    list.map((item: Todo, index: number) => (
                        <Row>
                            <Col>
                                <TodoComponent todo={item} selected={false}></TodoComponent>
                            </Col>
                        </Row>
                    ))
                }
            </Container>
        </>
    )
}
