export class ManageDate {
  ageFromDateOfBirthday(birthDateInformed: string): number {
    const today = new Date()
    const newBirthDate = birthDateInformed.split("/")

    const day = Number(newBirthDate[0])
    const month = Number(newBirthDate[1])
    const year = Number(newBirthDate[2])

    const birthDate = new Date(year, month, day)
    let getAge = today.getFullYear() - birthDate.getFullYear()
    const getMonth = today.getMonth() - birthDate.getMonth()

    if(getMonth < 0 || (getMonth === 0 && today.getDate() < birthDate.getDate())) {
      getAge--
    }

    return getAge
  }

  ageFromDateInformedByUser(dateInformed: string): boolean {
    const arrayDate = dateInformed.split("/")
    const informedDay = Number(arrayDate[0])
    const informedMonth = Number(arrayDate[0])
    const informedYear = Number(arrayDate[0])

    const today = new Date()
    const currentDay = today.getDate()
    const currentMonth = today.getMonth() + 1
    const currentYear = today.getFullYear()

    if(informedDay < currentDay) {
      return false
    } else if(informedMonth < currentMonth) {
      return false
    } else if(informedYear < currentYear) {
      return false
    } else {
      return true
    }
  }
}