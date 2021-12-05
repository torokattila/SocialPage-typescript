import bcrypt from 'bcryptjs';

async function verifyPassword(password1: string, password2: string): Promise<boolean> {
    return bcrypt.compare(password1, password2);
};

export { verifyPassword };
