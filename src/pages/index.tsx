import {
    Container,
    Row,
    Col
} from "react-bootstrap";


import { useState, useEffect } from "react";
import Todo from '../interfaces/interfaces';

export default function Home() {
    
    const [list, setList] = useState([] as Todo[]);

    useEffect(() => {
        loadItems().then((data: any) => {
            setList(data.rows as Todo[]);
        });
    }, []);

    const loadItems = async () => {
        return new Promise((resolve, reject) => {
            const response = fetch("http://localhost:3000/api/todo")
                .then(response => response.json())
                .then(data => resolve(data));
        });
    }

    return (
        <>
            <Container>
                {
                    list.map((item: Todo, index: number) => (
                        <Row>
                            <Col>
                                <span>{item.name}</span>
                            </Col>
                        </Row>
                    ))
                }
            </Container>
        </>
    )
}
