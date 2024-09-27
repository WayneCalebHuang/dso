const fetchData = async () => {
  try {
    /*     const response = await fetch(`http://twtpedv200/fahh/Users/getJWT`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });

    if (!response.ok) {
      throw new Error('something went wrong');
    }

    console.log('response:', response); */

    await fakeFetch();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error(error);
  }
};

const fakeFetch = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('fetching');
      resolve();
    }, 2000);
  });
};

export { fetchData };
