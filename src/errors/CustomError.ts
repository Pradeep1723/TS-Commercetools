export class DuplicateUserError extends Error {
	constructor(message = 'User already exists') {
		super(message);
		this.name = 'DuplicateUserError';
	}
}

export class InvalidDataError extends Error {
	constructor(message = 'Invalid data provided') {
		super(message);
		this.name = 'InvalidDataError';
	}
}
