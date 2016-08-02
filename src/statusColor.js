export default function getStatusColor(available) {
  if (available === 0) {
    return '#F44336'
  }
  else if (available < 3) {
    return '#FFC107'
  }
  else {
    return '#4CAF50'
  }
}
