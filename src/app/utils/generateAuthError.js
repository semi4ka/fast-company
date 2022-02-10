export function generateAuthError(message) {
    switch (message) {
        case "EMAIL_EXISTS":
            return "Пользователь с таким email уже существует";
        case "EMAIL_NOT_FOUND":
            return "Пользователь с таким email не существует";
        case "INVALID_PASSWORD":
            return "Пароль введен некоркетный";
        default:
            return "Слишком много попыток, попробуйте позже";
    }
}
