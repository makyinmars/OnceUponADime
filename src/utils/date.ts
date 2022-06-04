export const formatDate = (date: string) => {
  const newDate = new Date(date)
  const formattedDate = newDate.toDateString().slice(0, 16)
  return formattedDate
}
