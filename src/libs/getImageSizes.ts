// utils/getImagesWithSize.ts
import { readdirSync, statSync } from 'fs'
import { resolve } from 'path'
import sizeOf from 'image-size'

export function getImagesWithSize(relativeFolderPath: string) {
	const dir = resolve('public', relativeFolderPath)
	const files = readdirSync(dir)
		.filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
		.sort()

	return files.flatMap((filename) => {
		const fullPath = resolve(dir, filename)

		// Verifica que el archivo no esté vacío
		if (statSync(fullPath).size === 0) return []

		try {
			const dimensions = sizeOf(fullPath)
			return [
				{
					src: `/${relativeFolderPath}/${filename}`,
					width: dimensions.width ?? 0,
					height: dimensions.height ?? 0,
				},
			]
		} catch (err) {
			console.warn(`Error al procesar imagen: ${fullPath}`, err)
			return []
		}
	})
}
