import english from '@/languages/en.json'
import spanish from '@/languages/es.json'

const LANG = {
	ENGLISH: 'en',
	SPANISH: 'es',
}

export const getI18N = ({ currentLocale = 'es' }: { currentLocale: string | undefined }) => {
	if (currentLocale === LANG.SPANISH) return { ...english, ...spanish }
	return english
}
