import { TDateCell } from './types'

const getHumanDate = (d: Date) => {
	const year = d.getFullYear()
	const month = d.getMonth() + 1
	const date = d.getDate()
	const day = d.getDay()
	const hour = d.getHours()
	const minute = d.getMinutes()
	const second = d.getSeconds()
	const ms = d.getMilliseconds()

	return {
		year, y: year, month, M: month, date, d: date, day,
		hour, H: hour, h: hour,
		minute, m: minute,
		second, s: second,
		ms,
	}
}

const getMonthDays = (year: number, month: number) => {
	const first = new Date(year, month - 1, 1)
	const last = new Date(year, month, 0)
	const dates: TDateCell[] = []

	let day = first.getDay()
	while (day > 0) {
		day -= 1
		dates.push({ date: new Date(year, month - 1, -day), current: -1 })
	}

	day = last.getDate() - first.getDate()
	for (let i = 0; i <= day; i++) {
		const date = new Date(first)
		date.setDate(i + 1)
		dates.push({ date, current: 0 })
	}

	day = last.getDay()
	for (let i = day; i < 6; i++) {
		dates.push({ date: new Date(year, month, i - day + 1), current: 1 })
	}
	return dates
}

export const getMonthWeeklyDays = (date: any = new Date()) => {
	if (!(date instanceof Date)) {
		date = new Date()
	}
	const { year, month } = getHumanDate(date)
	const days = getMonthDays(year, month)
	const dayRows = []
	while (days.length > 0) {
		dayRows.push(days.splice(0, 7))
	}
	return dayRows
}

export const WEEK_DAYS = ['日', '一', '二', '三', '四', '五', '六']

export const invokeCallback = (cb: any, ...args: any[]) => {
	typeof cb === 'function' && cb(...args)
}

export /**
* 比较日期单位
* @param small 相对早的日期
* @param big 相对晚的日期
* @param mode 比较单位
* @param min 不能小于这个值
* @returns 
*/
const compareDate = (small: Date | undefined, big: Date | undefined, mode: 'year' | 'month', min: number) => {
	if (!small || !big) {
		return true
	}
	if (mode === 'year') {
		return big.getFullYear() - small.getFullYear() > min
	} else {
		const bigMonth = big.getFullYear() * 12 + big.getMonth()
		const smallMonth = small.getFullYear() * 12 + small.getMonth()
		return bigMonth - smallMonth > min
	}
}