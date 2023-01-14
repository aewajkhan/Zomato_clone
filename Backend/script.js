const button = document.querySelector("button");

button.addEventListener("click", () => {
  console.log("checkout button clicked");

  fetch('http://localhost:3500/payment/create-checkout-session', {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      items: [
        {
          id: 1,
          quantity: 3, //Learn express
        },
        {
          id: 2,
          quantity: 1, //Learn Mongo
        }
      ]
    })
  })
    //fetch call dosent fail on its own ,so we need to handle the failure
    .then((res) => {
      if (res.ok) return res.json();
      return res.json().then(json => Promise.reject(json));
    })

    .then(({ url }) => {
      window.location = url;
      // console.log(url);
    })
    .catch((e) => console.log(e));
});
