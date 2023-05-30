export function leftZero(n: number): string {
    return (n < 10 ? '0' : '') + n;
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
