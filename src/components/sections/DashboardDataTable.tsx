/* eslint-disable react/react-in-jsx-scope */

import { Dashboard } from '@/icons/Dashboard'
import { Search } from '@/icons/Search'
import { SemiArrow } from '@/icons/SemiArrow'
import { useCallback, useState } from 'preact/hooks'
import debounce from 'just-debounce-it'
import { useDashboardTableDates } from '@/hooks/useDashboardTableDates'
import { useSearch } from '@/hooks/useSearch'
import { DashboardDataRows } from '@/components/DashboardDataRows'
import { getI18N } from '@/languages/index'
import { SortAscending } from '@/icons/SortAscending'
import { Loading } from '@/icons/Loading'

export const DashboardDataTable = ({
	numberOfDates,
	currentLocale,
}: {
	numberOfDates: number
	currentLocale?: string
}) => {
	const i18n = getI18N({ currentLocale })
	const [isViewOpen, setIsViewOpen] = useState(false)
	const { search, setSearch } = useSearch()
	const {
		dates,
		loading,
		nameSort,
		timeSort,
		statusSort,
		page,
		todaysSort,
		tomorrowsSort,
		totalCount,
		totalPages,
		setNameSort,
		setTimeSort,
		setStatusSort,
		setTodaysSort,
		setTomorrowsSort,
		setSearching,
		convertMode,
		setPage,
	} = useDashboardTableDates({
		numberOfDates,
		search,
	})

	const debouncedGetDates = useCallback(
		debounce((newSarch: string | null) => {
			setSearch(newSarch)
			setSearching(false)
		}, 600),
		[setSearch]
	)

	const handleChange = (event: preact.JSX.TargetedEvent<HTMLInputElement, Event>) => {
		event.preventDefault()

		const element = event.target as HTMLInputElement
		const newSearch = element.value

		setSearching(true)
		debouncedGetDates(newSearch)
	}

	const handleViewToggle = () => setIsViewOpen((prev) => !prev)
	const handleNextPage = () => setPage((p) => p + 1)
	const handlePrevPage = () => setPage((p) => Math.max(p - 1, 1))
	const handlePageOne = () => setPage(1)
	const handleNameSort = () => setNameSort((prev) => !prev)
	const handleTimeSort = () => setTimeSort((prev) => !prev)
	const handleStatusSort = () => setStatusSort((prev) => !prev)
	const handleAllDatesSort = () => {
		setTodaysSort(false)
		setTomorrowsSort(false)
		handleViewToggle()
	}
	const handleTodaysSort = () => {
		setTodaysSort((prev) => !prev)
		setTomorrowsSort(false)
		handleViewToggle()
	}
	const handleTomorrowsSort = () => {
		setTomorrowsSort((prev) => !prev)
		setTodaysSort(false)
		handleViewToggle()
	}

	return (
		<div className='flex w-full max-w-4xl flex-col md:w-11/12 lg:w-8/12'>
			<h2 className='mb-8 flex items-center gap-x-3 text-3xl font-semibold text-primary sm:text-4xl'>
				<Dashboard classes='size-8' />
				{i18n.DASHBOARD}
			</h2>

			<div className='mb-4 flex w-full items-center justify-between'>
				<div>
					<button
						onClick={handleViewToggle}
						className='relative inline-flex items-center rounded-lg border border-gray-600 bg-blue-950/20 px-3 py-1.5 text-sm font-medium text-secondary transition-colors hover:border-gray-600 hover:bg-secondary/20 focus:outline-none'
						type='button'
					>
						{todaysSort ? i18n.TODAYs_DATES : tomorrowsSort ? i18n.TOMORROWs_DATES : i18n.ALL_DATES}
						<SemiArrow classes='ms-2.5 rotate-180 size-2.5' />
					</button>

					<div
						className={`absolute ${isViewOpen ? '' : 'hidden'} z-10 mt-2 w-44 overflow-hidden rounded-lg bg-accent/10 shadow-sm backdrop-blur-xl`}
					>
						<ul className='text-sm text-gray-200'>
							<li
								onClick={handleAllDatesSort}
								className='block cursor-pointer select-none px-4 py-2 transition-colors hover:bg-secondary/20 hover:text-white'
							>
								{i18n.ALL_DATES}
							</li>
							<li
								onClick={handleTodaysSort}
								className='block cursor-pointer select-none px-4 py-2 transition-colors hover:bg-secondary/20 hover:text-white'
							>
								{i18n.TODAYs_DATES}
							</li>
							<li
								onClick={handleTomorrowsSort}
								className='block cursor-pointer select-none px-4 py-2 transition-colors hover:bg-secondary/20 hover:text-white'
							>
								{i18n.TOMORROWs_DATES}
							</li>
						</ul>
					</div>
				</div>

				<label>
					<div className='relative'>
						<div className='pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3'>
							<Search classes='size-4 text-secondary' />
						</div>
						<input
							onKeyUp={handleChange}
							type='text'
							id='table-search-users'
							className='block w-52 rounded-lg bg-accent/10 p-2 ps-10 text-primary outline-none transition-all placeholder:text-slate-500 focus:outline-1 focus:outline-main md:w-80'
							placeholder='Search for dates'
						/>
					</div>
				</label>
			</div>

			<table className='w-full overflow-hidden rounded-lg text-left text-sm text-primary'>
				<thead className='bg-blue-950/60 text-xs uppercase text-primary'>
					<tr>
						<th scope='col' className='select-none p-3'>
							#
						</th>
						<th
							scope='col'
							className={`select-none items-center px-6 py-4 transition-colors ${nameSort ? 'text-accent' : ''}`}
						>
							<span onClick={handleNameSort} className='inline-flex cursor-pointer gap-1'>
								{i18n.NAME}
								<SortAscending
									classes={`size-4 transition ${nameSort ? 'opacity-100' : 'opacity-0'}`}
								/>
							</span>
						</th>
						<th scope='col' className='select-none px-6 py-4'>
							{i18n.PHONE}
						</th>
						<th scope='col' className='select-none px-6 py-4'>
							{i18n.DATE}
						</th>
						<th
							scope='col'
							className={`select-none items-center px-6 py-4 transition-colors ${timeSort ? 'text-accent' : ''}`}
						>
							<span onClick={handleTimeSort} className='inline-flex cursor-pointer gap-1'>
								{i18n.TIME}
								<SortAscending
									classes={`size-4 transition ${timeSort ? 'opacity-100' : 'opacity-0'}`}
								/>
							</span>
						</th>
						<th scope='col' className='select-none px-6 py-4'>
							{i18n.MODE}
						</th>
						<th
							scope='col'
							className={`select-none items-center px-6 py-4 ${statusSort ? 'text-accent' : ''}`}
						>
							<span onClick={handleStatusSort} className='inline-flex cursor-pointer gap-1'>
								{i18n.STATUS}
								<span
									className={`size-3.5 rounded-full bg-orange-500 transition ${statusSort ? 'opacity-100' : 'opacity-0'}`}
								></span>
							</span>
						</th>
					</tr>
				</thead>
				<tbody className='bg-blue-950/20'>
					{dates.length > 0 &&
						!loading &&
						dates.map((row, idx) => (
							<DashboardDataRows
								key={idx}
								idx={(page - 1) * numberOfDates + idx + 1}
								name={row.name}
								date={row.date}
								time={`${row.time.replace('-', ':')}`}
								status={row.status}
								mode={convertMode(row.mode)}
								phone={row.phone}
							/>
						))}
				</tbody>
			</table>

			{!loading && totalCount > dates.length && (
				<div className='mt-2 flex justify-end gap-2 text-slate-400'>
					{page > 1 && (
						<button onClick={handlePrevPage} type='button'>
							<SemiArrow classes='size-4 -rotate-90' />
						</button>
					)}

					{page > 2 && (
						<button className='cursor-pointer select-none' onClick={handlePageOne} type='button'>
							1 ...
						</button>
					)}

					<span className='select-none'>{page}</span>

					{page < totalPages && (
						<button onClick={handleNextPage} type='button'>
							<SemiArrow classes='size-4 rotate-90' />
						</button>
					)}
				</div>
			)}

			<div
				className={`inline-flex w-full items-center justify-center py-4 ${!loading ? 'hidden' : ''}`}
			>
				<Loading classes='size-8 text-slate-400' />
			</div>

			<span
				className={`pointer-events-none w-full select-none px-6 py-4 text-center text-slate-600 ${dates.length === 0 && !loading ? '' : 'hidden'}`}
			>
				{i18n.NO_DATES_TO_SHOW}
			</span>
		</div>
	)
}
