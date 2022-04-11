import { hashSync, genSaltSync, compare } from "bcryptjs";

export function encryptPasswordSync(password: string) {
    return hashSync(password, genSaltSync(10));
}

export async function comparePasswords(password: string, candidatePassword: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        compare(candidatePassword, password, (err, succ) => {
            if (err) return reject(err);
            return resolve(succ);
        });
    });
}
