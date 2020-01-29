import _map from 'lodash/map';
import _isEmpty from 'lodash/isEmpty';
import _filter from 'lodash/filter';
import _find from 'lodash/find';
import moment from 'moment';

export function startRunning(e) {
  const { id, time, runningDevices, setRunningDevices } = e;

  // using moment so date manipulation is easy to undertand
  // creating a expiration date in x minutes in the future
  const newList = _map(runningDevices, o => {
    const { id: ID, status } = o;
    if (status && id === ID) {
      o.expiration = moment()
        .add(time, 'm')
        .toDate();
    }
    return o;
  });

  setRunningDevices(newList);
}
export function stopRunning(e) {
  const { id, runningDevices, setRunningDevices } = e;
  const newList = _map(runningDevices, o => {
    if (id === o.ud) {
      o.expiration = null;
    }
    return o;
  });
  setRunningDevices(newList);
}

export function checkExpiration(e) {
  let changeDetected = false;
  const { runningDevices, setRunningDevices } = e;

  // using moment so date manipulation is easy to undertand
  // creating a expiration date in x minutes in the future
  const newList = _map(runningDevices, o => {
    const { expiration } = o;

    const isExpired = moment().isSameOrAfter(expiration);
    if (isExpired) {
      o.expiration = null;
      changeDetected = true;
    }
    return o;
  });
  // only change state if something has expired
  if (changeDetected) setRunningDevices(newList);
}

export function isRunning(e) {
  const { id, runningDevices } = e;
  const thisUnit = _find(runningDevices, { id });
  const { status, expiration } = thisUnit;

  if (!status || !expiration) return false;

  const isExpired = moment().isSameOrAfter(expiration);
  if (isExpired) return false;
  return expiration;
}
