
export type Type = 'success' | 'info' | 'warning' | 'error';
export type Position = 'right-top' | 'left-top' | 'center-top' | 'right-bottom' | 'left-bottom' | 'center-bottom';

export interface Toast {
	id?: string | number,
	type: Type,
	title: string,
	message: string | null,
	timeout: number,
	position: Position
}