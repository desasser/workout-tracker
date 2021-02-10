$("#workout-picker").on("click", ".big-button", event => {
  event.preventDefault();

  const workoutId = event.target.value;
  // console.log(event.target.value);
  $.ajax(`/activeworkout/${workoutId}`,
  {
    type: "GET"
  }).then(res => {
    console.log('yay!');
    window.location = (`/activeworkout/${workoutId}`)
  })
  console.log(event.target.value);
  // console.log(this);
})