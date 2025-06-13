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
import { SortAscendingNumbers } from '@/icons/SortAscendingNumbers'
import { SortAscending } from '@/icons/SortAscending'
import { Loading } from '@/icons/Loading'
import type { Date } from '@/interfaces/date'
import { Trash } from '@/icons/Trash'
import { Save } from '@/icons/Save'
import { DateStatus } from '@/interfaces/dateStatus'
import { Close } from '@/icons/Close'

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
	const [isRowInfoOpen, setIsRowInfoOpen] = useState(false)
	const [rowInfo, setRowInfo] = useState<Date>({ time: '-' } as Date)
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
		saving,
		datesShowing,
		dateSort,
		setDateSort,
		setNameSort,
		setTimeSort,
		setStatusSort,
		setTodaysSort,
		setTomorrowsSort,
		setSearching,
		convertMode,
		convertReason,
		setPage,
		saveCurrentDate,
		deleteDate,
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

	const handleClickRow = (event: preact.JSX.TargetedEvent<HTMLTableRowElement, Event>) => {
		event.preventDefault()
		const element = event.currentTarget as HTMLTableRowElement
		const row = element.dataset.row
		const rowData = dates.find((date) => date.uuid === row)
		if (rowData) {
			setRowInfo(rowData)
			setIsRowInfoOpen((prev) => !prev)
			document.body.style.overflowY = isRowInfoOpen ? 'auto' : 'hidden'
		}
	}

	const handleClickInfoModal = (
		event: preact.JSX.TargetedEvent<HTMLDivElement | HTMLSpanElement, Event>
	) => {
		event.preventDefault()
		const element = event.currentTarget as HTMLElement
		const row = element.id
		if (row === 'row-info-modal' || row === 'row-close-modal') {
			if (!saving) {
				setIsRowInfoOpen((prev) => !prev)
				document.body.style.overflowY = isRowInfoOpen ? 'auto' : 'hidden'
				setRowInfo({ time: '-' } as Date)
			}
		}
	}

	const closeModal = () => {
		if (!saving) {
			setIsRowInfoOpen((prev) => !prev)
			document.body.style.overflowY = isRowInfoOpen ? 'auto' : 'hidden'
			setRowInfo({ time: '-' } as Date)
		}
	}

	const handleSaving = (event: preact.JSX.TargetedEvent<HTMLButtonElement, Event>) => {
		event.preventDefault()
		saveCurrentDate(rowInfo.status, rowInfo.uuid)
	}

	const handleDelete = (event: preact.JSX.TargetedEvent<HTMLButtonElement, Event>) => {
		event.preventDefault()
		deleteDate(rowInfo.uuid)
		closeModal()
	}

	const handleViewToggle = () => setIsViewOpen((prev) => !prev)
	const handleNextPage = () => setPage((p) => p + 1)
	const handlePrevPage = () => setPage((p) => Math.max(p - 1, 1))
	const handlePageOne = () => setPage(1)
	const handleNameSort = () => setNameSort((prev) => !prev)
	const handleTimeSort = () => setTimeSort((prev) => !prev)
	const handleStatusSort = () => setStatusSort((prev) => !prev)
	const handleDateSort = () => setDateSort((prev) => !prev)
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

	const handleLogout = () => {
		window.location.href = '/api/logout'
	}

	return (
		<>
			<div
				id={'row-info-modal'}
				onClick={handleClickInfoModal}
				className={`fixed top-0 z-50 ${isRowInfoOpen ? 'flex' : 'invisible'} h-screen w-screen items-center justify-center bg-neutral-950/50`}
			>
				<div
					onClick={(e) => e.stopPropagation()}
					className={`flex h-fit w-full max-w-3xl flex-col justify-between gap-x-3 overflow-hidden truncate rounded-lg bg-back p-6 transition-transform duration-300 ease-out ${isRowInfoOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
				>
					<div className='flex w-full items-center justify-between'>
						<span className={`inline-flex items-center gap-2 text-xl font-bold text-primary`}>
							{rowInfo.name}{' '}
							{rowInfo.status === DateStatus.DONE ? (
								<span title={i18n.DONE} className='size-3 rounded-full bg-green-500'></span>
							) : rowInfo.status === DateStatus.PENDING ? (
								<span title={i18n.PENDING} className='size-3 rounded-full bg-gray-500'></span>
							) : rowInfo.status === DateStatus.CANCELLED ? (
								<span title={i18n.CANCELLED} className='size-3 rounded-full bg-red-500'></span>
							) : (
								<span title={i18n.CONFIRMED} className='size-3 rounded-full bg-orange-500'></span>
							)}
						</span>

						<span
							id={'row-close-modal'}
							onClick={handleClickInfoModal}
							className='group flex size-8 cursor-pointer items-center justify-center text-primary transition duration-300 ease-in-out sm:hover:rotate-90 sm:hover:text-main'
						>
							<Close classes='w-full' />
						</span>
					</div>

					<div className='grid grid-cols-1 gap-4 py-6 sm:grid-cols-2'>
						<div className='flex flex-col'>
							<span className='text-sm text-secondary'>{i18n.EMAIL}</span>
							<span className='text-base text-primary'>{rowInfo.email}</span>
						</div>

						<div className='flex flex-col'>
							<span className='text-sm text-secondary'>{i18n.REASON}</span>
							<p className='whitespace-pre-wrap text-base text-primary'>
								{convertReason(rowInfo.reason)}
							</p>
						</div>

						<div className='flex flex-col'>
							<span className='text-sm text-secondary'>{i18n.ACCESSORIES}</span>
							<span className='text-base text-primary'>{rowInfo.accessories}</span>
						</div>

						<div className='flex flex-col'>
							<span className='text-sm text-secondary'>{i18n.PEOPLE}</span>
							<span className='text-base text-primary'>{rowInfo.people}</span>
						</div>

						<div className='flex flex-col'>
							<span className='text-sm text-secondary'>{i18n.OUTFITS}</span>
							<span className='text-base text-primary'>{rowInfo.outfits}</span>
						</div>

						<div className='flex flex-col'>
							<span className='text-sm text-secondary'>{i18n.PHONE}</span>
							<span className='text-base text-primary'>{rowInfo.phone}</span>
						</div>

						<div className='flex flex-col'>
							<span className='text-sm text-secondary'>{i18n.DATE}</span>
							<span className='text-base text-primary'>{rowInfo.date}</span>
						</div>

						<div className='flex flex-col'>
							<span className='text-sm text-secondary'>{i18n.TIME}</span>
							<span className='text-base text-primary'>{rowInfo.time.replace('-', ':')}</span>
						</div>

						<div className='flex flex-col'>
							<span className='text-sm text-secondary'>{i18n.MODE}</span>
							<span className='text-base text-primary'>{convertMode(rowInfo.mode)}</span>
						</div>

						<div className='flex flex-col'>
							<span className='text-sm font-semibold text-secondary'>{i18n.STATUS}</span>
							<select
								name='date-status'
								defaultValue={rowInfo.status}
								className='rounded-lg bg-accent/10 p-2 text-primary outline-none transition-all placeholder:text-slate-500 focus:outline-1 focus:outline-main placeholder:focus:invisible'
							>
								<option
									{...(rowInfo.status === DateStatus.CONFIRMED
										? { selected: true }
										: { selected: false })}
									className='bg-blue-950'
									value={DateStatus.CONFIRMED}
								>
									{i18n.CONFIRMED}
								</option>
								<option
									{...(rowInfo.status === DateStatus.DONE
										? { selected: true }
										: { selected: false })}
									className='bg-blue-950'
									value={DateStatus.DONE}
								>
									{i18n.DONE}
								</option>
								<option
									{...(rowInfo.status === DateStatus.PENDING
										? { selected: true }
										: { selected: false })}
									className='bg-blue-950'
									value={DateStatus.PENDING}
								>
									{i18n.PENDING}
								</option>
								<option
									{...(rowInfo.status === DateStatus.CANCELLED
										? { selected: true }
										: { selected: false })}
									className='bg-blue-950'
									value={DateStatus.CANCELLED}
								>
									{i18n.CANCELLED}
								</option>
							</select>
						</div>
					</div>

					<div className={`flex w-full flex-row justify-end gap-3 p-2`}>
						<button
							onClick={handleDelete}
							type='button'
							{...(!saving ? {} : { disabled: true })}
							className={`group relative flex h-fit w-fit flex-row items-center justify-center gap-2 overflow-hidden ${!saving ? 'cursor-pointer text-primary' : 'cursor-not-allowed bg-red-900 text-slate-400'} ${saving ? '' : 'active:border-red-500 active:text-danger sm:hover:border-danger sm:hover:text-danger'} rounded-xl border border-transparent px-3 py-2 text-lg font-bold transition`}
						>
							<span
								className={`absolute left-0 h-full w-full -skew-x-3 bg-danger transition-all duration-300 ease-in-out group-active:w-0 sm:group-hover:w-0 ${saving ? 'hidden' : ''}`}
							></span>

							<span className='relative'>
								<Trash classes='size-5' />
							</span>
							<span className='relative'>{i18n.DELETE}</span>
						</button>

						<button
							type='button'
							{...(!saving ? {} : { disabled: true })}
							className={`group relative flex h-fit w-fit flex-row items-center justify-center gap-2 overflow-hidden ${!saving ? 'cursor-pointer text-primary' : 'cursor-not-allowed bg-blue-900 text-slate-400'} ${saving ? '' : 'active:border-accent active:text-main sm:hover:border-main sm:hover:text-main'} rounded-xl border border-transparent px-3 py-2 text-lg font-bold transition`}
							onClick={handleSaving}
						>
							<span
								className={`absolute left-0 h-full w-full -skew-x-3 bg-main transition-all duration-300 ease-in-out group-active:w-0 sm:group-hover:w-0 ${saving ? 'hidden' : ''}`}
							></span>

							<span className='relative'>
								{!saving ? <Save classes='size-5' /> : <Loading classes='size-5' />}
							</span>
							<span className='relative'>{`${!saving ? i18n.SAVE : i18n.SAVING}`}</span>
						</button>
					</div>
				</div>
			</div>

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
							{todaysSort
								? i18n.TODAYs_DATES
								: tomorrowsSort
									? i18n.TOMORROWs_DATES
									: i18n.ALL_DATES}
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
								<li
									onClick={handleLogout}
									className='block cursor-pointer select-none px-4 py-2 transition-colors hover:bg-secondary/20 hover:text-white'
								>
									{i18n.LOGOUT}
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
							<th scope='col' className='w-10 select-none px-3 py-4'>
								#
							</th>
							<th
								scope='col'
								className={`w-48 select-none items-center px-2 py-4 transition-colors ${nameSort ? 'text-accent' : ''}`}
							>
								<span onClick={handleNameSort} className='inline-flex cursor-pointer gap-1'>
									{i18n.NAME}
									<SortAscending
										classes={`size-4 transition ${nameSort ? 'opacity-100' : 'opacity-0'}`}
									/>
								</span>
							</th>
							<th scope='col' className='w-32 select-none px-2 py-4'>
								{i18n.PHONE}
							</th>
							<th
								scope='col'
								className={`w-28 select-none items-center px-2 py-4 transition-colors ${dateSort ? 'text-accent' : ''}`}
							>
								<span onClick={handleDateSort} className={'inline-flex cursor-pointer gap-1'}>
									{i18n.DATE}
									<SortAscendingNumbers
										classes={`size-4 transition ${dateSort ? 'opacity-100' : 'opacity-0'}`}
									/>
								</span>
							</th>
							<th
								scope='col'
								className={`w-20 select-none items-center px-2 py-4 transition-colors ${timeSort ? 'text-accent' : ''}`}
							>
								<span onClick={handleTimeSort} className='inline-flex cursor-pointer gap-1'>
									{i18n.TIME}
									<SortAscendingNumbers
										classes={`size-4 transition ${timeSort ? 'opacity-100' : 'opacity-0'}`}
									/>
								</span>
							</th>
							<th scope='col' className='w-28 select-none px-2 py-4'>
								{i18n.MODE}
							</th>
							<th
								scope='col'
								className={`w-36 select-none items-center px-2 py-4 ${statusSort ? 'text-accent' : ''}`}
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
									onClick={handleClickRow}
									data_row={row.uuid}
									key={row.uuid}
									idx={(page - 1) * datesShowing + idx + 1}
									name={row.name}
									date={row.date}
									time={row.time.replace('-', ':')}
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
					className={`pointer-events-none w-full select-none px-2 py-4 text-center text-slate-600 ${dates.length === 0 && !loading ? '' : 'hidden'}`}
				>
					{i18n.NO_DATES_TO_SHOW}
				</span>
			</div>
		</>
	)
}
