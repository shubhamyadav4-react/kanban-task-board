export const updateTaskApi = (taskId, updates) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldFail = Math.random() < 0.1; // 10% fail
 
      if (shouldFail) {
        reject('API failed');
      } else {
        resolve({ taskId, updates });
      }
    }, 2000);
  });
};
 