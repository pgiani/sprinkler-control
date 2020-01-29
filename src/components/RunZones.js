import _map from 'lodash/map';
import _find from 'lodash/find';
import _filter from 'lodash/filter';
import _size from 'lodash/size';
import _last from 'lodash/last';
import _sortBy from 'lodash/sortBy';
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
  return changeDetected;
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
export function runningCount(e) {
  const { id, runningDevices } = e;
  const zone = _filter(runningDevices, { parent: id });
  const active = _filter(zone, o => o.expiration);
  let lastRunning = null;
  if (_size(active)) {
    const sortedDevices = _sortBy(active, ['expiration']);
    if (sortedDevices) lastRunning = _last(sortedDevices).expiration;
  }
  return {
    zones: _size(zone),
    active: _size(active),
    lastRunning,
  };
}
