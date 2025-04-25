export const getImageDimensions = (
	imageSource: string | File | Blob
): Promise<{ width: number; height: number }> => {
	return new Promise((resolve, reject) => {
		const img = new Image()

		// Convert File or Blob to object URL if needed
		if (imageSource instanceof File || imageSource instanceof Blob) {
			imageSource = URL.createObjectURL(imageSource)
		}

		img.onload = () => {
			resolve({ width: img.width, height: img.height })

			// Revoke object URL if it was used
			if (imageSource.startsWith('blob:')) {
				URL.revokeObjectURL(imageSource)
			}
		}

		img.onerror = (err) => reject(err)

		img.src = imageSource
	})
}
