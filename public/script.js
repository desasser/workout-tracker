$("#workout-picker").on("click", ".big-button", event => {
  event.preventDefault();

  const workoutId = event.target.value;
  $.ajax({
    url: "/activeworkout",
    method: "GET",
    data: {_id: workoutId}
  }).then(res => {
    console.log('yay!');
  })
  // console.log(event.target.value);
  // console.log(this);
})