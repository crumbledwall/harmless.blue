import dayjs from 'dayjs'

export const timeFormat = (time: string) => {
  return dayjs(time).format('MMM DD,YYYY')
}
