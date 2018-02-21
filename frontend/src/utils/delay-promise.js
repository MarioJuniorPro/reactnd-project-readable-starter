export const delayPromise = duration => {
  return new Promise(function(resolve, reject) {
    setTimeout(() => {
      resolve()
    }, duration)
  })
}

export const mockDelayPromiseError = duration => {
  return new Promise(function(resolve, reject) {
    reject('ERRROU!')
    // setTimeout(() => {
    //   resolve()
    // }, duration)
  })
}

