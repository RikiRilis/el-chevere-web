export interface Category {
	id: string
	name: string
	description: string
	image: string
	images?: { src: string; width: number; height: number }[]
}
