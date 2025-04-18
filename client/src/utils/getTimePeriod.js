export const getTimePeriod = () => {
    const days = []

    for (let i = 0; i < 7; i++) {
      const date = new Date()
      date.setDate(date.getDate() + i)

      const weekday = date.toLocaleDateString('de-DE', { weekday: 'short' })
      const dateString = date.toLocaleDateString('de-DE', { day: '2-digit', month: 'short' })

      days.push({
        value: date.toISOString().split('T')[0],
        label: `${weekday}., ${dateString}`,
        weekday: weekday
      })
    }
    return days
  }