import { DateTimeType } from 'types/types';

export default function (
  type: DateTimeType,
  time: string,
  timezone?: string
): string {
  const date = Date.parse(time);

  let options: Intl.DateTimeFormatOptions = {};

  if (type === 'long') {
    options = {
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZone: timezone
    };
  } else if (type === 'short') {
    options = {
      hour: 'numeric',
      minute: 'numeric'
    };
  }

  const timeNow = new Intl.DateTimeFormat('en-GB', options).format(date);
  return timeNow;
}
