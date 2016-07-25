var EventView = (props) => {
  console.log(props)

  if (props.yelpEvents.length > 0) {
    var d = props.day;
    var e = props.eventID;
    var index = 3 * (d - 1) + e;
    var event = props.yelpEvents[index];

    if (event) {
      var renderTags = <div>
        <div>
          {event.name ? event.name : event.location}
        </div>
        <div>
          {event.url}
        </div>
        <div>
          {event.rating}
        </div>
      </div>;
    } else {
      renderTags = null;
    }

  } else {
    var renderTags = null;
  }

  return (
    <div>
      <div>
        Event:
      </div>
      {renderTags}
    </div>
  );
}