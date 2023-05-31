export function leftZero(n: number): string {
    return (n < 10 ? '0' : '') + n;
}

export function strLeftZero(n: string): string {
    if (n.length > 1) return n;
    return leftZero(parseInt(n));
}

export function isValidDate(dateString: string): boolean {
    const currentYear = new Date().getFullYear();
    const regex = /(\d){1,2}\/(\d){1,2}/;
    return regex.test(dateString);
}

export function isValidTime(timeString: string): boolean {
  const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return regex.test(timeString);
}

export type UpdateTodoBody = {
    id: number,
    name?: string,
    date?: string,
    done?: number
};
export function updateTodo(body: UpdateTodoBody) {
    return new Promise(async (resolve, reject) => {
        if (body.done && typeof body.done == 'boolean')
            body.done = body.done ? 1 : 0;
        await apiPUT('/todo', body);
        resolve({});
    })
}

export function apiGET(route: string): any {
    const currentUrl = window.location.href;
    const baseUrl = currentUrl.split('/').slice(0, 3).join('/');
    return new Promise((resolve, err) => {
        fetch(baseUrl + '/api/' + route)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => err(error));
    });
}

export type CreateTodoBody = {
    name: string,
    date: string
}
export function createTodo(body: CreateTodoBody) {
    return new Promise(async (resolve, reject) => {
        const response = await apiPOST('/todo', body);
        resolve(response);
    })
}

export function apiPOST(route: string, body: any) {
    const currentUrl = window.location.href;
    const baseUrl = currentUrl.split('/').slice(0, 3).join('/');
    return new Promise((resolve, err) => {
        fetch(baseUrl + '/api/' + route, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => resolve(data))
            .catch(error => console.error(error));
    });
}

export function apiPUT(route: string, body: any) {
    const currentUrl = window.location.href;
    const baseUrl = currentUrl.split('/').slice(0, 3).join('/');
    return new Promise((resolve, err) => {
        fetch(baseUrl + '/api/' + route, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => resolve(data))
            .catch(error => console.error(error));
    });
}

export function deleteTodo(id: number) {
    return new Promise(async (resolve, reject) => {
        await apiDELETE("/todo", { id: id });
        resolve({});
    });
}

export function apiDELETE(route: string, body: any) {
    const currentUrl = window.location.href;
    const baseUrl = currentUrl.split('/').slice(0, 3).join('/');
    return new Promise((resolve, err) => {
        fetch(baseUrl + '/api/' + route, {
            method: 'DELETE',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => resolve(data))
            .catch(error => console.error(error));
    });
}
