export class Utility {
  public static getLocalDateISO(isoDate: string) {
    const dateComponents = isoDate.split(/[-T:Z]/);
    const year = +dateComponents[0];
    const month = +dateComponents[1] - 1; // Month is 0-indexed in Date object
    const day = +dateComponents[2];
    const hours = +dateComponents[3];
    const minutes = +dateComponents[4];
    const seconds = +dateComponents[5];

    // Create Date object with original time zone information
    const originalDate = new Date(
      Date.UTC(year, month, day, hours, minutes, seconds)
    );
    const formattedDate = `${originalDate.getFullYear()}-${(
      originalDate.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}-${originalDate
      .getDate()
      .toString()
      .padStart(2, '0')}T${originalDate
      .getHours()
      .toString()
      .padStart(2, '0')}:${originalDate
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
    return formattedDate;
  }

  public static getFormattedLocalDate(isoDate: string) {
    const date = new Date(isoDate);
    const formattedDate = date.toDateString() + ' | ' + date.toTimeString();
    return formattedDate;
  }
}
