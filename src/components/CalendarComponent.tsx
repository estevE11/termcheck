import { strMonth } from '@/utils/utils';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const CalendarComponent: React.FC<{}> = ({ }) => {

    const today = new Date();
    const isToday = (d: number, m: number, y: number): boolean => (today.getDate() == d && today.getMonth() == m && today.getFullYear() == y);

    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());

    const [days, setDays] = useState([[]]);

    useEffect(() => {
        const datenow = new Date();
        const monstart = new Date(`${year}-${month+1}-1`).getDay();
        const monlen = getMonthLength(month);
        let arr = [];
        for (let i = 0; i < monlen + monstart-1; i++) {
            const row = Math.floor(i / 7);
            if (i % 7 == 0) {
                arr.push([]);    
            }
            if (i < monstart-1) {
                (arr[0] as number[]).push(-1);
                continue;
            }
            (arr[row] as number[]).push(i - monstart+2);

        }
        for (let i = arr[arr.length-1].length; i < 7; i++) {
            (arr[arr.length-1] as number[]).push(-1);
        }
        setDays(arr);
    }, [month, year]);

    const getMonthLength = (m: number): number => {
        const nextMonth = m < 11 ? m+1 : 0;
        const nextYear = m < 11 ? year : year + 1;
        const date1: number = new Date((m+1) +'/1/' + year).getTime();
        const date2: number = new Date((nextMonth+1) + '/1/' + nextYear).getTime();
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        return diffDays;
    }

    const nextMonth = () => {
        if (month + 1 > 11) {
            setMonth(0);
            setYear(year + 1);
        }
        else setMonth(month + 1);
    }

    const prevMonth = () => {
        if (month - 1 < 0) {
            setMonth(11);
            setYear(year - 1);
        }
        else setMonth(month - 1);
    }

    return (
        <>
            <Container>
                <Row>
                    <Col xs={1} onClick={prevMonth} style={{cursor: 'pointer'}}><span>&lt;</span></Col>
                    <Col xs={10}>{strMonth[month]} { year }</Col>
                    <Col xs={1} onClick={nextMonth} style={{ cursor: 'pointer' }}><span>&gt;</span></Col>
                </Row>
                {days.map((week: number[]) => (
                    <Row>
                        {week.map((day: number) => (
                            <Col style={{ color: isToday(day, month, year) ? '#99ff99' : 'green'}}>
                                {day == -1 ? '' : day}
                            </Col>
                        ))}
                    </Row>
                ))}
            </Container>
        </>
    )
}

export default CalendarComponent;