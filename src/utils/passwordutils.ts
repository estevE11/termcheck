import { compareSync, hash } from 'bcrypt';

export async function hashPassword(password: string) {
    return new Promise((resolve, reject) => {
        hash(password, 10, (err, hash) => {
            if (err) {
                reject(err);
            }
            resolve(hash);
        })
    }); 
}


export async function compare(attempt:string, hashedPassword: string) {
    return new Promise((resolve, reject) => {
        const val = compareSync(attempt, hashedPassword);
        resolve(val);
    });
}