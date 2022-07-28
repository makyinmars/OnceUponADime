import dayjs from "dayjs"

export const formatDate = (date: Date) => {
  return dayjs(date).format("MM/DD/YYYY - HH:MM A")
}

export const formatDateDay = (date: Date) => {
  return dayjs(date).format("DD MMM YYYY")
}
