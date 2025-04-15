export interface Date {
	id?: string
	uuid: string
	name: string
	phone: string
	email: string
	date: string
	time: string
	questions: Questions
	mode: string
	status: string
}

interface Questions {
	reason: string
	accessories: string
	people: number
	outfits: number
}
