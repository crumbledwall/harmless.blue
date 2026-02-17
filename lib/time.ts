import dayjs from 'dayjs'

export const timeFormat = (time: string | null | undefined) => {
  if (!time) return ''
  return dayjs(time).format('MMM DD, YYYY')
}
