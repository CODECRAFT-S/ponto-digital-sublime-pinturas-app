class CustomError extends Error {
    constructor(message: string, name: string) {
        super(message);
        this.name = name;
    }
}

export default CustomError;