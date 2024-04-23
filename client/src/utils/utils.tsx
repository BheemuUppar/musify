function secondsToMinutesSeconds(seconds:number) {
  // Calculate minutes and remaining seconds
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  // Pad the seconds with leading zero if necessary
  const paddedSeconds =
    remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds; // Combine minutes and seconds in the mm:ss format
  const formattedTime = minutes + ":" + paddedSeconds;
  return formattedTime;
}

function groupDataByArtist(data:any[]) {
  return data.reduce((acc, curr) => {
    if (acc[curr.name]) {
      acc[curr.name].push(curr);
    } else {
      acc[curr.name] = [curr];
    }
    return acc;
  }, {});
}

export  {secondsToMinutesSeconds, groupDataByArtist};